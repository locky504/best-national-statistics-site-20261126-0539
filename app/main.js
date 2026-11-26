// Japan Data Atlas — router and controls.
//
// A tiny hash router: #/economy shows the economy page, and so on. Every
// control on every page is wired here by delegation on #view, so a control
// always does what its label promises: year pickers re-render their cards,
// chart switches redraw the chart, table headings re-sort, the region
// filter and search narrow the prefecture table live.

(function () {
  var view = document.getElementById("view");
  var nav = document.getElementById("nav");

  function currentRoute() {
    var hash = window.location.hash || "#/";
    var path = hash.slice(1);
    if (!path) path = "/";
    return VIEWS[path] ? path : "/";
  }

  function render() {
    var path = currentRoute();
    view.innerHTML = VIEWS[path]();
    Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) {
      if (a.getAttribute("href") === "#" + path) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
    window.scrollTo(0, 0);
    var search = document.getElementById("region-search");
    if (search) {
      search.addEventListener("input", function () {
        state.regionQuery = search.value;
        render();
        var again = document.getElementById("region-search");
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      });
    }
  }

  function rerenderKeepingFocus() {
    var active = document.activeElement;
    var id = active && active.id;
    render();
    if (id) {
      var el = document.getElementById(id);
      if (el) el.focus();
    }
  }

  view.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-action]");
    if (!t) return;
    var action = t.getAttribute("data-action");

    if (action === "chart-type") {
      var chart = t.getAttribute("data-chart");
      var type = t.getAttribute("data-type");
      if (chart === "pop") state.popChart = type;
      if (chart === "gdp") state.gdpChart = type;
      render();
    }

    if (action === "sort-pop") {
      var key = t.getAttribute("data-key");
      if (state.popSort === key) state.popDir = -state.popDir;
      else { state.popSort = key; state.popDir = -1; }
      render();
    }

    if (action === "sort-trade") {
      var tkey = t.getAttribute("data-key");
      if (state.tradeSort === tkey) state.tradeDir = -state.tradeDir;
      else { state.tradeSort = tkey; state.tradeDir = -1; }
      render();
    }

    if (action === "sort-region") {
      var rkey = t.getAttribute("data-key");
      if (state.regionSort === rkey) state.regionDir = -state.regionDir;
      else { state.regionSort = rkey; state.regionDir = rkey === "pop" ? -1 : 1; }
      render();
    }

    if (action === "region-filter") {
      var region = t.getAttribute("data-region");
      state.regionFilter = state.regionFilter === region ? "All" : region;
      render();
    }

    if (action === "region-clear") {
      state.regionFilter = "All";
      state.regionQuery = "";
      render();
    }
  });

  view.addEventListener("change", function (ev) {
    var t = ev.target.closest("[data-action]");
    if (!t) return;
    var action = t.getAttribute("data-action");
    if (action === "pop-year") {
      state.popYear = parseInt(t.value, 10);
      rerenderKeepingFocus();
    }
    if (action === "econ-year") {
      state.econYear = parseInt(t.value, 10);
      rerenderKeepingFocus();
    }
  });

  window.addEventListener("hashchange", render);
  render();
})();
