# All South Credit Conference 2026 — Conference App

A single-page, installable web app for the 2026 All South Credit Conference.
No build step, no framework, no backend. Static files on GitHub Pages.

---

## Files

**Every file sits at the top level. There are no folders — deliberately.**
GitHub's web uploader flattens dragged folders, which silently broke every image
path the first time around. So all images now live *inside* `logos.js` as data
URIs and there is nothing nested left to lose.

| File | What it is | Do you edit it? |
|---|---|---|
| `data.js` | **All content and settings** — agenda, wifi, roster URL, sponsors, exhibitors, links | **Yes — this is the only file you normally touch** |
| `logos.js` | Every logo and the wordmark, embedded as data URIs. Generated — don't hand-edit | No |
| `index.html` | The app itself (layout, styling, behavior) | Rarely |
| `sw.js` | Offline caching. Bump `CACHE = 'as26-v8'` → `'as26-v9'` (and so on) when you change content | Only to force a refresh |
| `manifest.json` | Makes it installable to a phone home screen | No |
| `icon-*.png` | Home-screen icons (4 files) | No |
| `roster-template.csv` | Starter file for the attendee Google Sheet | Not part of the app |
| `hotel-map.png` | **Not included yet.** Drop the floor plan in at the top level and the map section appears automatically | Yes, when you get it |

### How images work now

`data.js` still refers to logos by friendly path — `assets/logos/uta.png`. At runtime
the app looks up the filename (`uta`) in `logos.js` and swaps in the embedded image.
Nothing is ever fetched from disk, so no upload can break it. If a key is somehow
missing, the app tries the path, then the same filename at the root, and only then
falls back to the sponsor's name in text.

**To add or change a logo:** send me the image file. `logos.js` is regenerated and I
hand back the updated file. Dropping a PNG into the repo won't do it any more —
that's the trade for making the images unbreakable.

---

## Step 1 — Create the repo and turn on Pages

1. On GitHub, in the **NACM organization**, create a new **public** repo. Suggested name: `allsouth-2026`
2. Select **all 11 files** and upload them. No folders to preserve — that's the point.
3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → **Save**.
4. Two minutes later the app is live at:

```
https://<nacm-org-name>.github.io/allsouth-2026/
```

That's the URL to put behind the QR code in the printed program.

> **Note on the URL:** if you want the shorter `https://<org>.github.io/`, name the repo
> `<nacm-org-name>.github.io` instead. Only one repo per org can use that.

---

## Step 2 — The live attendee list

**Already wired.** `data.js` points at the published CSV of your roster sheet,
read live on every app load. Editing the sheet updates the app — no commit needed.

### Your sheet's columns

```
Company | First Name | Last Name | Type | Email
```

The app reads all five. `Type` drives the privacy rule below. Rows sort by last
name automatically, so the sheet's own order doesn't matter.

Other recognized headers, if you ever add them: `Name` (instead of First/Last),
`Title`, `City`, `Group`. Extra columns are ignored.

### The member / exhibitor rule

| | Shown in the app |
|---|---|
| **Member** | Name, company. No email, no chip. |
| **Exhibitor** | Name, company, an **Exhibitor** badge, and an "Email —" button. |

Your sheet already leaves member emails blank, which is the part that actually
matters. The app enforces the same rule a second time: an address sitting in a
`Type = Member` row is dropped before the roster is even built.

**But understand where the real boundary is.** That sheet is readable by anyone
who has its ID — that's what lets the app read it without a login. So the
protection is *the cell being empty in the sheet*, not the app declining to
display it. Never put member emails, phone numbers, or home addresses on this
sheet, and keep payment status, comps, and dietary notes on a **different
document** — not just a different tab.

### Two URLs, tried in order

`rosterCsvUrl` is a list. The app tries each and keeps the first that returns rows:

1. **The published-to-web CSV** (primary, wired). Built for a web page to read.
2. **The `gviz` endpoint** for the same sheet — a standby, used only if the
   published URL ever stops answering.

Verified: with both wired, the app hits the published URL and never touches the
standby. Kill the published URL and it recovers from the standby with no visible
change to the attendee.

If you ever re-publish the sheet, Google may issue a **new** `2PACX-…` URL. The
old one goes dead, so send me the new one and I'll swap slot 1.

### How fresh is it?

Not instant, but close enough for a conference:

- **Google's cache is the bottleneck**, roughly 5 minutes on a published CSV.
  A registrant you add now shows up in the app a few minutes later, not
  immediately.
- **The app never caches it.** Every load fetches with `no-store` plus a
  cache-buster, and the service worker is explicitly told to leave Google's
  domains alone. So the app is always asking for the newest copy.
- **The attendee still has to reload.** The roster is read on app open, not
  streamed. Someone who left the app sitting on screen for an hour sees the list
  from an hour ago until they pull to refresh or reopen it.
- **No commit, ever.** Once slot 1 is wired, editing the sheet is the only step.
  Adding registrants never requires touching GitHub.

Net effect: add a name, wait about five minutes, reopen the app, and it's there.

### Other things to know

- **Duplicates are handled.** Your sheet has four exhibitors entered twice
  (Trisha Epino, Sabrina Buckley, Madison Cross, Brian Shappell). The app
  de-duplicates on name + company, so they appear once. Fixing the sheet is
  still tidier.
- **One row needs your attention:** Jennifer at Sunbelt Solomon Services has no
  last name — the cell reads as blank or `TRUE`, which is Sheets coercing a
  surname like "True" into a boolean. The app shows her as just "Jennifer" and
  files her under J. Retype it with a leading apostrophe (`'True`) to fix.
- **Offline resilience.** The last roster that loaded successfully is cached on
  the device, so the list still works if the hotel wifi dies mid-conference.
- **After the conference:** File → Share → Publish to web → Stop publishing, or
  set the sheet's link sharing back to restricted.

---

## Step 3 — Wifi, map, and links

Everything below lives in `CONFIG` at the top of `data.js`.

```js
wifi: {
  network: "AllSouth26",
  password: "credit2026",
  note: "Choose 'Conference' and accept the terms"
},
```

Leave the wifi fields blank and the Info tab shows *"The hotel hasn't released the conference network details yet"* — no broken state. Fill them in when the hotel comes through, commit, and bump the `CACHE` version in `sw.js` so installed phones pick up the change.

**Hotel map:** save the floor plan as `hotel-map.png` at the top level of the repo. The Info tab detects it and adds a tappable Hotel Map section. If the file isn't there, the section doesn't render at all. (Send it to me instead and I'll embed it like the logos.)

Also worth filling in when you have them:

```js
venueAddress:  "…",   // shows on the Info tab
venueMapsUrl:  "…",   // adds a "Directions to the hotel" button
programPdfUrl: "…",   // adds a "Full PDF program" button
surveyUrl:     "…",   // adds a "Feedback survey" button
```

---

## Step 4 — Adding a sponsor logo to a session

1. Send me the logo — it gets embedded into `logos.js` under a short key (e.g. `uta`)
2. Add a `sponsor` block to that agenda item in `data.js`:

```js
{
  start: "16:30", end: "18:30", room: "Statler Foyer", kind: "social",
  title: "Welcome Reception",
  desc: "…",
  sponsor: { name: "Dun & Bradstreet", logo: "assets/logos/dun-bradstreet.png" }
}
```

The logo then shows on the agenda card *and* large in the session detail sheet. If a logo file is missing, the app falls back to the sponsor's name in text rather than showing a broken image.

**Currently wired** (from the sponsorship grid):

| Slot | Sponsor |
|---|---|
| Wednesday Welcome Speaker — "The Intentional Leader" | United TranzActions |
| Wednesday Reception | Dun & Bradstreet |
| Thursday Keynote — "Staying Grounded in Busy Times" | Randall K. Lindley / Bell Nunnally & Martin |
| Thursday Education Circuits I–IV | Professional Alternatives *(via `CIRCUIT_SPONSORS`)* |
| Thursday Lunch | Jameson & Dunagan, P.C. |
| Exhibitor Game — "Guess Whose Baby Photo?" | Hicks Law Group |
| Thursday Breaks (all 3) | NCS Credit |
| Thursday PM Reception at The Henley | NACM National Trade Credit Report |
| Friday Prize Drawings | Pierson Ferdinand LLP |
| Attendee Check-in + Thursday Check-In (lanyards) | Handle.com |
| Welcome Gift for Attendees *(own line under registration)* | Emagia |

The All South Portal Button sponsors (UTA, Zoom Lien) are deliberately left off —
two commented lines at the end of `SPONSORS` in `data.js` will restore them.

**Unsold as of last update:** Pre-Conference Email (3 available), Charging Station,
Wednesday Best Practices Break, Thursday Breakfast, Friday Breakfast, Friday AI
Speaker, Friday Economic Speaker.

---

## How attendee notes work

Notes are stored in **`localStorage` on the attendee's own device**. They are never uploaded, and nobody at NACM can see them. That's deliberate — people write candid things about accounts and prospects.

The tradeoff: notes don't sync between a phone and a laptop, and clearing browser data loses them. The **My Notes** tab has *Copy all notes*, *Download as text file*, and *Email notes to myself* buttons, plus a plain-language explanation of all this, so people can get their notes off the device before they fly home.

If you ever want notes to sync across devices, that requires a backend (Supabase, like the TRMA benchmarking portal) and some form of sign-in. Different project.

---

## Sticky headers

The wordmark header and the Wed/Thu/Fri day selector both stay pinned while the
agenda scrolls, so the day you're looking at is always visible. Same for the
search box on the Attendees tab.

The header's height isn't fixed — it changes with the phone's notch/safe-area
inset and settles only after the wordmark image decodes — so the app measures it
at runtime and feeds the value to CSS as `--hdr-h`. A `ResizeObserver` keeps it
current through rotation and font-size changes. If you ever change the header's
padding or logo height, nothing needs adjusting; it re-measures itself.

## Theme

The app is locked to the light theme — `data-theme="light"` on the `<html>` tag in
`index.html`. Attendees' phones set to dark mode still see the light design.

This is deliberate: nearly every sponsor logo is drawn for a white background, and
a dark UI made some of them (and any missing-logo fallback text) hard to read.

The dark-mode CSS is still in the file but inert — every dark block is guarded with
`:root:not([data-theme="light"])`. To turn automatic dark mode back on, delete that
attribute from the `<html>` tag and restore the two `theme-color` meta tags noted in
the comment above the CSS tokens.

## Where sponsor logos appear

A sponsor's logo shows in every place their slot is represented — no tapping required:

| Location | What shows |
|---|---|
| Agenda card | "Sponsored by" row with the logo, on the card itself |
| Circuit heading | Circuit sponsor's logo beside the heading |
| Session detail sheet | Large logo in a bordered box |
| "Happening now / Up next" banner | Logo for the live or next session |
| My Notes → My schedule | Small logo under each saved session |
| Info → Thank you to our sponsors | Logo tile captioned with the slot purchased |

If a logo file is missing, the app falls back to the sponsor's name in text rather
than a broken image — so a missing file is a cosmetic issue, never a broken page.

## Publishing an update

```
Edit data.js  →  bump CACHE in sw.js  →  commit  →  live in ~1 minute
```

The `CACHE` bump matters. Attendees who installed the app to their home screen are served the cached copy first; changing the cache name is what tells their phone to pull fresh files. Roster changes are the exception — those come straight from the Sheet every time and need no commit at all.

---

## Local testing

```bash
cd allsouth-2026
python3 -m http.server 8000
# open http://localhost:8000
```

Open on `localhost`, not by double-clicking `index.html` — `file://` blocks the service worker and the CSV fetch.
