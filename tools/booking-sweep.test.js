/* Tests for the booking alert sweep in booking-alert.gs.
 *
 * Apps Script cannot run outside Google, so the file is loaded as plain JavaScript with
 * fakes standing in for MailApp, UrlFetchApp, PropertiesService and the rest. That is
 * enough to prove the parts that are easy to get wrong and impossible to eyeball: the
 * Firestore field mapping, the de-duplication between the two senders, the capped
 * fingerprint store, and — the one that actually bit — that a booking whose email fails
 * is retried rather than stepped over.
 *
 *   node tools/booking-sweep.test.js
 */
const fs = require('fs');
const src = fs.readFileSync(require('path').join(__dirname, 'booking-alert.gs'), 'utf8');

function makeEnv(opts){
  const props = Object.assign({}, opts.props||{});
  const sent = [], logged = [], fetches = [];
  const env = {
    PROJECT_ID: 'example-dendal',
    _signIn: () => opts.token === undefined ? 'TOKEN' : opts.token,
    PropertiesService: { getScriptProperties: () => ({
      getProperty: k => (k in props ? props[k] : null),
      setProperty: (k,v) => { props[k] = String(v); }
    })},
    MailApp: {
      getRemainingDailyQuota: () => 100,
      sendEmail: m => { if (opts.mailFailsAfter !== undefined && sent.length >= opts.mailFailsAfter) throw new Error('quota'); sent.push(m); }
    },
    UrlFetchApp: { fetch: (u, o) => { fetches.push(JSON.parse(o.payload));
      return { getResponseCode: () => opts.httpCode || 200,
               getContentText: () => JSON.stringify(opts.rows || []) }; } },
    Utilities: { formatDate: (d, tz, fmt) => {
      const p = new Date(d.getTime() + 6*3600*1000);  // Asia/Dhaka
      const z = n => String(n).padStart(2,'0');
      const Y=p.getUTCFullYear(), M=z(p.getUTCMonth()+1), D=z(p.getUTCDate()),
            h=z(p.getUTCHours()), m=z(p.getUTCMinutes());
      if (fmt === 'yyyyMMddHHmm') return `${Y}${M}${D}${h}${m}`;
      if (fmt === 'dd-MM-yyyy HH:mm') return `${D}-${M}-${Y} ${h}:${m}`;
      return `${D}-${M}-${Y}`;
    }},
    ScriptApp: { getProjectTriggers: () => opts.triggers || [], deleteTrigger(){},
      newTrigger: () => ({ timeBased: () => ({ everyMinutes: () => ({ create(){ env._created=true; } }) }) }) },
    SpreadsheetApp: null,
    ContentService: { createTextOutput: m => ({ setMimeType: () => m }), MimeType:{TEXT:1} },
    Session: { getEffectiveUser: () => ({ getEmail: () => 'owner@x.com' }) },
    publishContent: () => ({}),
    console: { log(){}, warn: m => env._warn = String(m) }
  };
  // _logBooking needs a sheet; record calls instead
  const names = Object.keys(env);
  const fn = new Function(...names, src + `
    _logBooking = function(d){ __logged.push(d); };
    return { sweepBookings, _newBookings, _fingerprint, _markHandled, _alreadyHandled,
             _handledList, _bookingEmail, doPost, installBookingSweep, _address, _recipients };`
    .replace('__logged', 'console.__logged'));
  env.console.__logged = logged;
  const api = fn(...names.map(n => env[n]));
  return { api, props, sent, logged, fetches, env };
}

const ts = t => ({ document: { fields: t } });
const row = (name, phone, at, extra={}) => ts(Object.assign({
  name:{stringValue:name}, phone:{stringValue:phone}, service:{stringValue:'Consultation'},
  date:{stringValue:'05-10-2026'}, time:{stringValue:'11:30 AM'},
  createdAt:{timestampValue:at}
}, extra));

let fail = 0;
const ok = (label, got, want) => {
  const pass = JSON.stringify(got) === JSON.stringify(want);
  if (!pass) fail++;
  console.log((pass?'  PASS  ':'  FAIL  ') + label + (pass?'':`\n          got  ${JSON.stringify(got)}\n          want ${JSON.stringify(want)}`));
};

console.log('--- mapping a Firestore document');
{
  const {api} = makeEnv({rows:[
    row('Nusrat','01712345678','2026-09-04T05:00:00Z',{address:{stringValue:'Road 5, Banani'}}),
    row('Old One','01812345678','2026-09-04T05:01:00Z',{note:{stringValue:'Mirpur 10'}}),
    row('No Addr','01912345678','2026-09-04T05:02:00Z'),
    ts({}),                                   // a malformed doc must not crash the run
  ]});
  const list = api._newBookings('T','2026-09-04T04:00:00Z');
  ok('address field read',      list[0].address, 'Road 5, Banani');
  ok('old note field read',     list[1].address, 'Mirpur 10');
  ok('missing address is ""',   list[2].address, '');
  ok('empty doc still mapped',  list[3].name, '');
  ok('createdAt carried',       list[0].createdAt, '2026-09-04T05:00:00Z');
  ok('emergency defaults false',list[0].emerg, false);
}
console.log('--- the query itself');
{
  const {api, fetches} = makeEnv({rows:[]});
  api._newBookings('T','2026-09-04T04:00:00Z');
  const q = fetches[0].structuredQuery;
  ok('queries bookings',   q.from[0].collectionId, 'bookings');
  ok('filters on createdAt', q.where.fieldFilter.field.fieldPath, 'createdAt');
  ok('greater than',       q.where.fieldFilter.op, 'GREATER_THAN');
  ok('oldest first',       q.orderBy[0].direction, 'ASCENDING');
}
console.log('--- first run never emails the archive');
{
  const {api, props, sent} = makeEnv({rows:[row('X','01711111111','2020-01-01T00:00:00Z')]});
  api.sweepBookings();
  ok('nothing sent',        sent.length, 0);
  ok('sweepFrom recorded',  typeof props.sweepFrom === 'string' && props.sweepFrom.length > 10, true);
}
console.log('--- a normal sweep');
{
  const {api, props, sent, logged} = makeEnv({
    props:{sweepFrom:'2026-09-04T04:00:00Z'},
    rows:[row('Nusrat','01712345678','2026-09-04T05:00:00Z'),
          row('Karim','01812345678','2026-09-04T05:06:00Z')]});
  api.sweepBookings();
  ok('both emailed',        sent.length, 2);
  ok('both logged to sheet',logged.length, 2);
  ok('sweepFrom advanced',  props.sweepFrom, '2026-09-04T05:06:00Z');
  ok('subject is the usual',sent[0].subject, 'New booking — Nusrat');
}
console.log('--- the beacon got there first');
{
  const {api, props, sent} = makeEnv({props:{sweepFrom:'2026-09-04T04:00:00Z'}, rows:[]});
  const fp = api._fingerprint('01712345678', new Date('2026-09-04T05:00:00Z'));
  api._markHandled(fp);
  const e2 = makeEnv({props:{sweepFrom:'2026-09-04T04:00:00Z', handled: props.handled},
    rows:[row('Nusrat','01712345678','2026-09-04T05:00:00Z'),
          row('Karim','01812345678','2026-09-04T05:06:00Z')]});
  e2.api.sweepBookings();
  ok('duplicate skipped',   e2.sent.length, 1);
  ok('the other one sent',  e2.sent[0].subject, 'New booking — Karim');
  ok('sweepFrom still advances past both', e2.props.sweepFrom, '2026-09-04T05:06:00Z');
}
console.log('--- doPost records the fingerprint it just sent');
{
  const {api, props, sent} = makeEnv({});
  api.doPost({postData:{contents:JSON.stringify({token:'Example.JS',name:'Rahim',phone:'01711223344'})}});
  ok('email sent',          sent.length, 1);
  ok('fingerprint stored',  JSON.parse(props.handled).length, 1);
}
console.log('--- the fingerprint store is capped');
{
  const {api, props} = makeEnv({});
  for (let i=0;i<130;i++) api._markHandled('fp'+i);
  const list = JSON.parse(props.handled);
  ok('capped at 100',       list.length, 100);
  ok('oldest dropped',      list[0], 'fp30');
  ok('newest kept',         list[99], 'fp129');
  ok('re-marking is a no-op', (api._markHandled('fp129'), JSON.parse(props.handled).length), 100);
}
console.log('--- a mail failure delays, never loses');
{
  const {api, props, sent} = makeEnv({
    props:{sweepFrom:'2026-09-04T04:00:00Z'}, mailFailsAfter:1,
    rows:[row('A','01711111111','2026-09-04T05:00:00Z'),
          row('B','01722222222','2026-09-04T05:01:00Z'),
          row('C','01733333333','2026-09-04T05:02:00Z')]});
  api.sweepBookings();
  ok('stopped after the failure', sent.length, 1);
  ok('sweepFrom left at the last SENT one, so B and C retry next time',
     props.sweepFrom, '2026-09-04T05:00:00Z');
}
console.log('--- Firestore refuses');
{
  const {api, props, sent} = makeEnv({props:{sweepFrom:'2026-09-04T04:00:00Z'}, httpCode:403});
  api.sweepBookings();
  ok('nothing sent',       sent.length, 0);
  ok('sweepFrom untouched',props.sweepFrom, '2026-09-04T04:00:00Z');
}
console.log('--- sign-in fails');
{
  const {api, props, sent} = makeEnv({props:{sweepFrom:'2026-09-04T04:00:00Z'}, token:'',
    rows:[row('A','01711111111','2026-09-04T05:00:00Z')]});
  api.sweepBookings();
  ok('nothing sent',       sent.length, 0);
  ok('sweepFrom untouched',props.sweepFrom, '2026-09-04T04:00:00Z');
}
console.log('--- both senders produce the identical email');
{
  const {api} = makeEnv({});
  const b = {name:'Nusrat',phone:'01712345678',service:'RCT',date:'05-10-2026',
             time:'11:30 AM',address:'Road 5, Banani',emerg:false};
  const viaBeacon = api._bookingEmail(Object.assign({token:'Example.JS'}, b));
  const viaSweep  = api._bookingEmail(Object.assign({createdAt:'2026-09-04T05:00:00Z'}, b));
  ok('byte-identical body',    viaBeacon.body, viaSweep.body);
  ok('byte-identical subject', viaBeacon.subject, viaSweep.subject);
  ok('address is in it',       /Road 5, Banani/.test(viaBeacon.body), true);
}
console.log('--- installing the trigger');
{
  const removed = [];
  const {api, env} = makeEnv({triggers:[{getHandlerFunction:()=>'sweepBookings'},
                                        {getHandlerFunction:()=>'sendReminders'}]});
  api.installBookingSweep();
  ok('trigger created', env._created, true);
}
console.log(fail ? `\n${fail} FAILED` : '\nall passed');
process.exit(fail ? 1 : 0);
