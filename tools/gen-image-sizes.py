#!/usr/bin/env python3
"""Generate the resized copies every page actually loads.

The site keeps three copies of each photo:

    assets/services/<name>.jpg          full size  - used by the gallery lightbox
    assets/services/cards/<name>.jpg    640px wide - used by the gallery grid + service cards
    assets/services/thumbs/<name>.jpg   132px wide - used by the little thumb strips

Only the full-size file is mandatory (every <img> falls back to it via onerror), but
serving the full-size file to a 44px thumbnail is what made the site slow, so always
generate the copies after adding a photo.

Usage
-----
    python3 tools/gen-image-sizes.py                       # every photo missing a copy
    python3 tools/gen-image-sizes.py assets/services/x.jpg  # just these
    python3 tools/gen-image-sizes.py --force                # rebuild everything

Requires Pillow:  pip install Pillow
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SERVICES = ROOT / "assets" / "services"

# (subdirectory, target width in px)
SIZES = [("cards", 640), ("thumbs", 132)]

QUALITY = 82


def resize_one(src, out_dir, width):
    """Write a width-constrained copy of src into out_dir, keeping the aspect ratio."""
    out_dir.mkdir(parents=True, exist_ok=True)
    dest = out_dir / src.name
    im = Image.open(src).convert("RGB")
    if im.width > width:
        height = round(im.height * width / im.width)
        im = im.resize((width, height), Image.LANCZOS)
    im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return dest


def main(argv):
    force = "--force" in argv
    args = [a for a in argv if not a.startswith("--")]

    if args:
        sources = [Path(a) for a in args]
    else:
        sources = sorted(SERVICES.glob("*.jpg"))

    made = skipped = 0
    for src in sources:
        if not src.exists():
            print("missing: %s" % src)
            continue
        for sub, width in SIZES:
            dest = SERVICES / sub / src.name
            if dest.exists() and not force and dest.stat().st_mtime >= src.stat().st_mtime:
                skipped += 1
                continue
            out = resize_one(src, SERVICES / sub, width)
            im = Image.open(out)
            print("%-12s %-30s %4dx%-4d %5dKB" % (sub, out.name, im.width, im.height,
                                                  out.stat().st_size // 1024))
            made += 1

    print("\n%d copies written, %d already up to date" % (made, skipped))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
