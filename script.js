const translations = {
  en: {
    dir: 'ltr',
    titleTag: 'Moral Together — Projects Hub',
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
    footer: '© 2026 Moral Together.'
  },
  he: {
    dir: 'rtl',
    titleTag: 'Moral Together — מרכז פרויקטים',
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
    footer: '© 2026 Moral Together.'
  },
  ru: {
    dir: 'ltr',
    titleTag: 'Moral Together — хаб проектов',
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
    footer: '© 2026 Moral Together.'
  }
};

const buttons = document.querySelectorAll('.lang-btn');
const i18nNodes = document.querySelectorAll('[data-i18n]');
const langSlider = document.querySelector('.lang-slider');
const splash = document.getElementById('splash');
const splashBar = splash ? splash.querySelector('.splash-bar') : null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let sliderReady = false;

function moveLangSlider(activeButton) {
  if (!langSlider || !activeButton) {
    return;
  }

  langSlider.style.width = `${activeButton.offsetWidth}px`;
  langSlider.style.transform = `translateX(${activeButton.offsetLeft}px)`;

  if (!sliderReady) {
    requestAnimationFrame(() => {
      langSlider.classList.add('is-ready');
      sliderReady = true;
    });
  }
}

function applyLanguage(lang) {
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
  localStorage.setItem('moralTogetherLang', lang);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

window.addEventListener('resize', () => {
  const activeButton = document.querySelector('.lang-btn.active');
  moveLangSlider(activeButton);
});

const saved = localStorage.getItem('moralTogetherLang');
applyLanguage(saved && translations[saved] ? saved : 'en');

function finishSplash() {
  document.body.classList.add('content-ready');

  if (!splash) {
    return;
  }

  splash.classList.add('is-done');
  splash.setAttribute('aria-hidden', 'true');
  if (splashBar) {
    splashBar.setAttribute('aria-valuenow', '100');
  }
}

function startSplash() {
  if (!splash) {
    return;
  }

  if (prefersReducedMotion) {
    finishSplash();
    return;
  }

  splash.classList.add('is-loading');
  if (splashBar) {
    splashBar.setAttribute('aria-valuenow', '100');
  }

  window.setTimeout(finishSplash, 1650);
}

startSplash();
