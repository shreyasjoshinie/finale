# AirScope — AQI Analytics Dashboard

A responsive React + Vite website that showcases the supplied AQI visualisation exports and preserves the original interactive HTML visualisations.

## Included
- 38 PNG chart exports and their SVG counterparts
- Interactive AQI model (Plotly HTML)
- Interactive pollution timeline (Plotly HTML)
- Interactive station context map (Leaflet HTML)
- Searchable collections: Figures, Pollution, Temporal, Statistical, Weather and Spatial
- Full-screen chart viewer and PNG/SVG toggle

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP.
3. Open a terminal in the `aqi-analytics-website` folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite.

## Build for deployment
```bash
npm run build
```
The production site is generated in `dist/`.

## Deploy with Vercel
1. Push this folder to a GitHub repository.
2. Import that repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

No backend or environment variables are required for this static showcase.

## Notes
The website presents the visual outputs included in the uploaded archive. It does not claim to recalculate AQI values or regenerate the analyses. Interactive HTML files are embedded as supplied. The station map may rely on its external Leaflet/tile resources being reachable in the browser.


## Visual design update
The Pollution Edition uses a charcoal/smog palette with alert-orange accents, oversized editorial typography, floating particulate particles, animated atmospheric rings, hover depth, scroll-reveal sections, and reduced-motion accessibility support. The original supplied charts and interactive HTML experiences are preserved.
