// Japan Data Atlas — small hand-rolled SVG charts.
//
// No libraries, no network: every chart is a string of inline SVG built from
// the numbers in data.js. Each builder takes plain data and returns SVG
// markup the page renderer drops into the document.

const CHART = {
  ink: "#1b2a4a",
  grid: "#e3ddd2",
  muted: "#6b6a63",
  red: "#c8402a",
  teal: "#0f766e",
  blue: "#2b5f8a",
  amber: "#b7791f",
  green: "#3f7a4e",
};

function chartEsc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Round a max value up to a tidy axis top.
function axisTop(max) {
  const p = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / p;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * p;
}

function axisTicks(top, count) {
  const out = [];
  for (let i = 0; i <= count; i++) out.push((top * i) / count);
  return out;
}

function fmtNum(v, digits) {
  if (digits === undefined) digits = 1;
  return Number(v).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

// A line chart. series: [{ name, values, color }], labels: x-axis labels.
// opts: { width, height, unit, decimals, highlight } — highlight is the index
// of the x point to mark with a dot and a label.
function lineChart(labels, series, opts) {
  opts = opts || {};
  const w = opts.width || 720;
  const h = opts.height || 300;
  const padL = 56, padR = 16, padT = 18, padB = 34;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const decimals = opts.decimals === undefined ? 1 : opts.decimals;
  let max = 0;
  series.forEach(function (s) {
    s.values.forEach(function (v) { if (v > max) max = v; });
  });
  const top = axisTop(max * 1.08);
  const ticks = axisTicks(top, 4);
  const n = labels.length;
  function x(i) { return padL + (innerW * i) / Math.max(n - 1, 1); }
  function y(v) { return padT + innerH - (innerH * v) / top; }

  let svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Line chart">';
  ticks.forEach(function (t) {
    svg += '<line x1="' + padL + '" y1="' + y(t) + '" x2="' + (w - padR) + '" y2="' + y(t) +
      '" stroke="' + CHART.grid + '" stroke-width="1"/>';
    svg += '<text x="' + (padL - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end" font-size="11" fill="' +
      CHART.muted + '">' + fmtNum(t, decimals) + '</text>';
  });
  labels.forEach(function (lab, i) {
    if (i % Math.ceil(n / 8) !== 0 && i !== n - 1) return;
    svg += '<text x="' + x(i) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="11" fill="' +
      CHART.muted + '">' + chartEsc(lab) + '</text>';
  });
  series.forEach(function (s) {
    let d = "";
    s.values.forEach(function (v, i) {
      d += (i === 0 ? "M" : "L") + x(i).toFixed(1) + "," + y(v).toFixed(1) + " ";
    });
    svg += '<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round"/>';
    if (opts.highlight !== undefined && opts.highlight !== null) {
      const i = opts.highlight;
      svg += '<circle cx="' + x(i) + '" cy="' + y(s.values[i]) + '" r="4.5" fill="' + s.color +
        '" stroke="#fff" stroke-width="2"/>';
      svg += '<text x="' + x(i) + '" y="' + (y(s.values[i]) - 10) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' +
        s.color + '">' + fmtNum(s.values[i], decimals) + (opts.unit || "") + '</text>';
    }
  });
  svg += "</svg>";
  return svg;
}

// A vertical bar chart. values: numbers, labels: x labels.
function barChart(labels, values, opts) {
  opts = opts || {};
  const w = opts.width || 720;
  const h = opts.height || 300;
  const padL = 56, padR = 16, padT = 18, padB = 34;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const decimals = opts.decimals === undefined ? 1 : opts.decimals;
  const color = opts.color || CHART.red;
  let max = 0;
  values.forEach(function (v) { if (v > max) max = v; });
  const top = axisTop(max * 1.08);
  const ticks = axisTicks(top, 4);
  const n = labels.length;
  const slot = innerW / n;
  const bw = Math.min(46, slot * 0.62);
  function y(v) { return padT + innerH - (innerH * v) / top; }

  let svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Bar chart">';
  ticks.forEach(function (t) {
    svg += '<line x1="' + padL + '" y1="' + y(t) + '" x2="' + (w - padR) + '" y2="' + y(t) +
      '" stroke="' + CHART.grid + '" stroke-width="1"/>';
    svg += '<text x="' + (padL - 8) + '" y="' + (y(t) + 4) + '" text-anchor="end" font-size="11" fill="' +
      CHART.muted + '">' + fmtNum(t, decimals) + '</text>';
  });
  values.forEach(function (v, i) {
    const cx = padL + slot * i + slot / 2;
    svg += '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + y(v).toFixed(1) + '" width="' + bw.toFixed(1) +
      '" height="' + (padT + innerH - y(v)).toFixed(1) + '" rx="3" fill="' + color + '"/>';
    svg += '<text x="' + cx.toFixed(1) + '" y="' + (y(v) - 6).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="' +
      CHART.ink + '">' + fmtNum(v, decimals) + '</text>';
    svg += '<text x="' + cx.toFixed(1) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="11" fill="' +
      CHART.muted + '">' + chartEsc(labels[i]) + '</text>';
  });
  svg += "</svg>";
  return svg;
}

// Horizontal bars with a label and a value on each row.
function hbarChart(rows, opts) {
  opts = opts || {};
  const w = opts.width || 720;
  const rowH = opts.rowHeight || 40;
  const h = opts.height || (rows.length * rowH + 16);
  const padL = opts.labelWidth || 190;
  const padR = 64;
  const decimals = opts.decimals === undefined ? 1 : opts.decimals;
  let max = 0;
  rows.forEach(function (r) { if (r.value > max) max = r.value; });
  const top = axisTop(max * 1.08);
  const innerW = w - padL - padR;

  let svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Horizontal bar chart">';
  rows.forEach(function (r, i) {
    const y0 = 8 + i * rowH;
    const bw = (innerW * r.value) / top;
    svg += '<text x="' + (padL - 10) + '" y="' + (y0 + 21) + '" text-anchor="end" font-size="12" fill="' +
      CHART.ink + '">' + chartEsc(r.label) + '</text>';
    svg += '<rect x="' + padL + '" y="' + (y0 + 6) + '" width="' + Math.max(bw, 2).toFixed(1) +
      '" height="20" rx="3" fill="' + (r.color || CHART.teal) + '"/>';
    svg += '<text x="' + (padL + bw + 8).toFixed(1) + '" y="' + (y0 + 21) + '" font-size="12" font-weight="700" fill="' +
      CHART.ink + '">' + fmtNum(r.value, decimals) + (opts.unit || "") + '</text>';
  });
  svg += "</svg>";
  return svg;
}

// A donut chart with a legend. parts: [{ label, value, color }].
function donutChart(parts, opts) {
  opts = opts || {};
  const size = opts.size || 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 12;
  const thick = opts.thickness || 34;
  const decimals = opts.decimals === undefined ? 1 : opts.decimals;
  let total = 0;
  parts.forEach(function (p) { total += p.value; });

  let svg = '<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Donut chart" style="flex:none">';
  let angle = -Math.PI / 2;
  parts.forEach(function (p) {
    const frac = p.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + (r - thick) * Math.cos(a1);
    const yi1 = cy + (r - thick) * Math.sin(a1);
    const xi0 = cx + (r - thick) * Math.cos(a0);
    const yi0 = cy + (r - thick) * Math.sin(a0);
    svg += '<path d="M' + x0.toFixed(1) + ',' + y0.toFixed(1) + ' A' + r + ',' + r + ' 0 ' + large + ' 1 ' +
      x1.toFixed(1) + ',' + y1.toFixed(1) + ' L' + xi1.toFixed(1) + ',' + yi1.toFixed(1) + ' A' + (r - thick) + ',' +
      (r - thick) + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ',' + yi0.toFixed(1) + ' Z" fill="' + p.color + '"/>';
  });
  svg += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="20" font-weight="800" fill="' +
    CHART.ink + '">' + fmtNum(total, decimals) + (opts.unit || "") + '</text>';
  svg += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="' +
    CHART.muted + '">' + chartEsc(opts.centerLabel || "total") + '</text>';
  svg += "</svg>";

  let legend = '<ul class="legend">';
  parts.forEach(function (p) {
    legend += '<li><span class="swatch" style="background:' + p.color + '"></span>' +
      chartEsc(p.label) + ' <strong>' + fmtNum(p.value, decimals) + (opts.unit || "") + '</strong></li>';
  });
  legend += "</ul>";
  return '<div class="donut-wrap">' + svg + legend + "</div>";
}
