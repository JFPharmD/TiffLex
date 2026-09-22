# TiffLex — UMPJE Review

A free, offline review tool for the **Uniform MPJE** (Multistate Pharmacy Jurisprudence Examination) — a 1,476-question drill bank, flashcards, a timed mock exam, and a fact-checked cram sheet, all in a single page that keeps working with zero internet connection.

**Live app:** https://jfpharmd.github.io/TiffLex/
**About page:** https://jfpharmd.github.io/TiffLex/welcome.html

![TiffLex](og-image.png)

## Features

- **Drill mode** — multiple choice by domain, with the answer and explanation shown right after each question
- **Flashcards** — the same question bank as rapid-fire flip cards for recall practice
- **Mock exam** — a timed, 120-question simulation matching the real exam's format and seat time
- **Cram sheet** — a condensed, domain-organized reference of the numbers, forms, and deadlines that actually get tested, with the spots where common commercial question banks are outdated flagged explicitly
- **Fully offline** — everything (question bank, cram sheet, your progress) lives in the browser; nothing is sent to a server, there's no login, and after the first load it keeps working with no connection at all
- **Installable** — works as a Progressive Web App, so it can be added to a phone's home screen and launches full-screen like a native app

## Why this exists

Commercial UMPJE question banks are useful but not always current or accurate — federal pharmacy law changes, and some widely-circulated practice questions lag behind it. TiffLex's reference content was checked against DEA and FDA primary sources (21 CFR, DEA guidance, FDA compliance pages), with the places where common study material disagrees with current federal rules called out directly rather than silently corrected.

## Disclaimer

TiffLex is an independent, personal study project. It is **not** produced, reviewed, or endorsed by NABP, and it is not a substitute for NABP's own official UMPJE materials or a state board of pharmacy's requirements. Federal pharmacy law changes over time — treat this as a study aid, not a legal reference, and verify anything exam-critical against current primary sources.

## How it's built

A single self-contained `index.html` (HTML/CSS/vanilla JS, no build step, no framework) with the question bank and reference content embedded directly in the page. State is kept in the browser's `localStorage`; a small custom sync code lets progress be carried between devices without a backend. A `service-worker.js` caches the app shell on first load so it works completely offline afterward. Hosted for free on GitHub Pages.

Brand colors: pine `#173F35`, mint `#8ED6C1`, ivory `#FAFAF7`. The icon is vector (`mark.svg`); all raster sizes are generated from it.

## Running it locally

No build step — just open `index.html` in a browser, or serve the folder with any static file server, e.g.:

```
python3 -m http.server 8000
```

## License

Personal project, shared as-is for anyone studying for the same exam. No warranty as to accuracy — see Disclaimer above.
