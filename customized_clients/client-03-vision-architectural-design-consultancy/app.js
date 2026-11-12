// Interactive Unit Typology Browser for Vision Architectural Design consultancy
const UNIT_TYPOLOGIES = [
  {
    "id": "unit-a",
    "code": "ARCH-01",
    "title": "Monolith Coastal Villa Concept",
    "typeLabel": "Bespoke Architectural Commission",
    "areaSqm": "650 m²",
    "configuration": "3 Levels · Cantilevered Concrete & Glass · BIM Ready",
    "exposure": "Dubai Coastal Topography",
    "highlight": "Passive solar orientation, double-height atrium gallery, and seamless subterranean garage.",
    "status": "Concept & Schematic Ready"
  },
  {
    "id": "unit-b",
    "code": "ARCH-02",
    "title": "Courtyard Atrium Residence",
    "typeLabel": "Sustainable Luxury Typology",
    "areaSqm": "490 m²",
    "configuration": "4 Bedrooms · Biophilic Inner Courtyard · Solar Roof",
    "exposure": "South-West Natural Light Optimization",
    "highlight": "Cross-ventilated timber louvers and locally quarried limestone facade engineered for microclimate comfort.",
    "status": "Permit-Ready Package"
  },
  {
    "id": "unit-c",
    "code": "ARCH-03",
    "title": "Boutique Commercial & Hospitality Pavilion",
    "typeLabel": "Mixed-Use Flagship Design",
    "areaSqm": "1,200 m²",
    "configuration": "Showroom Level · Rooftop Lounge · Executive Suites",
    "exposure": "Prime Dubai Urban Corner",
    "highlight": "Iconic structural diagrid envelope with column-free exhibition spans and acoustic glazing.",
    "status": "Consultation Open"
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
