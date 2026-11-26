# Japan Data Atlas

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/locky504/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/locky504/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An independent atlas of Japan's published statistics — population, economy, work & income, health, education, environment and all 47 prefectures. Every figure is a real published number with its source and year next to it: population 124.0 million (World Bank, 2024), GDP $4.03 trillion (World Bank, 2024), life expectancy 84.0 years, unemployment 2.5%, fertility 1.15 children per woman.

The site is plain static files under `app/` with no build step and zero network requests: hand-drawn inline SVG charts, a year picker that updates the cards, bar/line chart switches, sortable tables, a live prefecture search and region filters. It works on desktop and on a phone.

## Run it

Serve `app/` with any static server, or run the hand-in program (Node 22, standard library only):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library.

## Sources

World Bank World Development Indicators · Statistics Bureau of Japan · Ministry of Health, Labour and Welfare · Ministry of Finance · Agency for Natural Resources and Energy · Ministry of Education (MEXT) · OECD · IMF · Ministry of the Environment. Compiled November 2026. This is an independent project, not affiliated with the Government of Japan or any statistics agency.

---

Entered on [make.fun](https://make.fun/?ref=dvanqqs1&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards
