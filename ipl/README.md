# LevelUp Cricket Overlay

Use a 1920 × 1080 browser source with transparency. The IPL-style graphics are at
`/levelup-cricket-overlay/ipl/`. The repository root forwards to this overlay and preserves query parameters. Without parameters, it displays the Rangers vs Ruthless XI sample without an on-screen sample label. Use the sample only for rehearsal. The center of the page is transparent for your camera feed.

The logo is a separate OBS source. The upper-right is clear for a separate ad source. Add `?header=0` to hide the centered league banner. The team shields show initials by default. Ads and subscribe graphics are separate OBS sources.

## Rangers vs Ruthless XI preview

Open [fixture 1018](https://levelupsportsathleticsclub-code.github.io/levelup-cricket-overlay/ipl/?mode=demo&club=1124300&fixture=1018)
to display the recorded sample at 67/0 after 2.5 overs.

## Match setup

Append `?club=CLUB_ID&fixture=FIXTURE_ID&feed=ENCODED_URL` to the graphics URL.
Use the URL-encoded address of a public, read-only JSON adapter for a CricClubs
integration authorized for your league and this broadcast. The overlay adds
`clubId` and `fixtureId` to the adapter request. The same graphics support other
fixtures by changing these query parameters.

Serve the adapter over HTTPS and allow the GitHub Pages origin through CORS.
Keep CricClubs credentials and upstream access on the server. The browser source
URL and its query parameters are visible to anyone who has the link.

Return a JSON snapshot with this shape:

```json
{
  "clubId": "1124300",
  "fixtureId": "1018",
  "updatedAt": "CURRENT_ISO_8601_TIMESTAMP",
  "phase": "live",
  "competition": "LPCL Indoor 2026",
  "innings": 1,
  "batting": "Rangers",
  "fielding": "Ruthless XI",
  "runs": 67,
  "wickets": 0,
  "legalBalls": 17,
  "deliveries": ["6", "6", "4", "6", "6"],
  "batters": [{"name": "Sathish Reddy", "runs": 47, "balls": 11, "onStrike": true}],
  "bowler": {"name": "Chetan Reddy", "runs": 50, "wickets": 0, "legalBalls": 11},
  "event": {"id": "unique-scored-event", "type": "six"}
}
```

Use a current server timestamp for each confirmed snapshot, including periods
between deliveries. Phases are `live`, `break`, and `final`. A final snapshot can
include a `result` string. Competition, deliveries, player figures, result, and
event are optional. Send stable event IDs across polls and use the latest event
type from `four`, `six`, `wicket`, `fifty`, and `century`.

The browser polls every five seconds after a successful response. On failure,
it retains the last valid score and identifies the feed as delayed. Before
switching NinjaCaster, verify a real scoring change reaches the new browser
source from the authorized integration.
