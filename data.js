/* ============================================================================
   All South Credit Conference 2026 — App Data & Configuration
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT for normal updates.
   Change something here, commit, and the live app updates.
   ========================================================================== */

const CONFIG = {
  eventName: "All South Credit Conference",
  eventYear: "2026",
  venue: "Hilton Southlake Town Square",
  venueAddress: "1400 Plaza Place, Southlake, TX 76092",
  venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hilton+Southlake+Town+Square%2C+1400+Plaza+Place%2C+Southlake%2C+TX+76092",

  // ---- WIFI (forthcoming from the hotel) -----------------------------------
  wifi: {
    network: "",                 // e.g. "AllSouth26"
    password: "",                // e.g. "credit2026"
    note: ""                     // e.g. "Select 'Conference' then accept the terms"
  },

  // ---- LIVE ATTENDEE LIST --------------------------------------------------
  // The app tries these in order and uses the first one that returns rows.
  //
  //  [0] The "File → Share → Publish to web → CSV" link. This is the reliable
  //      one: it is explicitly built to be read by a web page. Paste it here
  //      when you have it and it becomes the primary source.
  //  [1] The gviz endpoint for the same sheet. Works today because the sheet
  //      is shared "anyone with the link can view" — no publishing needed —
  //      but Google does not guarantee a browser can read it cross-origin.
  //
  // Leaving [0] blank is fine; blank entries are skipped.
  rosterCsvUrl: [
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0FVjgCuVTqvGzJf1rC_rWC7iiu7BjK2V72JqXxbREu6-7y2RAr1t6PwObEqFUwCqG-2XmQU2_fi0g/pub?gid=0&single=true&output=csv",
    "https://docs.google.com/spreadsheets/d/10G8QOV1DjaTTCvytfiLsC4fzXkmPNr7YuVgPOkAviUU/gviz/tq?tqx=out:csv"
  ],

  // ---- LINKS ---------------------------------------------------------------
  surveyUrl: "",                 // feedback survey
  programPdfUrl: "",             // full PDF program
  websiteUrl: "https://nacmsw.com",
  supportEmail: "tony@nacmsw.com",
  supportPhone: "972-536-0400",

  // ---- HOTEL MAP -----------------------------------------------------------
  // Drop hotel-map.png at the top level of the repo (or .jpg and change this).
  // If the file isn't there, the section hides itself automatically.
  hotelMapImage: "hotel-map.png",

  // Conference dates used for the "Happening now" indicator (local time)
  days: [
    { id: "wed", label: "Wed", date: "2026-09-23", long: "Wednesday, September 23" },
    { id: "thu", label: "Thu", date: "2026-09-24", long: "Thursday, September 24" },
    { id: "fri", label: "Fri", date: "2026-09-25", long: "Friday, September 25" }
  ]
};

/* ============================================================================
   AGENDA
   ----------------------------------------------------------------------------
   Each item:
     start / end  "HH:MM" 24-hour  (drives sorting + the "now" indicator)
     title        required
     room         optional
     speaker      optional — shown under the title
     kind         "session" | "meal" | "break" | "logistics" | "social" | "keynote"
     circuit      optional group heading, e.g. "Education Circuit I"
     short        optional shorter title used on the agenda card only
     desc         optional long description — makes the item clickable
     sponsor      optional { name, logo } — logo is a path under assets/logos/
     tba          true  → shows a "details coming" flag
   ========================================================================== */

const AGENDA = {
  wed: [
    {
      start: "11:30", end: "15:00", room: "Statler Foyer",
      title: "Attendee Check-in Open", kind: "logistics",
      desc: "Pick up your badge and lanyard in the Statler Foyer. Lanyards are courtesy of Handle.com.",
      sponsor: { name: "Handle.com", logo: "assets/logos/handle.png" }
    },
    {
      start: "11:30", end: "15:00", room: "Statler Foyer",
      title: "Welcome Gift for Attendees", kind: "logistics",
      desc: "Don't leave the registration table without your welcome gift — a thank-you to every attendee, provided by Emagia.",
      sponsor: { name: "Emagia", logo: "assets/logos/emagia.png" }
    },
    {
      start: "11:30", end: "15:00", room: "Statler Foyer",
      title: "Exhibitor Set Up & Check-in Open", kind: "logistics"
    },
    {
      start: "12:15", end: "13:00", room: "Statler 1", kind: "session",
      title: "Using AI to Navigate a Bankruptcy Case",
      speaker: "Lynnette Warman, Esq. — Pierson Ferdinand LLP",
      desc: "Let's talk about the importance of reviewing, drafting, and advising with precision! In this session with Lynnette, you learn to analyze filings, identify risks and opportunities, predict outcomes, and provide actionable insights, so you can make faster, more informed decisions."
    },
    {
      start: "12:15", end: "13:00", room: "Statler 2", kind: "session",
      title: "Next Level Communication Skills",
      speaker: "Diana Crowe, CGA — NACM Southwest",
      desc: "Effective communication is the cornerstone of professional success, yet most of us overlook the subtle, powerful cues that elevate interactions from competent to exceptional. You'll walk away with practical tools to recognize, interpret, and respond to these cues in real-world settings, deepening your ability to lead with empathy, clarity, and influence."
    },
    { start: "13:00", end: "13:15", room: "Statler Foyer", title: "Break", kind: "break" },
    {
      start: "13:15", end: "15:15", room: "Statler 1", kind: "session",
      title: "Building Industry Best Practices",
      speaker: "Facilitated by Sean Rooney, JD, Esq. — Herberger & Associates PC",
      desc: "An open, industry-specific roundtable for credit professionals serving the building materials trade. Bring your toughest accounts and current questions — this is a working discussion, not a lecture."
    },
    {
      start: "13:15", end: "15:15", room: "Statler 2", kind: "session",
      title: "Oil & Gas Industry Best Practices",
      speaker: "Facilitated by Ieshia Dunmore, Esq. — Andrews Myers",
      desc: "An open, industry-specific roundtable for credit professionals serving oil and gas. Bring your toughest accounts and current questions — this is a working discussion, not a lecture."
    },
    { start: "15:15", end: "15:30", room: "Statler Foyer", title: "Break", kind: "break" },
    {
      start: "15:30", end: "16:30", room: "Statler 456", kind: "session",
      title: "The Intentional Leader",
      speaker: "Tim Lane — Arcosa, Inc.",
      desc: "Explore how credit professionals can lead with purpose, balancing results and relationships to develop themselves and their teams. Tim will equip attendees with practical frameworks and real-world insights to transform leadership from reactive management into intentional influence. They will also learn to balance goal achievement with team development and gain actionable tools for personal and team growth.",
      sponsor: { name: "United TranzActions", logo: "assets/logos/uta.png" }
    },
    {
      start: "16:30", end: "18:30", room: "Statler Foyer", kind: "social",
      title: "Welcome Reception",
      desc: "Kick off the All South Credit Conference by reconnecting with colleagues, making new connections, and enjoying an evening of networking and conversation! Join us for refreshments, great company, and a warm welcome to the conference — all made possible by our friends at Dun & Bradstreet.",
      sponsor: { name: "Dun & Bradstreet", logo: "assets/logos/dun-bradstreet.png" }
    }
  ],

  thu: [
    {
      start: "08:00", end: "15:45", room: "Statler Foyer", title: "Check-In Open", kind: "logistics",
      desc: "Registration stays open through the afternoon in the Statler Foyer. Lanyards are courtesy of Handle.com.",
      sponsor: { name: "Handle.com", logo: "assets/logos/handle.png" }
    },
    { start: "08:00", end: "09:00", room: "Statler 456", title: "Breakfast", kind: "meal" },
    {
      start: "09:00", end: "10:00", room: "Statler 456", kind: "keynote",
      title: "Staying Grounded in Busy Times",
      speaker: "Greg Ellis — former Dallas Cowboy",
      desc: "A dominant defensive end drafted in the first round of the 1998 NFL Draft, Greg Ellis played 11 seasons with our very own Dallas Cowboys before a final year with the Oakland Raiders. Moved by the rising mental health crisis among athletes and beyond, especially following the tragic loss of Junior Seau, Ellis founded Getting My Help (GMH), a nonprofit mental wellness initiative designed to break down barriers to mental health care. By combining psychological theory with emerging scientific insights, Ellis will provide practical tools to understand personal history, break unhealthy cycles, and build lasting habits that support holistic mental wellness.",
      sponsor: { name: "Randall K. Lindley — Bell Nunnally & Martin LLP", logo: "assets/logos/bell-nunnally.png" }
    },
    { start: "10:00", end: "10:15", room: "Statler Foyer", title: "Coffee Break", kind: "break",
      sponsor: { name: "NCS Credit", logo: "assets/logos/ncs-credit.png" } },

    {
      start: "10:15", end: "11:30", room: "Statler 1", kind: "session", circuit: "Education Circuit I",
      title: "Onboarding a New Customer",
      speaker: "Matt Jameson, Esq. — Jameson and Dunagan, P.C.",
      desc: "Gain practical guidance on how to structure and use credit applications as a frontline risk management tool! The session also highlights how proper documentation strengthens your position if a customer defaults, while exploring how emerging AI tools can support credit professionals through improved analysis, communication, and risk assessment."
    },
    {
      start: "10:15", end: "11:30", room: "Statler 2", kind: "session", circuit: "Education Circuit I",
      title: "Are Credit Cards Still Eating Into Your Margins? Latest Developments on Credit Card Surcharging & Fee Reductions",
      short: "Are Credit Cards Still Eating Into Your Margins?",
      speaker: "Matt Fluegge (United TranzActions) & Wanda Borges, Esq. (Borges & Associates, LLC)",
      desc: "Credit cards have become one of the most common payment methods in B2B transactions, but processing fees can significantly impact profit margins. As more states allow credit card surcharging, many businesses are exploring ways to recover these costs while remaining compliant. This session will address common questions from credit, sales, and executive teams, using real-world examples from NACM members who have successfully implemented surcharge programs to reduce processing fees, improve margins, and expand customer payment options."
    },
    {
      start: "10:15", end: "11:30", room: "Statler 3", kind: "session", circuit: "Education Circuit I",
      title: "How Sales and Credit Can Be Friends",
      speaker: "Jessica Kinney, CBA — Soligent",
      desc: "Sales and credit may have different priorities, but they share the same goal: helping the business succeed. Join Jessica Kinney for practical strategies to improve communication, build trust, and create stronger partnerships between sales and credit. You'll leave with ideas you can put to work right away to help both teams succeed together."
    },

    {
      start: "11:30", end: "12:30", room: "Statler 456", title: "Lunch", kind: "meal",
      desc: "Lunch is served in Statler 456, courtesy of Jameson & Dunagan, P.C. Grab a seat and check your table tent — it assigns you a team for the baby photo game happening on stage during lunch.",
      sponsor: { name: "Jameson & Dunagan, P.C.", logo: "assets/logos/jameson-dunagan.png" }
    },
    {
      start: "11:30", end: "12:30", room: "Statler 456", kind: "social",
      title: "Guess Whose Baby Photo?",
      short: "Guess Whose Baby Photo?",
      desc: "Lunchtime entertainment, on the main stage. Check the table tent at your lunch table — the baby photo on it puts you on Team Rebecca or Team Kevin for the whole game. Our exhibitors have handed over their own baby photos, and they'll join us on stage while both teams try to match the baby to the grown-up. The winning team collects $5 Starbucks gift cards at the NACM and association booths right after the game, so don't wander off.",
      sponsor: { name: "Hicks Law Group", logo: "assets/logos/hicks-law-group.png" }
    },

    {
      start: "12:45", end: "14:00", room: "Statler 1", kind: "session", circuit: "Education Circuit II",
      title: "AI Benefits for your Credit Department",
      speaker: "Randy Lindley, Esq. — Bell Nunnally & Martin LLP",
      desc: "Artificial Intelligence is becoming a valuable tool for credit professionals, helping departments improve efficiency, enhance risk assessment, detect potential fraud, and streamline everyday tasks. This session will explore practical ways AI can support your credit department, increase productivity, and improve decision-making while highlighting key considerations for responsible use."
      // If Bell Nunnally bought a session sponsorship, uncomment:
      // , sponsor: { name: "Bell Nunnally & Martin LLP", logo: "assets/logos/bell-nunnally.png" }
    },
    {
      start: "12:45", end: "14:00", room: "Statler 2", kind: "session", circuit: "Education Circuit II",
      title: "Unlock the Power of the National Trade Credit Report",
      speaker: "NACM Staff",
      desc: "The National Trade Credit Report (NTCR) isn't just one of the most valuable benefits of NACM membership — it's your competitive edge for smarter, faster credit decisions. Discover how to unlock its full power: search the database like a pro, interpret results with confidence, and understand how contributing your own data strengthens the collective intelligence that sets NACM members apart. Walk away ready to protect your business, reduce risk, and turn shared credit data into a decisive advantage."
    },
    {
      start: "12:45", end: "14:00", room: "Statler 3", kind: "session", circuit: "Education Circuit II",
      title: "Building Best in Class Teams",
      speaker: "Joseph Grass, CICP & Chason Dancer, CBA — DXP Enterprises",
      desc: "A high-performing credit department starts with a strong team. But what does it take to build, develop, and retain top talent? Join Joseph and Chason as they share their experiences building best-in-class credit teams. Learn practical strategies for hiring the right people, fostering a culture of excellence, and creating a team that drives results!"
    },

    { start: "14:00", end: "14:15", room: "Statler Foyer", title: "Break", kind: "break",
      sponsor: { name: "NCS Credit", logo: "assets/logos/ncs-credit.png" } },

    {
      start: "14:15", end: "15:30", room: "Statler 1", kind: "session", circuit: "Education Circuit III",
      title: "Legal Essentials",
      speaker: "Karen Hart, Esq. — Bell Nunnally & Martin LLP",
      desc: "The legal landscape is constantly evolving, and staying informed is critical to protecting your company and minimizing risk. Join Karen Hart, Esq. for an engaging session covering the legal fundamentals every credit professional should know. From contracts and collections to bankruptcy, liens, and emerging legal developments, this session will provide practical insights to help you navigate common challenges with confidence. Whether you're looking for a refresher on the basics or updates on current legal trends affecting the credit industry, you'll leave with valuable knowledge and actionable takeaways to strengthen your day-to-day decision-making."
      // If Bell Nunnally bought a session sponsorship, uncomment:
      // , sponsor: { name: "Bell Nunnally & Martin LLP", logo: "assets/logos/bell-nunnally.png" }
    },
    {
      start: "14:15", end: "15:30", room: "Statler 2", kind: "session", circuit: "Education Circuit III",
      title: "Game On! How to Enforce a Judgment in Texas",
      speaker: "Chris Jameson, Esq. — Jameson & Dunagan, PC",
      desc: "You got a judgment — now what? Join experienced judgment enforcement attorney Chris Jameson as he breaks down all of the ways that a commercial creditor enforces a Judgment in Texas. Chris will share real-life war stories and proven strategies for collecting on a Judgment. From Writs of Execution to Receiverships, discover how to navigate the post-judgment landscape and walk away with the practical tools you need to enforce your judgment and get paid."
    },
    {
      start: "14:15", end: "15:30", room: "Statler 3", kind: "session", circuit: "Education Circuit III",
      title: "Collections Tips & Tricks",
      speaker: "Paul Krause — NACM Southwest",
      desc: "Join NACM Southwest's own Paul Krause for a practical, no-nonsense session designed to sharpen your collections game. Paul will walk through a full spectrum of real-world strategies — from risk reduction and internal collections processes to tackling past due accounts head-on. He'll also cover how to handle common debtor excuses, know when it's time to write off a balance or escalate to a collections agency, and when referring the matter to an attorney is the right call. Whether you're new to credit or a seasoned pro, you'll walk away with tools you can put to work immediately."
    },

    { start: "15:30", end: "15:45", room: "Statler Foyer", title: "Break", kind: "break",
      sponsor: { name: "NCS Credit", logo: "assets/logos/ncs-credit.png" } },

    {
      start: "15:45", end: "16:45", room: "Statler 1", kind: "session", circuit: "Education Circuit IV",
      title: "Expanding Your Credit Skill Sets into Supplier Risk Management",
      speaker: "Kevin Chandler, ICCE, CCE, CICP, RGCP",
      desc: "Today's credit professionals play a critical role beyond managing customer risk. As supply chains become more complex, expanding your expertise into supplier risk management can help strengthen your organization and create greater business value. Join us as we explore strategies for developing supplier diversity with clear objectives and accountability, conducting broader due diligence, implementing real-time monitoring systems, and leveraging emerging technologies. Discover how these tools and best practices can help you identify potential risks earlier, build stronger supplier relationships, and become a more strategic business partner."
    },
    {
      start: "15:45", end: "16:45", room: "Statler 2", kind: "session", circuit: "Education Circuit IV",
      title: "The Cost of War — Excuse Me, Military Engagement: Projecting the Effects of the Iran Conflict on the Supply Chain",
      speaker: "Kevin Wiley, Esq. — Hicks Law Group",
      desc: "Without question, the conflict with Iran creates significant economic uncertainty through higher energy costs, inflation, supply chain disruptions, and increased credit risk. Credit managers play a crucial role in protecting company cash flow and minimizing bad debt by strengthening credit controls, closely monitoring customer financial health, and proactively managing risk during periods of geopolitical instability. This presentation will assist credit managers in their roles of managing risks during this period of economic instability by discussing the energy market disruptions, inflationary pressures, supply chain challenges, and increased financial risk exposure for contractors, suppliers, and project owners caused by the Iran conflict."
    },
    {
      start: "15:45", end: "16:45", room: "Statler 3", kind: "session", circuit: "Education Circuit IV",
      title: "Construction Curveballs: Hitting a Homerun",
      speaker: "Rebecca Hicks, Esq. — Hicks Law Group",
      desc: "Credit in the construction industry is a whole different ballgame — and this session is your playbook. Designed for credit professionals navigating the unique complexities of construction, this session breaks down the essentials from the ground up. You'll learn how to identify the key players across today's construction delivery systems, protect your lien and bond rights when working with third-party services, and handle customers operating under contingent payment contracts. We'll also cover best practices for reviewing and executing lien waivers without giving up your leverage, and how to use the construction trust fund statute as a powerful shield against bankruptcy preference claims. Whether you're stepping up to the plate for the first time or looking to refine your swing, you'll leave with strategies to keep you ahead in the game."
    },

    {
      start: "17:30", end: "19:30", room: "The Henley", kind: "social",
      title: "Thursday Reception at The Henley",
      desc: "The conference may wrap up for the day, but the fun is just getting started! Join us Thursday evening for a memorable night of great food, drinks, and networking with fellow credit professionals from across the region. We're putting the finishing touches on an exciting experience, and we can't wait to share what's in store. Stay tuned — this is one event you won't want to miss!",
      sponsor: { name: "NACM National Trade Credit Report", logo: "assets/logos/nacm-ntcr.png" }
    }
  ],

  fri: [
    { start: "08:00", end: "09:00", room: "Statler 456", title: "Breakfast", kind: "meal" },
    {
      start: "09:00", end: "10:00", room: "Statler 456", kind: "session",
      title: "Work Smarter: Everyday AI For Credit & Collections Professionals",
      speaker: "Jordache Johnson",
      desc: "Jordache is a tech adoption strategist helping individuals and organizations navigate technological change with confidence instead of fear. He's been obsessed with understanding why some people thrive during disruption while others fall behind — connecting historical innovation patterns to current challenges. He teaches frameworks for adopting emerging technologies to keep your business competitive, future-proof your career, and thrive during constant change. AI is his primary case study, but his expertise spans emerging technologies broadly, bridging individual skill-building with organizational transformation."
    },
    { start: "10:00", end: "10:15", room: "Statler Foyer", title: "Coffee Break", kind: "break" },
    {
      start: "10:15", end: "11:30", room: "Statler 456", kind: "session",
      title: "Market Signals: An Economist's Perspective",
      speaker: "Chris Kuehl, PhD. — Armada Corporate Intelligence",
      desc: "You know him, you love him, and he's back by popular demand! Chris works to provide economic forecasts, industry analysis, corporate intelligence, and market assessment for clients in a variety of industries, and he's joining us again for All South to prepare you for the next economic shift!"
    },
    {
      start: "11:30", end: "11:45", room: "Statler 456", kind: "social",
      title: "Prize Drawings!",
      desc: "Stick around — you have to be present to win. Prize drawings close out the 2026 All South Credit Conference.",
      sponsor: { name: "Pierson Ferdinand LLP", logo: "assets/logos/pierson-ferdinand.png" }
    }
  ]
};

/* ============================================================================
   CIRCUIT SPONSORS
   ----------------------------------------------------------------------------
   A sponsor that covers a whole education circuit rather than one session.
   The logo appears on the circuit heading and inside each session's detail
   sheet — not repeated on every card. Key must match the `circuit` string.
   ========================================================================== */

const CIRCUIT_SPONSORS = {
  "Education Circuit I":   { name: "Professional Alternatives", logo: "assets/logos/professional-alternatives.png" },
  "Education Circuit II":  { name: "Professional Alternatives", logo: "assets/logos/professional-alternatives.png" },
  "Education Circuit III": { name: "Professional Alternatives", logo: "assets/logos/professional-alternatives.png" },
  "Education Circuit IV":  { name: "Professional Alternatives", logo: "assets/logos/professional-alternatives.png" }
};

/* ============================================================================
   EVENT-WIDE SPONSORS  —  "Thank you to our sponsors" grid on the Info tab
   ----------------------------------------------------------------------------
   Everything that isn't tied to a single agenda slot. `item` is the label
   shown under the logo. Sold agenda sponsorships appear here too, so the
   grid is the complete thank-you list.
   ========================================================================== */

const SPONSORS = [
  { item: "Registration Lanyards",      name: "Handle.com",                        logo: "assets/logos/handle.png" },
  { item: "Welcome Gift for Attendees", name: "Emagia",                            logo: "assets/logos/emagia.png" },
  { item: "Wednesday Reception",        name: "Dun & Bradstreet",                  logo: "assets/logos/dun-bradstreet.png" },
  { item: "Wednesday Welcome Speaker",  name: "United TranzActions",               logo: "assets/logos/uta.png" },
  { item: "Thursday Keynote Speaker",   name: "Bell Nunnally & Martin LLP",        logo: "assets/logos/bell-nunnally.png" },
  { item: "Thursday Education Circuits",name: "Professional Alternatives",         logo: "assets/logos/professional-alternatives.png" },
  { item: "Thursday Lunch",             name: "Jameson & Dunagan, P.C.",           logo: "assets/logos/jameson-dunagan.png" },
  { item: "Exhibitor Game",             name: "Hicks Law Group",                   logo: "assets/logos/hicks-law-group.png" },
  { item: "Thursday Breaks",            name: "NCS Credit",                        logo: "assets/logos/ncs-credit.png" },
  { item: "Thursday PM Reception",      name: "NACM National Trade Credit Report", logo: "assets/logos/nacm-ntcr.png" },
  { item: "Friday Prize Drawings",      name: "Pierson Ferdinand LLP",             logo: "assets/logos/pierson-ferdinand.png" }

  // Portal Button sponsors (UTA, Zoom Lien) intentionally left off for now.
  // To add them back:
  // , { item: "All South Portal Button", name: "United TranzActions", logo: "assets/logos/uta.png" }
  // , { item: "All South Portal Button", name: "Zoom Lien",           logo: "assets/logos/zoomlien.png" }
];

/* ============================================================================
   EXHIBITORS  —  shown as a logo grid on the Info tab
   ========================================================================== */

const EXHIBITORS = [
  { name: "Billtrust",                  logo: "assets/logos/billtrust.png" },
  { name: "Bell Nunnally & Martin LLP", logo: "assets/logos/bell-nunnally.png" },
  { name: "Dun & Bradstreet",           logo: "assets/logos/dun-bradstreet.png" },
  { name: "Emagia",                     logo: "assets/logos/emagia.png" },
  { name: "Experian",                   logo: "assets/logos/experian.png" },
  { name: "Handle.com",                 logo: "assets/logos/handle.png" },
  { name: "Levelset",                   logo: "assets/logos/levelset.png" },
  { name: "Montopay",                   logo: "assets/logos/montopay.png" },
  { name: "NACM Collection Services",   logo: "assets/logos/nacm-collections.png" },
  { name: "NCS Credit",                 logo: "assets/logos/ncs-credit.png" },
  { name: "NetNow",                     logo: "assets/logos/netnow.png" },
  { name: "Nuvo",                        logo: "assets/logos/nuvo.png" },
  { name: "Zoom Lien",                  logo: "assets/logos/zoomlien.png" }
];

/* ============================================================================
   UPCOMING EVENTS  —  "Save the date" block on the Info tab
   ========================================================================== */

const UPCOMING = [
  { date: "Wed. 9/30",  title: "Oklahoma Bonds & Liens" },
  { date: "Thurs. 10/1", title: "Excel Essentials: Part I" },
  { date: "Tues. 10/13", title: "FREE UTA Webinar!" },
  { date: "Wed. 10/14",  title: "From Data to Decisions: Part III" },
  { date: "Thurs. 10/22", title: "Excel Essentials: Part II" },
  { date: "Tues. 12/1",  title: "DFW Holiday Party" },
  { date: "Wed. 12/2",   title: "Houston Holiday Party" },
  { date: "Wed. 12/2",   title: "Tulsa Holiday Party" },
  { date: "Thurs. 12/3", title: "New Orleans Holiday Party" },
  { date: "Thurs. 12/3", title: "OKC Holiday Party" }
];
