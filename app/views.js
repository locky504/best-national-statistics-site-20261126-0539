// Japan Data Atlas — page renderers.
//
// One function per section. Each returns the HTML for #view, built from
// data.js and the SVG charts in charts.js. All controls on a page are real:
// the year pickers, chart-type switches, sortable tables, region filter and
// search box all change what the page shows (wired up in main.js).

const state = {
  popYear: 2024,
  econYear: 2024,
  popChart: "line",
  gdpChart: "bar",
  regionFilter: "All",
  regionQuery: "",
  regionSort: "pop",
  regionDir: -1,
  popSort: "year",
  popDir: -1,
  tradeSort: "year",
  tradeDir: -1,
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function kpi(label, value, sub) {
  return '<div class="kpi"><div class="kpi-value">' + value + '</div>' +
    '<div class="kpi-label">' + label + '</div>' +
    '<div class="kpi-sub">' + sub + '</div></div>';
}

function card(title, note, body) {
  return '<section class="card"><h2>' + title + '</h2>' +
    (note ? '<p class="card-note">' + note + '</p>' : "") + body + "</section>";
}

function sourceNote(text) {
  return '<p class="source">Source: ' + text + '</p>';
}

function yearOptions(years, selected) {
  return years.map(function (y) {
    return '<option value="' + y + '"' + (y === selected ? " selected" : "") + ">" + y + "</option>";
  }).join("");
}

function chartToggle(chart, current) {
  return '<div class="toggle" role="group" aria-label="Chart type">' +
    '<button type="button" data-action="chart-type" data-chart="' + chart + '" data-type="line"' +
    (current === "line" ? ' class="on" aria-pressed="true"' : "") + '>Line</button>' +
    '<button type="button" data-action="chart-type" data-chart="' + chart + '" data-type="bar"' +
    (current === "bar" ? ' class="on" aria-pressed="true"' : "") + '>Bars</button></div>';
}

// ---------------------------------------------------------------- overview

function viewOverview() {
  const h = JP.headline;
  const popLabels = JP.population.map(function (p) { return String(p.year); });
  const popValues = JP.population.map(function (p) { return p.value; });
  const gdpLabels = JP.gdp.map(function (g) { return String(g.year); });
  const gdpValues = JP.gdp.map(function (g) { return g.value; });

  const sections = [
    { href: "#/population", title: "Population", fig: "124.0 million", text: "A shrinking, ageing population: births at a record low, one person in three over 65." },
    { href: "#/economy", title: "Economy", fig: "$4.03 trillion GDP", text: "The world's fourth-largest economy, with prices rising again after decades of flat inflation." },
    { href: "#/work", title: "Work & income", fig: "2.5% unemployed", text: "Near-full employment, a tight jobs market and the highest minimum wage on record." },
    { href: "#/health", title: "Health", fig: "84.0 years", text: "The longest-lived large country on earth, with more hospital beds per person than anywhere in the OECD." },
    { href: "#/education", title: "Education", fig: "536 in maths", text: "Top of the PISA maths table among large economies, and two in three young adults hold a degree." },
    { href: "#/environment", title: "Environment & energy", fig: "22.9% renewable", text: "Emissions at their lowest in decades as renewables pass a fifth of all electricity." },
    { href: "#/regions", title: "Regions", fig: "47 prefectures", text: "From Hokkaido's 5.1 million to Tottori's half a million — every prefecture, sortable and searchable." },
  ];
  const cards = sections.map(function (s) {
    return '<a class="section-card" href="' + s.href + '"><span class="section-fig">' + s.fig +
      '</span><span class="section-title">' + s.title + '</span><span class="section-text">' +
      s.text + '</span><span class="section-link">Explore &rarr;</span></a>';
  }).join("");

  return '' +
    '<header class="hero"><p class="eyebrow">An independent atlas of published statistics</p>' +
    '<h1>Japan in numbers</h1>' +
    '<p class="lede">Population, economy, work, health, education, environment and all 47 ' +
    'prefectures — every figure traced to the official release that published it.</p>' +
    '<div class="kpi-grid">' +
    kpi("Population", "124.0M", "2024 · World Bank") +
    kpi("GDP", "$4.03T", "2024 · World Bank") +
    kpi("Life expectancy", "84.0 years", "2024 · World Bank") +
    kpi("Unemployment", "2.5%", "2024 · Statistics Bureau") +
    '</div></header>' +

    card("At a glance", "The basics, from the latest releases.",
      '<dl class="facts">' +
      '<div><dt>Capital</dt><dd>Tokyo</dd></div>' +
      '<div><dt>Land area</dt><dd>377,975 km²</dd></div>' +
      '<div><dt>Population density</dt><dd>340 people per km² (2024)</dd></div>' +
      '<div><dt>Median age</dt><dd>49.9 years (2024)</dd></div>' +
      '<div><dt>Urban population</dt><dd>92.3% (2025)</dd></div>' +
      '<div><dt>Currency</dt><dd>Japanese yen (JPY)</dd></div>' +
      '<div><dt>Official language</dt><dd>Japanese</dd></div>' +
      '<div><dt>Prefectures</dt><dd>47</dd></div>' +
      '</dl>' + sourceNote("World Bank World Development Indicators; Statistics Bureau of Japan.")) +

    card("Population, 1970–2024", "Total population in millions. The peak was 128.1 million in 2010; the country has shrunk every year since.",
      lineChart(popLabels, [{ name: "Population", values: popValues, color: CHART.red }], { decimals: 0, highlight: 10 }) +
      sourceNote("World Bank, World Development Indicators (SP.POP.TOTL).")) +

    card("GDP, 1980–2024", "Gross domestic product in current US dollars, trillions. The yen's fall cut the dollar figure after 2021 even as the economy grew in yen terms.",
      barChart(gdpLabels, gdpValues, { color: CHART.blue, decimals: 2 }) +
      sourceNote("World Bank, World Development Indicators (NY.GDP.MKTP.CD).")) +

    '<h2 class="section-heading">Explore the atlas</h2><div class="section-grid">' + cards + '</div>' +

    '<p class="fineprint">Figures are published statistics, rounded for display. Each page names its source and year. ' +
    'Compiled November 2026. Japan Data Atlas is an independent project and is not affiliated with the Government of Japan or any statistics agency.</p>';
}

// -------------------------------------------------------------- population

function popRowFor(year) {
  const pop = JP.population.find(function (p) { return p.year === year; });
  const vit = JP.vital.find(function (v) { return v.year === year; });
  const fer = JP.fertility.find(function (f) { return f.year === year; });
  return { pop: pop, vit: vit, fer: fer };
}

function viewPopulation() {
  const years = JP.vital.map(function (v) { return v.year; });
  const row = popRowFor(state.popYear);
  const natural = row.vit.births - row.vit.deaths;
  const popLabels = JP.population.map(function (p) { return String(p.year); });
  const popValues = JP.population.map(function (p) { return p.value; });
  const trend = state.popChart === "line"
    ? lineChart(popLabels, [{ name: "Population", values: popValues, color: CHART.red }], { decimals: 0, highlight: 10 })
    : barChart(popLabels, popValues, { color: CHART.red, decimals: 0 });
  const ferLabels = JP.fertility.map(function (f) { return String(f.year); });
  const ferValues = JP.fertility.map(function (f) { return f.value; });
  const vitLabels = JP.vital.map(function (v) { return String(v.year); });
  const births = JP.vital.map(function (v) { return v.births; });
  const deaths = JP.vital.map(function (v) { return v.deaths; });
  const top10 = JP.prefectures.slice(0, 10);

  const tableRows = JP.population.slice().sort(function (a, b) {
    return state.popDir * (a[state.popSort] - b[state.popSort]);
  }).map(function (p) {
    return "<tr><td>" + p.year + "</td><td>" + fmtNum(p.value, 1) + "</td></tr>";
  }).join("");

  return '' +
    '<header class="page-head"><h1>Population</h1>' +
    '<p class="lede">Japan peaked at 128.1 million people in 2010 and has shrunk every year since. ' +
    'Pick a year to see that year&rsquo;s births, deaths and fertility.</p></header>' +

    '<div class="control-bar"><label for="pop-year">Year</label>' +
    '<select id="pop-year" data-action="pop-year">' + yearOptions(years, state.popYear) + '</select>' +
    '<span class="control-hint">The cards below update for the year you pick.</span></div>' +

    '<div class="kpi-grid">' +
    kpi("Population", fmtNum(row.pop.value, 1) + "M", state.popYear + " · World Bank") +
    kpi("Births", fmtNum(row.vit.births, 0) + ",000", state.popYear + " · MHLW") +
    kpi("Deaths", fmtNum(row.vit.deaths, 0) + ",000", state.popYear + " · MHLW") +
    kpi("Natural change", (natural >= 0 ? "+" : "") + fmtNum(natural, 0) + ",000", "Births minus deaths") +
    kpi("Fertility rate", fmtNum(row.fer.value, 2), "Children per woman · MHLW") +
    '</div>' +

    card("Total population, 1970–2024", "Millions of people. Switch between a line and bars.",
      chartToggle("pop", state.popChart) + trend +
      sourceNote("World Bank, World Development Indicators (SP.POP.TOTL).")) +

    card("Who lives here: age structure, 2024", "Share of the population in each age band. Almost three in ten residents are 65 or older — the highest share in the world.",
      hbarChart(JP.ageStructure2024.map(function (a) {
        return { label: a.group, value: a.share, color: a.group.indexOf("65") >= 0 ? CHART.red : CHART.teal };
      }), { unit: "%", decimals: 1 }) +
      sourceNote("UN World Population Prospects 2024; Statistics Bureau of Japan.")) +

    card("Fertility rate, 1980–2024", "Children per woman. The 2024 figure of 1.15 is the lowest since records began in 1899; replacement level is 2.1.",
      lineChart(ferLabels, [{ name: "Fertility", values: ferValues, color: CHART.blue }], { decimals: 2, highlight: 7 }) +
      sourceNote("Ministry of Health, Labour and Welfare, vital statistics.")) +

    card("Births and deaths, 1980–2024", "Thousands per year. Deaths passed births in 2007 and the gap has widened every year since.",
      lineChart(vitLabels, [
        { name: "Births", values: births, color: CHART.teal },
        { name: "Deaths", values: deaths, color: CHART.red },
      ], { decimals: 0 }) +
      '<p class="legend-line"><span class="swatch" style="background:' + CHART.teal + '"></span>Births &nbsp; ' +
      '<span class="swatch" style="background:' + CHART.red + '"></span>Deaths</p>' +
      sourceNote("Ministry of Health, Labour and Welfare, vital statistics.")) +

    card("Population by year", "Click a column heading to sort.",
      '<table class="data-table"><thead><tr>' +
      '<th><button type="button" data-action="sort-pop" data-key="year">Year' + sortArrow("year", state.popSort, state.popDir) + '</button></th>' +
      '<th><button type="button" data-action="sort-pop" data-key="value">Population (millions)' + sortArrow("value", state.popSort, state.popDir) + '</button></th>' +
      '</tr></thead><tbody>' + tableRows + '</tbody></table>' +
      sourceNote("World Bank, World Development Indicators (SP.POP.TOTL).")) +

    card("Largest prefectures", "The ten biggest prefectures hold more than half the country. See all 47 on the <a href=\"#/regions\">Regions</a> page.",
      '<table class="data-table"><thead><tr><th>#</th><th>Prefecture</th><th>Population (millions)</th></tr></thead><tbody>' +
      top10.map(function (p, i) {
        return "<tr><td>" + (i + 1) + "</td><td>" + esc(p.name) + "</td><td>" + fmtNum(p.pop, 1) + "</td></tr>";
      }).join("") + '</tbody></table>' +
      sourceNote("Statistics Bureau of Japan, population estimates, 2024."));
}

function sortArrow(key, curKey, dir) {
  if (key !== curKey) return "";
  return dir === 1 ? " ▲" : " ▼";
}

// ---------------------------------------------------------------- economy

function viewEconomy() {
  const years = JP.economyYears.map(function (e) { return e.year; });
  const row = JP.economyYears.find(function (e) { return e.year === state.econYear; });
  const gdpLabels = JP.gdp.map(function (g) { return String(g.year); });
  const gdpValues = JP.gdp.map(function (g) { return g.value; });
  const gdpChart = state.gdpChart === "bar"
    ? barChart(gdpLabels, gdpValues, { color: CHART.blue, decimals: 2 })
    : lineChart(gdpLabels, [{ name: "GDP", values: gdpValues, color: CHART.blue }], { decimals: 2, highlight: 9 });
  const gyLabels = JP.economyYears.map(function (e) { return String(e.year); });
  const growth = JP.economyYears.map(function (e) { return e.growth; });
  const cpi = JP.economyYears.map(function (e) { return e.cpi; });
  const tradeRows = JP.trade.slice().sort(function (a, b) {
    return state.tradeDir * (a[state.tradeSort] - b[state.tradeSort]);
  }).map(function (t) {
    return "<tr><td>" + t.year + "</td><td>¥" + fmtNum(t.exports, 1) + "T</td><td>¥" + fmtNum(t.imports, 1) + "T</td>" +
      "<td>¥" + fmtNum(t.exports - t.imports, 1) + "T</td></tr>";
  }).join("");

  return '' +
    '<header class="page-head"><h1>Economy</h1>' +
    '<p class="lede">The world&rsquo;s fourth-largest economy. Pick a year to see that year&rsquo;s growth, prices and jobs picture.</p></header>' +

    '<div class="control-bar"><label for="econ-year">Year</label>' +
    '<select id="econ-year" data-action="econ-year">' + yearOptions(years, state.econYear) + '</select>' +
    '<span class="control-hint">The cards below update for the year you pick.</span></div>' +

    '<div class="kpi-grid">' +
    kpi("GDP", "$" + fmtNum(row.gdpT, 2) + "T", state.econYear + " · World Bank") +
    kpi("GDP per person", "$" + fmtNum(row.gdpPc, 0), state.econYear + " · World Bank") +
    kpi("Real GDP growth", (row.growth >= 0 ? "+" : "") + fmtNum(row.growth, 1) + "%", state.econYear + " · World Bank") +
    kpi("Consumer inflation", fmtNum(row.cpi, 1) + "%", state.econYear + " · Statistics Bureau") +
    kpi("Unemployment", fmtNum(row.unemp, 1) + "%", state.econYear + " · Statistics Bureau") +
    '</div>' +

    card("GDP, 1980–2024", "Trillions of current US dollars. Switch between bars and a line.",
      chartToggle("gdp", state.gdpChart) + gdpChart +
      sourceNote("World Bank, World Development Indicators (NY.GDP.MKTP.CD).")) +

    card("Growth and inflation, 2020–2024", "Real GDP growth and consumer-price inflation, percent per year. Prices rose 2.7% in 2024 after 3.3% in 2023 — high by Japan's recent standards.",
      lineChart(gyLabels, [
        { name: "Real GDP growth", values: growth, color: CHART.teal },
        { name: "CPI inflation", values: cpi, color: CHART.amber },
      ], { decimals: 1 }) +
      '<p class="legend-line"><span class="swatch" style="background:' + CHART.teal + '"></span>Real GDP growth &nbsp; ' +
      '<span class="swatch" style="background:' + CHART.amber + '"></span>Consumer-price inflation</p>' +
      sourceNote("World Bank; Statistics Bureau of Japan, Consumer Price Index.")) +

    card("Where the economy earns its money", "Share of gross value added and of jobs by sector, 2024. Services dominate both; manufacturing still employs nearly a quarter of workers.",
      '<div class="split">' +
      '<div>' + donutChart(JP.sectors.map(function (s, i) {
        return { label: s.sector, value: s.gva, color: [CHART.blue, CHART.red, CHART.teal][i] };
      }), { unit: "%", centerLabel: "of value added" }) + '</div>' +
      '<div>' + hbarChart(JP.sectors.map(function (s, i) {
        return { label: s.sector, value: s.jobs, color: [CHART.blue, CHART.red, CHART.teal][i] };
      }), { unit: "%", labelWidth: 230 }) + '<p class="card-note">Share of all jobs, %.</p></div>' +
      '</div>' + sourceNote("UN Statistics Division; ILOSTAT, 2024.")) +

    card("Trade, 2020–2024", "Exports and imports of goods, trillion yen. Exports hit a record ¥107.9 trillion in 2024. Click a heading to sort.",
      '<table class="data-table"><thead><tr>' +
      '<th><button type="button" data-action="sort-trade" data-key="year">Year' + sortArrow("year", state.tradeSort, state.tradeDir) + '</button></th>' +
      '<th><button type="button" data-action="sort-trade" data-key="exports">Exports' + sortArrow("exports", state.tradeSort, state.tradeDir) + '</button></th>' +
      '<th><button type="button" data-action="sort-trade" data-key="imports">Imports' + sortArrow("imports", state.tradeSort, state.tradeDir) + '</button></th>' +
      '<th>Balance</th></tr></thead><tbody>' + tradeRows + '</tbody></table>' +
      sourceNote("Ministry of Finance, trade statistics.")) +

    card("Public debt", "General government gross debt stood at 236.7% of GDP in 2024 — the highest ratio of any large economy — yet almost all of it is held at home, and borrowing costs remain low.",
      '<p class="big-number">236.7% <span>of GDP</span></p>' +
      sourceNote("IMF World Economic Outlook, 2024."));
}

// ------------------------------------------------------------------- work

function viewWork() {
  const w = JP.work;
  const unempLabels = JP.economyYears.map(function (e) { return String(e.year); });
  const unempValues = JP.economyYears.map(function (e) { return e.unemp; });
  const wageRows = JP.minWage.map(function (m) {
    return "<tr><td>" + esc(m.prefecture) + "</td><td>¥" + fmtNum(m.wage, 0) + "</td></tr>";
  }).join("");

  return '' +
    '<header class="page-head"><h1>Work &amp; income</h1>' +
    '<p class="lede">Near-full employment: 67.5 million people at work in 2024, with 1.25 job openings for every applicant.</p></header>' +

    '<div class="kpi-grid">' +
    kpi("Labour force", "69.2M", "2024 · Statistics Bureau") +
    kpi("Employed", "67.5M", "2024 · Statistics Bureau") +
    kpi("Unemployment", "2.5%", "2024 · Statistics Bureau") +
    kpi("Youth unemployment", "3.9%", "Ages 15–24 · 2024") +
    kpi("Job openings ratio", "1.25", "Openings per applicant · 2024") +
    kpi("Minimum wage", "¥1,055/hr", "National average · Oct 2024") +
    '</div>' +

    card("Unemployment, 2020–2024", "Percent of the labour force. Japan's rate stayed between 2.5% and 2.8% through the pandemic and after — among the lowest in the OECD.",
      lineChart(unempLabels, [{ name: "Unemployment", values: unempValues, color: CHART.teal }], { decimals: 1, highlight: 4 }) +
      sourceNote("Statistics Bureau of Japan, Labour Force Survey.")) +

    card("Jobs by sector, 2024", "Share of all employment. Services employ almost three workers in four.",
      hbarChart(JP.sectors.map(function (s, i) {
        return { label: s.sector, value: s.jobs, color: [CHART.blue, CHART.red, CHART.teal][i] };
      }), { unit: "%", labelWidth: 230 }) +
      sourceNote("ILOSTAT, 2024.")) +

    card("Pay and hours", "What work pays and how long it takes.",
      '<dl class="facts">' +
      '<div><dt>Average monthly pay</dt><dd>about ¥340,000 (2024, MHLW)</dd></div>' +
      '<div><dt>Average hours worked</dt><dd>1,611 a year (2023, OECD)</dd></div>' +
      '<div><dt>Highest minimum wage</dt><dd>¥1,163 an hour — Tokyo (Oct 2024)</dd></div>' +
      '<div><dt>Lowest minimum wage</dt><dd>¥952 an hour — Okinawa (Oct 2024)</dd></div>' +
      '<div><dt>National minimum wage</dt><dd>¥1,055 an hour, weighted average (Oct 2024)</dd></div>' +
      '</dl>' + sourceNote("Ministry of Health, Labour and Welfare; OECD.")) +

    card("Minimum wage by prefecture", "Yen per hour, October 2024. The national weighted average is ¥1,055; Tokyo pays ¥211 more an hour than Okinawa.",
      '<table class="data-table"><thead><tr><th>Prefecture</th><th>Minimum wage</th></tr></thead><tbody>' + wageRows + '</tbody></table>' +
      sourceNote("Ministry of Health, Labour and Welfare, 2024."));
}

// ----------------------------------------------------------------- health

function viewHealth() {
  const h = JP.health;
  const leLabels = JP.lifeExpectancy.map(function (l) { return String(l.year); });
  const leValues = JP.lifeExpectancy.map(function (l) { return l.value; });

  return '' +
    '<header class="page-head"><h1>Health</h1>' +
    '<p class="lede">The longest-lived large country on earth: 84.0 years at birth in 2024 — 87.1 for women, 81.1 for men.</p></header>' +

    '<div class="kpi-grid">' +
    kpi("Life expectancy", "84.0 years", "2024 · World Bank") +
    kpi("Women", "87.1 years", "2023 · MHLW") +
    kpi("Men", "81.1 years", "2023 · MHLW") +
    kpi("Infant mortality", "1.8", "Per 1,000 live births · 2023") +
    kpi("Hospital beds", "12.6", "Per 1,000 people · 2022") +
    kpi("Doctors", "2.6", "Per 1,000 people · 2022") +
    '</div>' +

    card("Life expectancy, 1980–2024", "Years at birth. Japan gained almost eight years of life expectancy in four decades.",
      lineChart(leLabels, [{ name: "Life expectancy", values: leValues, color: CHART.teal }], { decimals: 1, highlight: 6 }) +
      sourceNote("World Bank, World Development Indicators (SP.DYN.LE00.IN).")) +

    card("Health system vs the OECD average", "Japan spends about 11% of GDP on health — above the OECD average — and has three times the OECD average number of hospital beds, but fewer doctors per person.",
      '<table class="data-table"><thead><tr><th>Indicator</th><th>Japan</th><th>OECD average</th><th>Year</th></tr></thead><tbody>' +
      '<tr><td>Health spending (% of GDP)</td><td>11.0%</td><td>9.2%</td><td>2022</td></tr>' +
      '<tr><td>Hospital beds per 1,000 people</td><td>12.6</td><td>4.3</td><td>2022</td></tr>' +
      '<tr><td>Doctors per 1,000 people</td><td>2.6</td><td>3.7</td><td>2022</td></tr>' +
      '<tr><td>Life expectancy (years)</td><td>84.0</td><td>79.6</td><td>2024</td></tr>' +
      '</tbody></table>' + sourceNote("OECD Health Statistics 2025; World Bank.")) +

    card("Smoking", "15.7% of adults smoked in 2023 — down from more than a third in the 1990s, though still higher among men than women.",
      '<p class="big-number">15.7% <span>of adults smoke</span></p>' +
      sourceNote("Ministry of Health, Labour and Welfare, National Health and Nutrition Survey, 2023."));
}

// -------------------------------------------------------------- education

function viewEducation() {
  const e = JP.education;
  const pisaRows = JP.pisa.map(function (p) {
    return { label: p.subject, value: p.japan, color: CHART.blue };
  });
  const pisaOecd = JP.pisa.map(function (p) {
    return { label: p.subject + " (OECD avg)", value: p.oecd, color: CHART.muted };
  });
  const studentRows = JP.students.map(function (s) {
    return "<tr><td>" + esc(s.level) + "</td><td>" + fmtNum(s.pupils, 1) + "</td></tr>";
  }).join("");

  return '' +
    '<header class="page-head"><h1>Education</h1>' +
    '<p class="lede">Japan&rsquo;s 15-year-olds scored first among large economies in PISA 2022 maths — 64 points above the OECD average.</p></header>' +

    '<div class="kpi-grid">' +
    kpi("PISA maths", "536", "2022 · OECD") +
    kpi("PISA reading", "516", "2022 · OECD") +
    kpi("PISA science", "547", "2022 · OECD") +
    kpi("University degrees", "65.8%", "Ages 25–34 · 2023") +
    kpi("Going to university", "59.1%", "Of high-school leavers · 2024") +
    kpi("Public spending", "3.2% of GDP", "On education · 2021") +
    '</div>' +

    card("PISA 2022 scores", "Mean score for 15-year-olds. The OECD average is shown in grey for comparison.",
      hbarChart(pisaRows.concat(pisaOecd), { decimals: 0, labelWidth: 170 }) +
      sourceNote("OECD, PISA 2022.")) +

    card("Students by level, 2024", "Millions of pupils and students. Elementary enrolment is falling with the birth rate; university enrolment keeps rising.",
      '<table class="data-table"><thead><tr><th>Level</th><th>Students (millions)</th></tr></thead><tbody>' + studentRows + '</tbody></table>' +
      sourceNote("Ministry of Education (MEXT), School Basic Survey, 2024.")) +

    card("Higher education", "65.8% of 25- to 34-year-olds held a tertiary qualification in 2023 — one of the highest rates in the OECD — and 59.1% of high-school leavers went on to university in 2024.",
      '<p class="big-number">65.8% <span>of young adults hold a degree</span></p>' +
      sourceNote("OECD, Education at a Glance 2024; MEXT, 2024."));
}

// ------------------------------------------------------------- environment

function viewEnvironment() {
  const env = JP.environment;
  const emLabels = JP.emissions.map(function (x) { return "FY" + x.year; });
  const emValues = JP.emissions.map(function (x) { return x.value; });
  const renLabels = JP.renewables.map(function (x) { return "FY" + x.year; });
  const renValues = JP.renewables.map(function (x) { return x.value; });

  return '' +
    '<header class="page-head"><h1>Environment &amp; energy</h1>' +
    '<p class="lede">Greenhouse gas emissions fell to 1.03 billion tonnes in fiscal 2023 — the lowest since records began — while renewables passed a fifth of all electricity.</p></header>' +

    '<div class="kpi-grid">' +
    kpi("GHG emissions", "1.03 Gt", "CO₂ equivalent · FY2023") +
    kpi("Renewables", "22.9%", "Of electricity · FY2023") +
    kpi("Nuclear", "8.5%", "Of electricity · FY2023") +
    kpi("Energy self-sufficiency", "13.3%", "FY2023") +
    kpi("Forest cover", "67%", "Of the land area") +
    '</div>' +

    card("Greenhouse gas emissions, FY2013–FY2023", "Million tonnes of CO₂ equivalent. Emissions are down 27% from the FY2013 peak; the government targets net zero by 2050.",
      lineChart(emLabels, [{ name: "Emissions", values: emValues, color: CHART.green }], { decimals: 0, highlight: 5 }) +
      sourceNote("Ministry of the Environment, Greenhouse Gas Inventory (GIO).")) +

    card("Electricity mix, FY2023", "Share of generation. LNG and coal still supply six in ten kilowatt-hours; nuclear is back to 8.5% after the post-Fukushima shutdowns.",
      donutChart(JP.energyMix2023.map(function (m, i) {
        return { label: m.source, value: m.share, color: [CHART.amber, CHART.ink, CHART.green, CHART.blue, CHART.muted][i] };
      }), { unit: "%", centerLabel: "of generation" }) +
      sourceNote("Agency for Natural Resources and Energy (ANRE), FY2023.")) +

    card("Renewables share of electricity", "Percent of generation, fiscal years. Solar drives the rise: capacity has grown every year since the feed-in tariff began in 2012.",
      lineChart(renLabels, [{ name: "Renewables", values: renValues, color: CHART.green }], { decimals: 1, highlight: 4 }) +
      sourceNote("Agency for Natural Resources and Energy (ANRE).")) +

    card("Forests", "About two-thirds of Japan is forest — one of the highest shares of any large country — and forest area has been stable for decades.",
      '<p class="big-number">67% <span>of the land is forest</span></p>' +
      sourceNote("Forestry Agency, 2023."));
}

// ----------------------------------------------------------------- regions

function regionSummary() {
  const out = {};
  REGIONS.forEach(function (r) { out[r] = { pop: 0, count: 0 }; });
  JP.prefectures.forEach(function (p) {
    out[p.region].pop += p.pop;
    out[p.region].count += 1;
  });
  return out;
}

function viewRegions() {
  const total = JP.prefectures.reduce(function (s, p) { return s + p.pop; }, 0);
  const summary = regionSummary();
  const q = state.regionQuery.trim().toLowerCase();

  let rows = JP.prefectures.filter(function (p) {
    if (state.regionFilter !== "All" && p.region !== state.regionFilter) return false;
    if (q && p.name.toLowerCase().indexOf(q) < 0 && p.capital.toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
  rows = rows.slice().sort(function (a, b) {
    const k = state.regionSort;
    if (k === "name" || k === "region" || k === "capital") {
      return state.regionDir * (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0);
    }
    return state.regionDir * (a[k] - b[k]);
  });

  const bodyRows = rows.map(function (p, i) {
    return "<tr><td>" + (i + 1) + "</td><td>" + esc(p.name) + "</td><td>" + esc(p.region) + "</td><td>" +
      esc(p.capital) + "</td><td>" + fmtNum(p.pop, 1) + "</td><td>" + fmtNum((p.pop / total) * 100, 1) + "%</td></tr>";
  }).join("");

  const regionCards = REGIONS.map(function (r) {
    const s = summary[r];
    const on = state.regionFilter === r;
    return '<button type="button" class="region-card' + (on ? " on" : "") + '" data-action="region-filter" data-region="' + esc(r) + '">' +
      '<span class="region-name">' + esc(r) + '</span>' +
      '<span class="region-pop">' + fmtNum(s.pop, 1) + 'M people</span>' +
      '<span class="region-count">' + s.count + ' prefectures</span></button>';
  }).join("");

  return '' +
    '<header class="page-head"><h1>Regions</h1>' +
    '<p class="lede">All 47 prefectures. Tap a region card to filter, type to search, or click a column heading to sort.</p></header>' +

    '<div class="region-grid">' + regionCards + '</div>' +

    '<div class="control-bar"><label for="region-search">Search</label>' +
    '<input id="region-search" type="search" placeholder="Prefecture or capital city…" value="' + esc(state.regionQuery) + '" data-action="region-search" />' +
    '<button type="button" class="clear-btn" data-action="region-clear"' + (state.regionFilter === "All" && !state.regionQuery ? " disabled" : "") + '>Show all 47</button>' +
    '<span class="control-hint" id="region-count">' + rows.length + ' of 47 prefectures shown</span></div>' +

    '<section class="card"><h2>Prefectures, 2024</h2>' +
    '<p class="card-note">Population in millions; share is of the national total of about 124.0 million.</p>' +
    '<div class="table-scroll"><table class="data-table"><thead><tr>' +
    '<th>#</th>' +
    '<th><button type="button" data-action="sort-region" data-key="name">Prefecture' + sortArrow("name", state.regionSort, state.regionDir) + '</button></th>' +
    '<th><button type="button" data-action="sort-region" data-key="region">Region' + sortArrow("region", state.regionSort, state.regionDir) + '</button></th>' +
    '<th><button type="button" data-action="sort-region" data-key="capital">Capital' + sortArrow("capital", state.regionSort, state.regionDir) + '</button></th>' +
    '<th><button type="button" data-action="sort-region" data-key="pop">Population (M)' + sortArrow("pop", state.regionSort, state.regionDir) + '</button></th>' +
    '<th>Share of Japan</th></tr></thead><tbody>' +
    (bodyRows || '<tr><td colspan="6">No prefecture matches that search.</td></tr>') +
    '</tbody></table></div>' +
    sourceNote("Statistics Bureau of Japan, population estimates, 2024 (rounded to 0.1 million).") +
    '</section>';
}

// ------------------------------------------------------------------- router

const VIEWS = {
  "/": viewOverview,
  "/population": viewPopulation,
  "/economy": viewEconomy,
  "/work": viewWork,
  "/health": viewHealth,
  "/education": viewEducation,
  "/environment": viewEnvironment,
  "/regions": viewRegions,
};

const NAV = [
  ["/", "Overview"], ["/population", "Population"], ["/economy", "Economy"],
  ["/work", "Work & income"], ["/health", "Health"], ["/education", "Education"],
  ["/environment", "Environment"], ["/regions", "Regions"],
];
