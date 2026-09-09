# All South Credit Conference 2026 — Conference App

A single-page, installable web app for the 2026 All South Credit Conference.
No build step, no framework, no backend. Static files on GitHub Pages.

---

## Files

| File | What it is | Do you edit it? |
|---|---|---|
| `data.js` | **All content and settings** — agenda, wifi, roster URL, exhibitors, links | **Yes — this is the only file you normally touch** |
| `index.html` | The app itself (layout, styling, behavior) | Rarely |
| `sw.js` | Offline caching. Bump `CACHE = 'as26-v3'` → `'as26-v4'` (and so on) when you change content | Only to force a refresh |
| `manifest.json` | Makes it installable to a phone home screen | No |
| `assets/logos/` | Exhibitor + sponsor logos | Add files as needed |
| `assets/icon-*.png` | App icons | No |
| `assets/hotel-map.png` | **Not included yet.** Drop the floor plan here and the map section appears automatically | Yes, when you get it |

---

## Step 1 — Create the repo and turn on Pages

1. On GitHub, in the **NACM organization**, create a new **public** repo. Suggested name: `allsouth-2026`
2. Upload every file in this folder, keeping the `assets/` folder structure intact.
3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main`, folder: `/ (root)` → **Save**.
4. Two minutes later the app is live at:

```
https://<nacm-org-name>.github.io/allsouth-2026/
```

That's the URL to put behind the QR code in the printed program.

> **Note on the URL:** if you want the shorter `https://<org>.github.io/`, name the repo
> `<nacm-org-name>.github.io` instead. Only one repo per org can use that.

---

## Step 2 — Set up the live attendee list (Google Sheet)

**Why Google and not OneDrive:** the app is static JavaScript running in the attendee's browser. It has to fetch a raw CSV file directly. OneDrive/SharePoint share links return an HTML viewer page, not the file, and there's no CORS-open public endpoint without a Microsoft Graph token — which can't be safely embedded in a public page. Google Sheets has a purpose-built endpoint for exactly this. That's the whole reason.

### 2a. Build the sheet

Create a Google Sheet with **row 1 as headers**. The app recognizes these column names (case-insensitive, any order, extras ignored):

| Header | Required | Notes |
|---|---|---|
| `Name` | ✅ | Or use separate `First` / `Last` columns |
| `Title` | | Job title |
| `Company` | | |
| `City` | | |
| `Email` | | Adds an "Email ___" button on their card |
| `Group` | | Industry group / attendee type — shows as a chip |

Sorting happens automatically by **last name**. Don't worry about ordering the sheet.

A starter file is included: **`roster-template.csv`** — import it into a new Google Sheet
(File → Import → Upload) and replace the sample rows.

### 2b. Publish it

1. In the Sheet: **File → Share → Publish to web**
2. **Link** tab
3. First dropdown: pick the specific tab (not "Entire Document")
4. Second dropdown: **Comma-separated values (.csv)**
5. Click **Publish**, confirm
6. Copy the URL. It looks like:
   `https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv`

### 2c. Wire it up

Paste that URL into `data.js`:

```js
rosterCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv",
```

Commit. Done. From then on, **editing the Sheet updates the app** — no commits needed.

### Things to know

- **Propagation is not instant.** Google caches the published CSV for roughly 5 minutes. Edit, wait, then refresh.
- **That URL is public** to anyone who has it. Only put names, titles, companies, cities on the sheet — the same information that's on a name badge. **No phone numbers, no home addresses, and think twice about emails.**
- **Don't publish the whole document** — publish only the roster tab, so your internal columns (payment status, dietary notes, comps) stay private. Better still: keep your working registration sheet separate and have the published tab pull from it with formulas, e.g. `=FILTER(Registrations!A2:E, Registrations!F2:F="Paid")`.
- **Unpublishing** is the same menu: File → Share → Publish to web → **Stop publishing**. Do this after the conference.
- The app caches the last roster it successfully loaded, so it still shows a list if the hotel wifi dies mid-conference.

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

**Hotel map:** save the floor plan as `assets/hotel-map.png`. The Info tab detects it and adds a tappable Hotel Map section. If the file isn't there, the section doesn't render at all.

Also worth filling in when you have them:

```js
venueAddress:  "…",   // shows on the Info tab
venueMapsUrl:  "…",   // adds a "Directions to the hotel" button
programPdfUrl: "…",   // adds a "Full PDF program" button
surveyUrl:     "…",   // adds a "Feedback survey" button
```

---

## Step 4 — Adding a sponsor logo to a session

1. Put the logo in `assets/logos/` (PNG, transparent background, ~560px wide is plenty)
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
| Registration Lanyards | Handle.com *(Info tab only)* |
| Welcome Gift for Attendees | Emagia *(Info tab only)* |

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
