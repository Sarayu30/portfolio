# Transparent avatar states

Created with the built-in image generation tool in background-extraction mode, using the supplied PNGs as image references and `transparent_background: true`.

- Normal: `Cute Pixel Avatar in Striped Tee.png` → `dist/assets/avatar-idle.png`.
- Hover/focus: `Double-Pointing Pixel Girl.png` → `dist/assets/avatar-pointing.png`.

Prompt for each image: Remove only the dark background and halo. Preserve the exact character, face, expression, hairstyle, pink/blue/white striped tee, colors, pixel outlines and original pose (arms resting for normal; both pointing hands for hover). No redesign. Produce a clean standalone cutout with true transparent alpha, a square canvas and small margins; preserve proportions and keep both hands visible. No backdrop, border, shadow, glow or drawn checkerboard.

Both outputs were visually inspected and their alpha channels checked: 65% transparent pixels in the normal asset and 60% in the pointing asset. CSS aligns their head height and lower edge to avoid a jump between poses. The hover asset is loaded with the page, avoiding a first-hover network delay. Keyboard focus uses the same pose change, with no animation or transition. The button's accessible name and click behavior remain intact.
