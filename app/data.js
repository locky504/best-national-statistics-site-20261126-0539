// Japan Data Atlas — the numbers behind the site.
//
// Every figure here is a published statistic, each with its source and year
// written next to it on the page. Sources: World Bank World Development
// Indicators (WDI), Statistics Bureau of Japan, Ministry of Health, Labour
// and Welfare (MHLW), Ministry of Finance (MOF), Agency for Natural
// Resources and Energy (ANRE), Ministry of Education (MEXT), OECD, IMF and
// the Ministry of the Environment. Values are rounded for display; the
// page footers name the exact source of each figure.

const JP = {
  name: "Japan",
  capital: "Tokyo",
  areaKm2: 377975,
  currency: "Japanese yen (JPY)",
  language: "Japanese",
  prefectures: 47,
  updated: "November 2026",

  // Headline facts, each the latest published value.
  headline: {
    population2024: 123975371,
    gdp2024UsdT: 4.03,
    gdpPerCapita2024: 32487,
    lifeExpectancy2024: 84.0,
    unemployment2024: 2.5,
    inflation2024: 2.7,
    fertility2024: 1.15,
    medianAge2024: 49.9,
    density2024: 340,
    urbanShare2025: 92.3,
  },

  // Population, total (World Bank WDI SP.POP.TOTL), millions.
  population: [
    { year: 1970, value: 103.7 }, { year: 1980, value: 117.1 },
    { year: 1990, value: 123.6 }, { year: 2000, value: 126.9 },
    { year: 2010, value: 128.1 }, { year: 2015, value: 127.1 },
    { year: 2020, value: 126.1 }, { year: 2021, value: 125.5 },
    { year: 2022, value: 125.1 }, { year: 2023, value: 124.5 },
    { year: 2024, value: 124.0 },
  ],

  // Age structure, 2024 (UN World Population Prospects / Statistics Bureau).
  ageStructure2024: [
    { group: "Ages 0–14", share: 11.4 },
    { group: "Ages 15–64", share: 59.3 },
    { group: "Ages 65 and over", share: 29.3 },
  ],

  // Total fertility rate, children per woman (MHLW vital statistics).
  fertility: [
    { year: 1980, value: 1.75 }, { year: 1990, value: 1.54 },
    { year: 2000, value: 1.36 }, { year: 2010, value: 1.39 },
    { year: 2015, value: 1.45 }, { year: 2020, value: 1.33 },
    { year: 2023, value: 1.20 }, { year: 2024, value: 1.15 },
  ],

  // Births and deaths, thousands (MHLW vital statistics).
  vital: [
    { year: 1980, births: 1577, deaths: 723 },
    { year: 1990, births: 1222, deaths: 820 },
    { year: 2000, births: 1191, deaths: 962 },
    { year: 2010, births: 1071, deaths: 1197 },
    { year: 2015, births: 1006, deaths: 1290 },
    { year: 2020, births: 841, deaths: 1373 },
    { year: 2023, births: 727, deaths: 1591 },
    { year: 2024, births: 686, deaths: 1619 },
  ],

  // GDP, current US$ trillion (World Bank WDI NY.GDP.MKTP.CD).
  gdp: [
    { year: 1980, value: 1.11 }, { year: 1990, value: 3.13 },
    { year: 2000, value: 4.97 }, { year: 2010, value: 5.76 },
    { year: 2015, value: 4.44 }, { year: 2020, value: 5.06 },
    { year: 2021, value: 5.03 }, { year: 2022, value: 4.26 },
    { year: 2023, value: 4.21 }, { year: 2024, value: 4.03 },
  ],

  // Yearly economy indicators (World Bank / Statistics Bureau).
  economyYears: [
    { year: 2020, gdpT: 5.06, gdpPc: 40048, growth: -4.2, cpi: 0.0, unemp: 2.8 },
    { year: 2021, gdpT: 5.03, gdpPc: 40069, growth: 2.7, cpi: -0.2, unemp: 2.8 },
    { year: 2022, gdpT: 4.26, gdpPc: 34044, growth: 1.0, cpi: 2.5, unemp: 2.6 },
    { year: 2023, gdpT: 4.21, gdpPc: 33815, growth: 1.7, cpi: 3.3, unemp: 2.6 },
    { year: 2024, gdpT: 4.03, gdpPc: 32487, growth: 0.1, cpi: 2.7, unemp: 2.5 },
  ],

  // Trade, trillion yen (Ministry of Finance trade statistics).
  trade: [
    { year: 2020, exports: 68.4, imports: 68.0 },
    { year: 2021, exports: 83.1, imports: 84.8 },
    { year: 2022, exports: 98.2, imports: 118.2 },
    { year: 2023, exports: 100.9, imports: 110.2 },
    { year: 2024, exports: 107.9, imports: 112.4 },
  ],

  // Gross value added and employment by sector, % (UNSD / ILOSTAT, 2024).
  sectors: [
    { sector: "Agriculture, forestry & fisheries", gva: 1.0, jobs: 2.9 },
    { sector: "Industry (incl. manufacturing)", gva: 28.7, jobs: 23.3 },
    { sector: "Services", gva: 70.3, jobs: 73.8 },
  ],

  // Work (Statistics Bureau labour force survey; MHLW; OECD).
  work: {
    labourForceM: 69.2,
    employedM: 67.5,
    unemployment2024: 2.5,
    youthUnemployment2024: 3.9,
    jobOpeningsRatio2024: 1.25,
    minWageNationalYen: 1055,
    minWageTokyoYen: 1163,
    avgMonthlyPayYen: 340000,
    annualHours2023: 1611,
    debtPctGdp2024: 236.7,
  },

  // Minimum wage, yen per hour, October 2024 (MHLW).
  minWage: [
    { prefecture: "Tokyo", wage: 1163 },
    { prefecture: "Kanagawa", wage: 1162 },
    { prefecture: "Osaka", wage: 1114 },
    { prefecture: "Aichi", wage: 1077 },
    { prefecture: "Fukuoka", wage: 1039 },
    { prefecture: "Hokkaido", wage: 1010 },
    { prefecture: "Okinawa", wage: 952 },
  ],

  // Life expectancy at birth, years (World Bank WDI SP.DYN.LE00.IN).
  lifeExpectancy: [
    { year: 1980, value: 76.1 }, { year: 1990, value: 79.0 },
    { year: 2000, value: 81.1 }, { year: 2010, value: 82.9 },
    { year: 2015, value: 83.9 }, { year: 2020, value: 84.0 },
    { year: 2024, value: 84.0 },
  ],

  health: {
    men2023: 81.1,
    women2023: 87.1,
    infantMortality2023: 1.8,
    bedsPer1000_2022: 12.6,
    doctorsPer1000_2022: 2.6,
    spendingPctGdp2022: 11.0,
    smokingPct2023: 15.7,
    oecdBedsPer1000: 4.3,
    oecdDoctorsPer1000: 3.7,
    oecdSpendingPctGdp: 9.2,
  },

  // PISA 2022 mean scores, Japan vs OECD average (OECD).
  pisa: [
    { subject: "Mathematics", japan: 536, oecd: 472 },
    { subject: "Reading", japan: 516, oecd: 476 },
    { subject: "Science", japan: 547, oecd: 485 },
  ],

  education: {
    tertiary25to34Pct2023: 65.8,
    universityAdvancementPct2024: 59.1,
    publicSpendingPctGdp2021: 3.2,
  },

  // Pupils and students, millions, 2024 (MEXT School Basic Survey).
  students: [
    { level: "Elementary school", pupils: 6.0 },
    { level: "Junior high school", pupils: 3.1 },
    { level: "High school", pupils: 3.0 },
    { level: "University", pupils: 2.9 },
  ],

  // Greenhouse gas emissions, million tonnes CO2 equivalent (Ministry of the
  // Environment, fiscal years).
  emissions: [
    { year: 2013, value: 1408 }, { year: 2015, value: 1322 },
    { year: 2020, value: 1149 }, { year: 2021, value: 1173 },
    { year: 2022, value: 1105 }, { year: 2023, value: 1030 },
  ],

  // Electricity generation mix, % of total, FY2023 (ANRE).
  energyMix2023: [
    { source: "LNG", share: 33.8 },
    { source: "Coal", share: 28.5 },
    { source: "Renewables", share: 22.9 },
    { source: "Nuclear", share: 8.5 },
    { source: "Oil", share: 6.3 },
  ],

  // Renewables share of electricity, % (ANRE, fiscal years).
  renewables: [
    { year: 2015, value: 14.5 }, { year: 2020, value: 19.8 },
    { year: 2021, value: 20.3 }, { year: 2022, value: 21.7 },
    { year: 2023, value: 22.9 },
  ],

  environment: {
    co2eFY2023Mt: 1030,
    selfSufficiencyFY2023Pct: 13.3,
    forestCoverPct: 67,
  },

  // Prefectures: 2024 population estimates, millions (Statistics Bureau).
  // Capitals are the prefectural capitals; regions are the eight standard
  // regions of Japan.
  prefectures: [
    { name: "Tokyo", region: "Kanto", capital: "Tokyo", pop: 14.1 },
    { name: "Kanagawa", region: "Kanto", capital: "Yokohama", pop: 9.2 },
    { name: "Osaka", region: "Kansai", capital: "Osaka", pop: 8.8 },
    { name: "Aichi", region: "Chubu", capital: "Nagoya", pop: 7.5 },
    { name: "Saitama", region: "Kanto", capital: "Saitama", pop: 7.3 },
    { name: "Chiba", region: "Kanto", capital: "Chiba", pop: 6.2 },
    { name: "Hyogo", region: "Kansai", capital: "Kobe", pop: 5.4 },
    { name: "Hokkaido", region: "Hokkaido", capital: "Sapporo", pop: 5.1 },
    { name: "Fukuoka", region: "Kyushu & Okinawa", capital: "Fukuoka", pop: 5.1 },
    { name: "Shizuoka", region: "Chubu", capital: "Shizuoka", pop: 3.5 },
    { name: "Ibaraki", region: "Kanto", capital: "Mito", pop: 2.8 },
    { name: "Hiroshima", region: "Chugoku", capital: "Hiroshima", pop: 2.7 },
    { name: "Kyoto", region: "Kansai", capital: "Kyoto", pop: 2.5 },
    { name: "Miyagi", region: "Tohoku", capital: "Sendai", pop: 2.3 },
    { name: "Niigata", region: "Chubu", capital: "Niigata", pop: 2.1 },
    { name: "Nagano", region: "Chubu", capital: "Nagano", pop: 2.0 },
    { name: "Gifu", region: "Chubu", capital: "Gifu", pop: 1.9 },
    { name: "Gunma", region: "Kanto", capital: "Maebashi", pop: 1.9 },
    { name: "Tochigi", region: "Kanto", capital: "Utsunomiya", pop: 1.9 },
    { name: "Okayama", region: "Chugoku", capital: "Okayama", pop: 1.9 },
    { name: "Fukushima", region: "Tohoku", capital: "Fukushima", pop: 1.7 },
    { name: "Mie", region: "Kansai", capital: "Tsu", pop: 1.7 },
    { name: "Kumamoto", region: "Kyushu & Okinawa", capital: "Kumamoto", pop: 1.7 },
    { name: "Kagoshima", region: "Kyushu & Okinawa", capital: "Kagoshima", pop: 1.6 },
    { name: "Okinawa", region: "Kyushu & Okinawa", capital: "Naha", pop: 1.5 },
    { name: "Shiga", region: "Kansai", capital: "Otsu", pop: 1.4 },
    { name: "Yamaguchi", region: "Chugoku", capital: "Yamaguchi", pop: 1.3 },
    { name: "Nagasaki", region: "Kyushu & Okinawa", capital: "Nagasaki", pop: 1.3 },
    { name: "Ehime", region: "Shikoku", capital: "Matsuyama", pop: 1.3 },
    { name: "Nara", region: "Kansai", capital: "Nara", pop: 1.3 },
    { name: "Aomori", region: "Tohoku", capital: "Aomori", pop: 1.2 },
    { name: "Iwate", region: "Tohoku", capital: "Morioka", pop: 1.2 },
    { name: "Ishikawa", region: "Chubu", capital: "Kanazawa", pop: 1.1 },
    { name: "Miyazaki", region: "Kyushu & Okinawa", capital: "Miyazaki", pop: 1.1 },
    { name: "Oita", region: "Kyushu & Okinawa", capital: "Oita", pop: 1.1 },
    { name: "Yamagata", region: "Tohoku", capital: "Yamagata", pop: 1.0 },
    { name: "Toyama", region: "Chubu", capital: "Toyama", pop: 1.0 },
    { name: "Wakayama", region: "Kansai", capital: "Wakayama", pop: 0.9 },
    { name: "Kagawa", region: "Shikoku", capital: "Takamatsu", pop: 0.9 },
    { name: "Akita", region: "Tohoku", capital: "Akita", pop: 0.9 },
    { name: "Yamanashi", region: "Chubu", capital: "Kofu", pop: 0.8 },
    { name: "Saga", region: "Kyushu & Okinawa", capital: "Saga", pop: 0.8 },
    { name: "Fukui", region: "Chubu", capital: "Fukui", pop: 0.7 },
    { name: "Tokushima", region: "Shikoku", capital: "Tokushima", pop: 0.7 },
    { name: "Kochi", region: "Shikoku", capital: "Kochi", pop: 0.7 },
    { name: "Shimane", region: "Chugoku", capital: "Matsue", pop: 0.6 },
    { name: "Tottori", region: "Chugoku", capital: "Tottori", pop: 0.5 },
  ],
};

const REGIONS = [
  "Hokkaido", "Tohoku", "Kanto", "Chubu",
  "Kansai", "Chugoku", "Shikoku", "Kyushu & Okinawa",
];
