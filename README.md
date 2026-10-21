# Sarayu Krishna — Portfolio

A responsive, buildless portfolio aligned with the supplied reference: a black file-explorer sidebar with expandable folders, centered introduction, muted grid background, blue-purple accents, scrolling toolkit, floating project previews, and alternating light experience cards around a central progress line. Content is personalized with verified résumé, GitHub, and publication details.

## Run locally

```sh
npm run dev
```

Open **http://127.0.0.1:4173**. Node 18+ is sufficient. There are no runtime dependencies or build step. Deploy the `dist` directory to any static host.

## Customize

- `dist/index.html`: personal information, experience, achievements, and contact links.
- `dist/styles.css`: reference-aligned typography, layout, responsive timeline, and motion controls.
- `dist/projects.js`: the four projects and all case-study content.
- `dist/app.js`: previews, native dialogs, menu, copy-email action, and local portfolio guide.
- `dist/assets/Sarayu-Krishna-Resume.pdf`: downloadable résumé, included with explicit permission.

### Add project videos later

1. Add a recording to `dist/assets/videos/`, for example `ripple.mp4` (H.264 MP4 is a broadly supported choice).
2. In `dist/projects.js`, set that project's `video` field to `assets/videos/ripple.mp4`.
3. Keep the `poster` path for loading/error fallback. Prefer a short, compressed recording.

Hover playback is muted and loops; the case study provides playback controls. Reduced-motion visitors are not autoplayed. Touch users open the case study by tapping the project. With no video, previews use the provided image or an explicitly labeled concept placeholder.

### Portfolio guide

The floating guide works locally with curated answers about the portfolio, keyword routing, and project/section navigation. It is explicitly labeled as a local guide, not an AI chatbot. It does not send questions to a service or retain conversations after refresh. A generative assistant would require a separately configured server API; never put a model API key into client JavaScript.

## Verification

```sh
npm run check
```

Checks JavaScript syntax, all local asset paths, section links, project completeness, unique IDs, and personalized content. Browser UI verification was unavailable in the creation environment; inspect desktop and mobile layouts and interactions in a browser before public launch.

Additional DOM checks covered project dialogs and focus return, mobile navigation, portfolio-guide answers, safe text rendering, copy-email, and publication links. These checks do not substitute for browser rendering verification. The avatar uses transparent cutouts of the supplied striped-tee and double-pointing pixel characters. The floating figure switches to the pointing pose on mouse hover or keyboard focus; touch devices keep the normal pose.

## Content sources

- Supplied résumé: Sarayu_Krishna_Nagasarapu_Resume.pdf.
- https://github.com/Sarayu30/Ripple/tree/version_2
- https://github.com/Sarayu30/flexiflow-new
- https://github.com/Sarayu30/troubleshooter
- https://github.com/Sarayu30/clcxray_object_detection_computervision

Publication metadata was cross-checked using DOI records and publisher pages because the ResearchGate contributions page returned HTTP 403. The four indexed papers are linked individually and grouped under Research:

- ECG Analysis for Myocardial Infarction Detection via Deep Learning (2026): https://doi.org/10.1016/j.procs.2026.06.168
- Transforming Urban Parking: Intelligent System for a Better City Experience (2025): https://doi.org/10.1007/978-981-96-4139-0_25
- Efficient Parking Spot Allocation in a Grid-Based Parking Lot (2025): https://doi.org/10.1109/COMP-SIF65618.2025.10969931
- Implementing a Multilingual Lexical Analyser for Java, C and C++ (2024): https://doi.org/10.1109/GCAT62922.2024.10923959
- ResearchGate profile: https://www.researchgate.net/scientific-contributions/Nagasarapu-Sarayu-Krishna-2308305356

Ripple's screenshot and FlexiFlow's illustration come from their public project repositories; the illustration is labeled as a preview placeholder. Troubleshooter uses an original SVG architecture illustration. Smart Screening uses an original SVG chart of repository-reported benchmark results. Both support replacement with recordings. Smart Screening concerns baggage-security imagery, as confirmed by the report; a contradictory chest-X-ray sentence in the repository README was not used. Project links are external and service availability is controlled by their respective hosts.

Fonts: Afacad and Bebas Neue, obtained from Google Fonts, distributed under the SIL Open Font License. License texts are in `dist/assets/licenses/`.

## Source repository

Updates are committed and pushed to https://github.com/Sarayu30/portfolio (the `origin` remote). The hosted private Site is published from the same source commit.

Avatar assets: `dist/assets/avatar-idle.png` (normal, sidebar, guide header) and `dist/assets/avatar-pointing.png` (hover/focus). Both have true transparent backgrounds; the floating figure has no border or backdrop. The supplied originals are retained locally and ignored. See `AVATAR-ASSETS.md` for background-extraction prompts and verification.
