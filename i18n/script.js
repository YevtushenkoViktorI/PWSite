const I18N = {
  en: {
    brandName: "Borshch",
    login: "Login",
    heroTitle: "Borshch",
    heroSubtitle: "A warm Ukrainian beet soup with deep flavor.",
    cta: "See recipe",
    loginModalTitle: "Login / Sign in",
    loginModalMessage: "Sorry, this feature is still under development.",
    btnOkLoginName: "OK →",
    heritage: "CULINARY HERITAGE",

    // HTML because we need colored spans
    heroTaste: `
      <span class="hero-title--line">Borshch —</span>
      <span class="hero-title--line">the taste of</span>
      <span class="hero-title--line">Ukraine’s history</span>
    `.trim(),
    heroSubtitle: "Discover the secrets of a national dish that connects generations through centuries of flavor and tradition.",
    ctaRecipe: "See recipe →",
    ctaHistory: "Learn the history",
    specsTitle: "Characteristics",
    specsSubtitle: "Recipe No. 1",
    specTimeLabel: "TIME",
    specTimeValue: "90 min",
    specServingsLabel: "SERVES",
    specServingsValue: "6 servings",
    specTypeLabel: "TYPE",
    specTypeValue: "Classic",
    specHeartyLabel: "HEARTINESS",
    specHeartyValue: "Hearty",
  },
  uk: {
    brandName: "Борщ",
    login: "Увійти",
    heroTitle: "Борщ",
    heroSubtitle: "Теплий український суп із буряком та насиченим смаком.",
    cta: "Дивитись рецепт",
    loginModalTitle: "Вхід / Реєстрація",
    loginModalMessage: "Перепрошуємо, дана функціональність на стадії впровадження.",
    btnOkLoginName: "Зрозуміло →",
    heritage: "КУЛІНАРНА СПАДЩИНА",

    // HTML because we need 2 colors on the same word
    heroTaste: `
      <span class="hero-title--line">Борщ —</span>
      <span class="hero-title--line">смак історії</span>
      <span class="hero-title--line">
        <span class="hero-title__blue">Укр</span><span class="hero-title__yellow">аїни</span>
      </span>
    `.trim(),
    heroSubtitle: "Відкрийте для себе секрети національної страви, що об’єднує покоління через століття смаку та традицій.",
    ctaRecipe: "Показати рецепт →",
    ctaHistory: "Дізнатися історію",
    // uk
    specsTitle: "Характеристики",
    specsSubtitle: "Рецепт №1",
    specTimeLabel: "ЧАС",
    specTimeValue: "90 хв",
    specServingsLabel: "ВИХІД",
    specServingsValue: "6 порцій",
    specTypeLabel: "ТИП",
    specTypeValue: "Класичний",
    specHeartyLabel: "СИТНІСТЬ",
    specHeartyValue: "Ситний",

  },
  de: {
    brandName: "Borschtsch",
    login: "Anmelden",
    heroTitle: "Borschtsch",
    heroSubtitle: "Eine warme ukrainische Rote-Bete-Suppe mit intensivem Geschmack.",
    cta: "Rezept ansehen",
    loginModalTitle: "Anmelden / Einloggen",
    loginModalMessage: "Entschuldigung, diese Funktion befindet sich noch in der Entwicklung.",
    btnOkLoginName: "Verstanden →",
    heritage: "KULINARISCHES ERBE",

    heroTaste: `
      <span class="hero-title--line">Borschtsch —</span>
      <span class="hero-title--line">der Geschmack</span>
      <span class="hero-title--line">der Geschichte der Ukraine</span>
    `.trim(),
    heroSubtitle: "Entdecken Sie die Geheimnisse eines Nationalgerichts, das Generationen über Jahrhunderte hinweg durch Geschmack und Tradition verbindet.",
    ctaRecipe: "Rezept ansehen →",
    ctaHistory: "Geschichte entdecken",
    specsTitle: "Eigenschaften",
    specsSubtitle: "Rezept Nr. 1",
    specTimeLabel: "ZEIT",
    specTimeValue: "90 Min.",
    specServingsLabel: "PORTIONEN",
    specServingsValue: "6 Portionen",
    specTypeLabel: "TYP",
    specTypeValue: "Klassisch",
    specHeartyLabel: "SÄTTIGEND",
    specHeartyValue: "Sättigend",
  },
};

const HTML_KEYS = new Set(["heroTaste"]);

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!Object.prototype.hasOwnProperty.call(dict, key)) return;

    if (HTML_KEYS.has(key)) {
      el.innerHTML = dict[key];   // ✅ важливо
    } else {
      el.textContent = dict[key];
    }
  });

  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  localStorage.setItem("lang", lang);
}

function initLanguageSwitcher() {
  const saved = localStorage.getItem("lang");

  const browserLang = (navigator.language || "en").slice(0, 2); // de-CH -> de
  const defaultLang = saved || (I18N[browserLang] ? browserLang : "en");

  applyLanguage(defaultLang);

  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
}

initLanguageSwitcher();
