# LevelUp Broadcast Gallery

Open [the gallery](https://levelupsportsathleticsclub-code.github.io/levelup-cricket-overlay/g/) in your browser. Use **Copy OBS URL** on an item. The gallery is for browsing. The copied URL is a transparent page that renders only one item.

## First upload

Upload your original graphics (not screenshots) into **g/assets/** on main using **Add file → Upload files** in GitHub. The three slots already registered are:

| Slot | File | Overlay |
| --- | --- | --- |
| LevelUp Logo | assets/logo.png | o.html?m=logo |
| Photo Ad | assets/photo-ad.jpg | o.html?m=photo |
| LVLUP Ad | assets/lvlup-ad.mp4 | o.html?m=ad |

If the existing LVLUP Ad is a still image, upload its image file and change the ad entry's type to image and src to that filename. The overlay URL stays the same. For a transparent logo, upload a PNG with an alpha channel.

## Add or replace media

1. Upload the media to g/assets/ and add an entry to g/catalog.json. For example:
   `{"id":"pickleball-flyer","title":"Pickleball Flyer","category":"Photo","type":"image","src":"assets/pickleball-flyer.png"}`
2. Use a unique lowercase ID with hyphens. Keep the same ID to replace an asset without changing its OBS URL. For a new revision, a fresh filename in src avoids stale media caches.
3. After Pages deploys, open the gallery and confirm playback. Copy the item's OBS URL. This is a public repository and site.
4. Short muted H.264 MP4 clips are a practical starting format. GitHub's browser upload limit is 25 MiB per file. For bigger videos, use a publicly reachable direct HTTPS media URL in src, not a video watch page. Video overlays loop muted.

## OBS

Add a **Browser Source**, leave **Local file** unchecked, and paste the copied URL. Choose width and height matching the asset ratio, then size and position it on the canvas. Put it above the camera feed. Toggle the eye to show/hide. For a looping video that starts again each time it is shown, enable **Shutdown source when not visible**. After replacing media, use **Refresh cache of current page** if OBS still shows the older version. Keep your old local sources hidden until the replacement is verified.

## Shortcuts for existing sport promos

The existing URLs still work. The following paths resolve to the same promo pages:

- p/?pb — Pickleball Open Play
- p/?ph — Pickleball Happy Hours
- p/?vb — Volleyball Open Play
- p/?bd — Badminton Open Play
- p/?vc — Volleyball Clinics
- p/?vt — Volleyball Training
- p/?bt — Badminton Training
- p/?ct — Indoor Cricket Tournament
- p/?bc — Box Cricket
- p/?ft — Indoor Futsal

These shorten the path, not the GitHub Pages hostname.
