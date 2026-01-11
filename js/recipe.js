// ============================
// Recipe logic (ingredients + servings)
// ============================

let servingsCount = 4;

// ---------- INGREDIENT DATA (base = 4 servings)
const INGREDIENTS = [
  { amount: 500, unit: "g",   nameKey: "ingBeets",    noteKey: "ingBeetsNote" },
  { amount: 300, unit: "g",   nameKey: "ingCabbage",  noteKey: "ingCabbageNote" },
  { amount: 2,   unit: "pcs", nameKey: "ingCarrots",  noteKey: "ingCarrotsNote" },
  { amount: 1,   unit: "pcs", nameKey: "ingOnion",    noteKey: "ingOnionNote" },
  { amount: 2.5, unit: "l",   nameKey: "ingStock",    noteKey: "ingStockNote" },
  { amount: 3,   unit: "pcs", nameKey: "ingPotatoes", noteKey: "ingPotatoesNote" },
];

// ---------- helpers
function unitLabel(unit, lang) {
  const map = {
    en: { g: "g", l: "L", pcs: "" },
    uk: { g: "г", l: "л", pcs: "" },
    de: { g: "g", l: "L", pcs: "" },
  };
  return map[lang]?.[unit] ?? unit;
}

function scaleAmount(base) {
  return (base * servingsCount) / 4;
}

function formatAmount(val) {
  return Number.isInteger(val) ? val : Math.round(val * 10) / 10;
}

// ---------- render servings
function renderServings() {
  const el = document.getElementById("servingsValue");
  if (!el) return;

  const dict = (typeof I18N !== "undefined" && (I18N[activeLang] || I18N.en)) ? (I18N[activeLang] || I18N.en) : null;
  if (!dict) return;

  el.textContent = `${servingsCount} ${dict.ingredientsServingsShort || ""}`.trim();
}

// ---------- render ingredients
function renderIngredients() {
  const root = document.getElementById("ingredientsList");
  if (!root) return;

  const dict = (typeof I18N !== "undefined" && (I18N[activeLang] || I18N.en)) ? (I18N[activeLang] || I18N.en) : null;
  if (!dict) return;

  const lang = (typeof activeLang !== "undefined" ? activeLang : "en");

  root.innerHTML = `
    <div class="ingredients-group">
      <p class="ingredients-group__title">${dict.ingredientsSubtitle || "FOR THE BASE"}</p>

      ${INGREDIENTS.map((item) => {
        const qty = formatAmount(scaleAmount(item.amount));
        const unit = unitLabel(item.unit, lang);
        const qtyText = item.unit === "pcs" ? `${qty}` : `${qty}${unit}`;

        const name = dict[item.nameKey] || item.nameKey;
        const note = dict[item.noteKey] || "";

        return `
          <label class="ingredient-item">
            <input type="checkbox" class="ingredient-check" />
            <span class="ingredient-dot" aria-hidden="true"></span>

            <span class="ingredient-body">
              <span class="ingredient-line">
                <strong>${qtyText}</strong>
                <span>${name}</span>
              </span>
              <small>${note}</small>
            </span>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

// ---------- controls
function setupServingsControls() {
  const minus = document.getElementById("servingsMinus");
  const plus = document.getElementById("servingsPlus");

  if (!minus || !plus) return;

  minus.onclick = () => {
    servingsCount = Math.max(1, servingsCount - 1);
    renderServings();
    renderIngredients();
  };

  plus.onclick = () => {
    servingsCount = Math.min(20, servingsCount + 1);
    renderServings();
    renderIngredients();
  };
}

// ---------- public hook for language change (called from applyLanguage)
window.onRecipeLanguageChange = () => {
  renderServings();
  renderIngredients();
};

// ---------- init (works even if DOM is already ready)
function initRecipe() {
  setupServingsControls();
  renderServings();
  renderIngredients();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRecipe);
} else {
  initRecipe();
}
