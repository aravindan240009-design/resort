// Interactive Unit Typology Browser for NEW AB UBUD LUXURY VILLA
const UNIT_TYPOLOGIES = [
  {
    "id": "unit-a",
    "code": "VILLA-01",
    "title": "Luxury Villa A — Infinity Sanctuary",
    "typeLabel": "Private Pool Residence",
    "areaSqm": "480 m²",
    "configuration": "4 Master Suites · Infinity Pool · Private Pavilion",
    "exposure": "Panoramic Bali Horizon",
    "highlight": "Cantilevered saltwater pool with indoor-outdoor travertine lounge and private chef kitchen.",
    "status": "Direct Booking Open"
  },
  {
    "id": "unit-b",
    "code": "VILLA-02",
    "title": "Bespoke Residence B — Garden Courtyard",
    "typeLabel": "Signature Estate Villa",
    "areaSqm": "360 m²",
    "configuration": "3 En-Suite Bedrooms · Sunken Firepit · Spa Deck",
    "exposure": "Tropical Courtyard & Sunset Terrace",
    "highlight": "Hand-carved stone colonnades, private wellness sauna, and dedicated butler quarters.",
    "status": "Seasonal Availability"
  },
  {
    "id": "unit-c",
    "code": "VILLA-03",
    "title": "Presidential Compound — Dual Pavilion",
    "typeLabel": "Ultra-Prime Retreat",
    "areaSqm": "720 m²",
    "configuration": "6 Suites · 25m Lap Pool · Private Cinema",
    "exposure": "360° Elevated Estate",
    "highlight": "Designed for VIP family buyouts and executive retreats with direct helipad/chauffeur access.",
    "status": "By Private Inquiry"
  }
];

function selectTypology(unitId) {
  const unit = UNIT_TYPOLOGIES.find((u) => u.id === unitId) || UNIT_TYPOLOGIES[0];
  if (!unit) return;

  document.querySelectorAll('.unit-tab-btn').forEach((btn) => {
    if (btn.getAttribute('data-unit-id') === unit.id) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const codeEl = document.getElementById('active-unit-code');
  const titleEl = document.getElementById('active-unit-title');
  const typeEl = document.getElementById('active-unit-type');
  const areaEl = document.getElementById('active-unit-area');
  const configEl = document.getElementById('active-unit-config');
  const exposureEl = document.getElementById('active-unit-exposure');
  const highlightEl = document.getElementById('active-unit-highlight');
  const statusEl = document.getElementById('active-unit-status');

  if (codeEl) codeEl.textContent = unit.code;
  if (titleEl) titleEl.textContent = unit.title;
  if (typeEl) typeEl.textContent = unit.typeLabel;
  if (areaEl) areaEl.textContent = unit.areaSqm;
  if (configEl) configEl.textContent = unit.configuration;
  if (exposureEl) exposureEl.textContent = unit.exposure;
  if (highlightEl) highlightEl.textContent = unit.highlight;
  if (statusEl) statusEl.textContent = unit.status;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.unit-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-unit-id');
      if (id) selectTypology(id);
    });
  });
});
