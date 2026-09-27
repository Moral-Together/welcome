// Accessibility widget: the floating button and panel that let a visitor adjust the page to
// suit them (text size, contrast, stop animations, highlight links, readable font and more).
// Open-Nagish 1.1.5 (MIT), vendored in vendor/ and pinned by file name. It is the same widget
// and version the main site moraltogether.com uses, so both behave alike and the main site's
// accessibility statement describes this page truthfully.
//
// Importing the module initialises the widget by itself, so the configuration has to be on
// window.OpenNagishConfig before the import. It renders into a shadow root, which the page's
// stylesheets do not reach, so the brand colours are injected there as a style element.
//
// The widget loads when the browser is idle, or at once on the first key press or tap, so it
// never delays the page itself.

(function () {
  'use strict';

  var SRC = './vendor/open-nagish-1.1.5.esm.js';   // a module specifier needs the ./
  var HOST_ID = 'opennagish-widget';                // set by the package
  var THEME_ID = 'mt-a11y-theme';
  var MOBILE_MAX = 768;                             // the width the package switches layout at
  var IDLE_TIMEOUT_MS = 2500;

  // The panel speaks Hebrew, English, Arabic and Russian, which covers all three page languages.
  function uiLang() {
    var tag = (document.documentElement.getAttribute('lang') || 'he').toLowerCase();
    if (tag.indexOf('ru') === 0) return 'ru';
    if (tag.indexOf('en') === 0) return 'en';
    return 'he';
  }

  function config() {
    return {
      position: 'bottom-left',    // the side Israeli sites put it on
      lang: uiLang(),
      // the statement lives on the main site and covers its subdomains, this page included
      statementUrl: 'https://moraltogether.com/accessibility.html',
      statementData: {
        orgName: 'MoralTogether',
        orgEmail: 'support@moraltogether.com'
      }
    };
  }

  // Only the package's default blue is replaced, with this page's violet.
  // White on #4f46e5 is about 6.3:1.
  var THEME = [
    ':host {',
    '  --w-accent: #4f46e5;',
    '  --w-open: #ea2261;',
    '}',
    ':host, .anid-trigger, .anid-panel, .anid-panel *, .anid-statement-modal, .anid-statement-modal * {',
    "  font-family: 'Rubik', system-ui, -apple-system, 'Segoe UI', sans-serif;",
    '}',
    '.anid-trigger {',
    '  background: var(--w-accent) !important;',
    '  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28) !important;',
    '}',
    '.anid-trigger svg { fill: #fff !important; }',
    '.anid-trigger[aria-expanded="true"] { background: var(--w-open) !important; }',
    '.anid-panel-header { background: var(--w-accent) !important; }',
    '.anid-btn.anid-active {',
    '  background: var(--w-accent) !important;',
    '  border-color: var(--w-accent) !important;',
    '  color: #fff !important;',
    '}',
    '.anid-toggle input:checked + .anid-toggle-slider { background: var(--w-accent) !important; }',
    '.anid-slider::-webkit-slider-thumb { background: var(--w-accent) !important; }',
    '.anid-slider::-moz-range-thumb { background: var(--w-accent) !important; }',
    '.anid-heading-list button, .anid-landmark-list button { color: var(--w-accent) !important; }',
    '.anid-btn:focus-visible,',
    '.anid-category-header:focus-visible,',
    '.anid-heading-list button:focus-visible,',
    '.anid-landmark-list button:focus-visible { outline-color: var(--w-accent) !important; }',
    // phone: 44x44 is the smallest target the standard allows
    '@media (max-width: ' + MOBILE_MAX + 'px) {',
    '  .anid-trigger { width: 44px !important; height: 44px !important; border-width: 2px !important; }',
    '  .anid-trigger svg { width: 20px !important; height: 20px !important; }',
    '  .anid-trigger:hover, .anid-trigger:focus-visible { transform: none !important; }',
    '}'
  ].join('\n');

  var init = null;          // the package's init(), once the module has loaded
  var started = false;

  // Runs after every init, because each one builds a new shadow root.
  function dress() {
    var el = document.getElementById(HOST_ID);
    if (!el || !el.shadowRoot || el.shadowRoot.getElementById(THEME_ID)) return;
    var style = document.createElement('style');
    style.id = THEME_ID;
    style.textContent = THEME;
    el.shadowRoot.appendChild(style);
  }

  function load() {
    if (started) return;
    started = true;
    window.OpenNagishConfig = config();
    import(SRC).then(function (mod) {
      init = mod.init;       // the import has already built the widget
      dress();
    }).catch(function () {
      started = false;       // a failed fetch gets another chance
      arm();
    });
  }

  function schedule() {
    if (window.requestIdleCallback) requestIdleCallback(load, { timeout: IDLE_TIMEOUT_MS });
    else setTimeout(load, 1200);
  }

  // Someone reaching for the keyboard or the screen should not wait for the idle callback.
  function arm() {
    ['keydown', 'pointerdown'].forEach(function (type) {
      window.addEventListener(type, load, { once: true, passive: true });
    });
  }
  arm();

  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule);

  // script.js announces a language switch; re-initialising re-renders the panel in that language.
  document.addEventListener('langChanged', function () {
    if (!init) return;
    init({ lang: uiLang() });
    dress();
  });
}());
