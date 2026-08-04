const translations = {
  en: {
    dir: 'ltr',
    titleTag: 'Moral Together — Projects Hub',
    eyebrow: 'Moral Together',
    title: 'Our projects',
    subtitle: 'A colorful gateway to selected projects, digital platforms and public initiatives created around Moral Together.',
    project1Title: 'Moral for Good',
    project1Desc: 'Community impact platform',
    project2Title: 'Zuzim.cash',
    project2Desc: 'Financial / donation-related project',
    project3Title: 'Partner Landing Page',
    project3Desc: 'Client-facing presentation website',
    project4Title: 'Community Campaign',
    project4Desc: 'Public initiative / campaign hub',
    project5Title: 'Digital Services Showcase',
    project5Desc: 'Websites, automations and tools portfolio',
    project6Title: 'Projects Archive',
    project6Desc: 'Past work and reusable references',
    footer: '© 2026 Moral Together. Built as a lightweight public projects hub.'
  },
  he: {
    dir: 'rtl',
    titleTag: 'Moral Together — מרכז פרויקטים',
    eyebrow: 'Moral Together',
    title: 'הפרויקטים שלנו',
    subtitle: 'שער צבעוני ונקי לפרויקטים, פלטפורמות דיגיטליות ויוזמות ציבוריות שנוצרו סביב Moral Together.',
    project1Title: 'Moral for Good',
    project1Desc: 'פלטפורמה להשפעה קהילתית',
    project2Title: 'Zuzim.cash',
    project2Desc: 'פרויקט פיננסי / תרומות',
    project3Title: 'Partner Landing Page',
    project3Desc: 'אתר תדמית להצגה מול לקוחות ושותפים',
    project4Title: 'Community Campaign',
    project4Desc: 'מרכז ליוזמה ציבורית / קמפיין',
    project5Title: 'Digital Services Showcase',
    project5Desc: 'פורטפוליו אתרים, אוטומציות וכלים',
    project6Title: 'Projects Archive',
    project6Desc: 'עבודות עבר ורפרנסים לשימוש חוזר',
    footer: '© 2026 Moral Together. נבנה כמרכז פרויקטים ציבורי וקל משקל.'
  },
  ru: {
    dir: 'ltr',
    titleTag: 'Moral Together — хаб проектов',
    eyebrow: 'Moral Together',
    title: 'Наши проекты',
    subtitle: 'Цветная и аккуратная страница со ссылками на выбранные проекты, сайты и публичные инициативы Moral Together.',
    project1Title: 'Moral for Good',
    project1Desc: 'Платформа общественного воздействия',
    project2Title: 'Zuzim.cash',
    project2Desc: 'Финансовый / donation-related проект',
    project3Title: 'Partner Landing Page',
    project3Desc: 'Презентационный сайт для клиентов и партнёров',
    project4Title: 'Community Campaign',
    project4Desc: 'Хаб публичной инициативы / кампании',
    project5Title: 'Digital Services Showcase',
    project5Desc: 'Портфолио сайтов, автоматизаций и инструментов',
    project6Title: 'Projects Archive',
    project6Desc: 'Прошлые работы и reusable references',
    footer: '© 2026 Moral Together. Лёгкий публичный хаб проектов.'
  }
};

const buttons = document.querySelectorAll('.lang-btn');
const i18nNodes = document.querySelectorAll('[data-i18n]');

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

  buttons.forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  localStorage.setItem('moralTogetherLang', lang);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

const saved = localStorage.getItem('moralTogetherLang');
applyLanguage(saved && translations[saved] ? saved : 'en');
