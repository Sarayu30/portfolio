# Sarayu Krishna — Portfolio

A responsive, buildless portfolio inspired by the reference’s dark grid, explorer navigation, display typography, floating project previews, and project-detail overlays. Personalized with a sage/lime accent, original layout, and verified résumé/GitHub content.

## Run locally

```sh
npm run dev
```

Open **http://127.0.0.1:4173**. Node 18+ is sufficient. There are no runtime dependencies or build step. Deploy the `dist` directory to any static host.

## Customize

- `dist/index.html`: personal information, experience, achievements, and contact links.
- `dist/styles.css`: typography, colors, layout, animation, and responsive styles.
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

## Content sources

- Supplied résumé: Sarayu_Krishna_Nagasarapu_Resume.pdf.
- https://github.com/Sarayu30/Ripple/tree/version_2
- https://github.com/Sarayu30/flexiflow-new
- https://github.com/Sarayu30/Advanced-Web-Application-Firewall
- https://github.com/Sarayu30/Code-Companion-AI

Ripple and WAFinity images come from the public project repositories. Ripple's screenshot uses documentation fixtures, labeled in the portfolio. FlexiFlow's illustration is a repository asset, labeled as a preview placeholder. Code Companion's preview is an original conceptual illustration made in HTML/CSS, not a screenshot. Project links are external and service availability is controlled by their respective hosts.

Fonts: Afacad and Bebas Neue, obtained from Google Fonts, distributed under the SIL Open Font License. License texts are in `dist/assets/licenses/`.
