const I18N = {
  en: {
    brandName: "Borshch",
    login: "Login",
    heroTitle: "Borshch",
    heroSubtitle: "A warm Ukrainian beet soup with deep flavor.",
    cta: "See recipe",
  },
  uk: {
    brandName: "Борщ",
    login: "Увійти",
    heroTitle: "Борщ",
    heroSubtitle: "Теплий український суп із буряком та насиченим смаком.",
    cta: "Дивитись рецепт",
  },
  de: {
    brandName: "Borschtsch",
    login: "Anmelden",
    heroTitle: "Borschtsch",
    heroSubtitle: "Eine warme ukrainische Rote-Bete-Suppe mit intensivem Geschmack.",
    cta: "Rezept ansehen",
  },
};

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
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
