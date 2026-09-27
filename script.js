const translations = {
  en: {
    dir: 'ltr',
    titleTag: 'Moral Together\u00A0— Projects Hub',
    eyebrow: 'Moral Together',
    title: 'Our projects',
    subtitle: 'A colorful gateway to selected projects, digital platforms and public initiatives created around Moral Together.',
    project1Title: 'Moral for Good',
    project1Desc: 'Community impact platform',
    project2Title: 'M1 Radio',
    project2Desc: 'Positive broadcasting radio',
    project3Title: 'Zuzim.cash',
    project3Desc: 'Financial and donation platform',
    project4Title: 'Trust Mom',
    project4Desc: 'Positive Way Only',
    m1Note: 'A worldwide network in every\u00A0language\nA channel to lift morale in\u00A0Israel',
    trustMomNote: 'International organization\u00A0— the chosen representation of women and mothers in\u00A0Israel.\nA caring social network for mutual support, where community strength demands\u00A0fairness.',
    moralForGoodNote: 'An app for contests and audience ratings across all\u00A0platforms.',
    vvipNote: 'Exclusive\u00A0club',
    membersOnly: 'Members\u00A0only',
    comingSoon: 'Coming\u00A0soon',
    accessibilityLink: 'Accessibility statement',
    privacyLink: 'Privacy policy',
    skipToContent: 'Skip to content',
    langNavLabel: 'Choose language',
    openLabel: 'Go to the {project} website',
    socialLabel: '{project} on {net} (opens in a new tab)',
    footer: '© 2026 Moral Together.'
  },
  he: {
    dir: 'rtl',
    titleTag: 'Moral Together\u00A0— מרכז פרויקטים',
    eyebrow: 'Moral Together',
    title: 'הפרויקטים שלנו',
    subtitle: 'שער צבעוני ונקי לפרויקטים, פלטפורמות דיגיטליות ויוזמות ציבוריות שנוצרו סביב Moral Together.',
    project1Title: 'Moral for Good',
    project1Desc: 'פלטפורמה להשפעה קהילתית',
    project2Title: 'M1 Radio',
    project2Desc: 'רדיו שמשדר חיובי',
    project3Title: 'Zuzim.cash',
    project3Desc: 'פלטפורמה פיננסית ותרומות',
    project4Title: 'Trust Mom',
    project4Desc: 'Positive Way Only',
    m1Note: 'רשת עולמית בכל\u00A0השפות\nערוץ להרים את המורל\u00A0בישראל',
    trustMomNote: 'ארגון בינלאומי\u00A0– נציגות נבחרת נשים ואמהות\u00A0בישראל.\nרשת חברתית דואגת לאכפתיות הדדית במינוף קהילתי המחייב\u00A0הוגנות.',
    moralForGoodNote: 'אפליקציה לתחרויות ודירוג הצופים בכל\u00A0הפלטפורמות',
    vvipNote: 'מועדון\u00A0יוקרתי',
    membersOnly: 'לחברי מועדון\u00A0בלבד',
    comingSoon: 'בקרוב',
    accessibilityLink: 'הצהרת נגישות',
    privacyLink: 'מדיניות פרטיות',
    skipToContent: 'דילוג לתוכן',
    langNavLabel: 'בחירת שפה',
    openLabel: 'מעבר לאתר {project}',
    socialLabel: '{project} ב-{net} (נפתח בלשונית חדשה)',
    footer: '© 2026 Moral Together.'
  },
  ru: {
    dir: 'ltr',
    titleTag: 'Moral Together\u00A0— хаб проектов',
    eyebrow: 'Moral Together',
    title: 'Наши проекты',
    subtitle: 'Цветная и аккуратная страница со ссылками на выбранные проекты, сайты и публичные инициативы Moral Together.',
    project1Title: 'Moral for Good',
    project1Desc: 'Платформа общественного воздействия',
    project2Title: 'M1 Radio',
    project2Desc: 'Радио позитивного вещания',
    project3Title: 'Zuzim.cash',
    project3Desc: 'Финансовая платформа и пожертвования',
    project4Title: 'Trust Mom',
    project4Desc: 'Positive Way Only',
    m1Note: 'Мировая сеть на всех\u00A0языках\nКанал, поднимающий моральный дух в\u00A0Израиле',
    trustMomNote: 'Международная организация, избранная делегация женщин и матерей в\u00A0Израиле.\nСоциальная сеть взаимной заботы, где сила сообщества требует\u00A0справедливости.',
    moralForGoodNote: 'Приложение для конкурсов и зрительских рейтингов на всех\u00A0платформах.',
    vvipNote: 'Премиальный\u00A0клуб',
    membersOnly: 'Только для членов\u00A0клуба',
    comingSoon: 'Скоро',
    accessibilityLink: 'Заявление о\u00A0доступности',
    privacyLink: 'Политика конфиденциальности',
    skipToContent: 'Перейти к содержимому',
    langNavLabel: 'Выбор языка',
    openLabel: 'Перейти на сайт {project}',
    socialLabel: '{project} в {net} (откроется в новой вкладке)',
    footer: '© 2026 Moral Together.'
  }
};

const buttons = document.querySelectorAll('.lang-btn');
const i18nNodes = document.querySelectorAll('[data-i18n]');
const langSlider = document.querySelector('.lang-slider');
let sliderReady = false;

function moveLangSlider(activeButton) {
  if (!langSlider || !activeButton) {
    return;
  }

  // measured in fractional pixels: offsetLeft/offsetWidth round to whole ones and left the pill a pixel off
  const nav = langSlider.parentElement;
  const navBox = nav.getBoundingClientRect();
  const buttonBox = activeButton.getBoundingClientRect();
  langSlider.style.width = `${buttonBox.width}px`;
  langSlider.style.transform = `translateX(${buttonBox.left - navBox.left - nav.clientLeft}px)`;

  if (!sliderReady) {
    requestAnimationFrame(() => {
      langSlider.classList.add('is-ready');
      sliderReady = true;
    });
  }
}

// only a language the visitor picked by hand is remembered, so the browser language keeps working otherwise
const LANG_KEY = 'moralTogetherLangChoice';

function applyLanguage(lang, remember = false) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang;
  document.documentElement.dir = dict.dir;
  document.body.dir = dict.dir;
  document.title = dict.titleTag;

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      node.textContent = dict[key];
    }
  });

  // labels read out by screen readers follow the page language too
  document.querySelectorAll('[data-i18n-label]').forEach((node) => {
    const key = node.dataset.i18nLabel;
    if (dict[key]) {
      node.setAttribute('aria-label', dict[key]);
    }
  });

  document.querySelectorAll('[data-label-project]').forEach((node) => {
    const project = node.dataset.labelProject;
    const net = node.dataset.labelNet;
    const template = net ? dict.socialLabel : dict.openLabel;
    node.setAttribute('aria-label', template.replace('{project}', project).replace('{net}', net || ''));
  });

  let activeButton = null;
  buttons.forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    if (active) {
      activeButton = button;
    }
  });

  moveLangSlider(activeButton);
  // the accessibility widget re-renders its panel in the new language (a11y-widget.js)
  document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  if (remember) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (error) {
      // storage can be blocked (private mode); the chosen language just isn't remembered
    }
  }
}

// A switch by hand fades the text out, swaps the language (and the writing direction) while
// nothing is visible, then fades it back in. The pill moves at once so the click feels immediate.
const FADE_MS = 120;
let fadeTimer = null;

function switchLanguage(button) {
  const lang = button.dataset.lang;
  if (button.classList.contains('active') && !fadeTimer) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyLanguage(lang, true);
    return;
  }

  buttons.forEach((other) => other.classList.toggle('active', other === button));
  moveLangSlider(button);

  clearTimeout(fadeTimer);
  document.body.classList.add('lang-switched', 'lang-fading');
  fadeTimer = setTimeout(() => {
    fadeTimer = null;
    applyLanguage(lang, true);
    // the faded-out state has already been painted, so dropping the class starts the fade-in
    document.body.classList.remove('lang-fading');
  }, FADE_MS);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => switchLanguage(button));
});

window.addEventListener('resize', () => {
  const activeButton = document.querySelector('.lang-btn.active');
  moveLangSlider(activeButton);
});

// The buttons change width when the web font replaces the fallback font during loading,
// so follow their size instead of measuring only once.
if (window.ResizeObserver) {
  const sliderWatch = new ResizeObserver(() => moveLangSlider(document.querySelector('.lang-btn.active')));
  buttons.forEach((button) => sliderWatch.observe(button));
}
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => moveLangSlider(document.querySelector('.lang-btn.active')));
}

// Language: the visitor's own earlier choice, else the browser's language if we have it, else Hebrew
function detectLanguage() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && translations[saved]) {
      return saved;
    }
  } catch (error) {
    // storage blocked: fall through to the browser language
  }

  const preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const code = String(tag || '').toLowerCase().split('-')[0];
    // "iw" is the old code for Hebrew that some browsers still send
    const lang = code === 'iw' ? 'he' : code;
    if (translations[lang]) {
      return lang;
    }
  }

  return 'he';
}

applyLanguage(detectLanguage());

// Opening splash: about a second, then the page and its tiles fade in
const splash = document.getElementById('splash');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function finishSplash() {
  document.body.classList.add('content-ready');
  if (splash) {
    splash.classList.add('is-done');
  }
}

if (splash && !prefersReducedMotion) {
  splash.classList.add('is-loading');
  window.setTimeout(finishSplash, 600);
} else {
  finishSplash();
}
