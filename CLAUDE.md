# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # type-check then build to dist/
npm run preview   # serve the dist/ build locally
npm run deploy    # build and publish to GitHub Pages via gh-pages
```

There are no tests or linter configured.

## Architecture

Single-page React + TypeScript app built with Vite. The entire app is one component: `src/SoundChart.tsx`.

**Sound playback:** Audio files live in `public/sounds/` with the naming convention `sound_NN_<letter>.mp3`. At module load time, `SoundChart.tsx` derives a `soundMap` (`letter → URL`) from the hardcoded `soundFileNames` array by regex-extracting the letter suffix. `getAudioUrl` strips IPA slashes from a symbol (e.g. `/p/` → `p`) and looks it up in that map. Playback uses a `useRef`-held `Audio` instance; the previous sound is paused before a new one plays.

**IPA data:** Consonant and vowel grids are plain 2D string arrays at the top of `SoundChart.tsx`. Only the 16 consonants currently have audio files; vowels render without the playable style/click handler.

**Deployment:** Vite `base` is set to `/english-chart/` (matching the GitHub Pages repo path). The `deploy` script builds then pushes `dist/` to the `gh-pages` branch with a fixed commit message.

**Adding new sounds:** Add the `.mp3` to `public/sounds/` with the `sound_NN_<letter>.mp3` convention, then add the filename to the `soundFileNames` array in `SoundChart.tsx`. No other wiring needed.
