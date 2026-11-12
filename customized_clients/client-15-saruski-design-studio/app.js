// Interactive Unit Typology Browser for Saruski Design Studio
const UNIT_TYPOLOGIES = [
  {
    "id": "unit-a",
    "code": "INT-01",
    "title": "The Travertine & Oak Penthouse",
    "typeLabel": "Full-Floor Interior Curation",
    "areaSqm": "410 m²",
    "configuration": "Bespoke Millwork · Italian Marble Kitchen · Gallery Lighting",
    "exposure": "Miami Skyline & Terrace",
    "highlight": "Custom book-matched Calacatta Viola islands, concealed architectural lighting, and curated collectible furniture.",
    "status": "Turnkey Styling Package"
  },
  {
    "id": "unit-b",
    "code": "INT-02",
    "title": "Mediterranean Minimalist Villa Fit-Out",
    "typeLabel": "Complete Spatial Transformation",
    "areaSqm": "540 m²",
    "configuration": "5 Suites · Micro-Cement Finishes · Custom Joinery",
    "exposure": "Natural Linen & Warm Bronze Palette",
    "highlight": "Floor-to-ceiling pivot doors, acoustic plaster ceilings, and bespoke outdoor lounge furnishings.",
    "status": "Showroom Spec Available"
  },
  {
    "id": "unit-c",
    "code": "INT-03",
    "title": "Private Spa & Master Suite Sanctuary",
    "typeLabel": "Bespoke Suite Remodel",
    "areaSqm": "180 m²",
    "configuration": "Hammam Steam Room · Boutique Dressing Room · Smart Scenes",
    "exposure": "Zenithal Skylight Illumination",
    "highlight": "Monolithic carved stone soaking tub, brushed brass fixtures, and automated Lutron circadian scenes.",
    "status": "Design Brief Open"
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
