// Interactive Unit Typology Browser for Heritage Princes Real Estate Developers
const UNIT_TYPOLOGIES = [
  {
    "id": "unit-a",
    "code": "RES-01",
    "title": "Luxury Villa A — Crown Collection",
    "typeLabel": "Flagship Detached Residence",
    "areaSqm": "520 m²",
    "configuration": "4 Bedrooms · Private Pool · Rooftop Solarium",
    "exposure": "Goa Prime Coastal / Golf View",
    "highlight": "Double-height living salon with retractable glass walls, private elevator, and 3-car underground gallery.",
    "status": "Off-Market Release"
  },
  {
    "id": "unit-b",
    "code": "RES-02",
    "title": "Bespoke Residence B — Sky Penthouses",
    "typeLabel": "Duplex Penthouse Collection",
    "areaSqm": "380 m²",
    "configuration": "3 Bedrooms + Study · Wrap-Around Terrace · Plunge Pool",
    "exposure": "Unobstructed 270° Panorama",
    "highlight": "Direct private lift access, Gaggenau culinary studio, and 24/7 resident concierge services.",
    "status": "2 Units Remaining"
  },
  {
    "id": "unit-c",
    "code": "RES-03",
    "title": "Garden Townhouse — Edition III",
    "typeLabel": "Boutique Corner Residence",
    "areaSqm": "295 m²",
    "configuration": "3 En-Suite Bedrooms · Private Landscaped Garden",
    "exposure": "South-Facing Lush Enclave",
    "highlight": "High-yield investment asset with turnkey furniture pack and dedicated rental management option.",
    "status": "Investor Priority"
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
