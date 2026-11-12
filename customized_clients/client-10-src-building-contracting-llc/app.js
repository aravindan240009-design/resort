// Interactive Unit Typology Browser for SRC Building Contracting LLC
const UNIT_TYPOLOGIES = [
  {
    "id": "unit-a",
    "code": "BUILD-01",
    "title": "Turnkey Signature Villa Build — Type A",
    "typeLabel": "Ground-Up Structural & Fit-Out",
    "areaSqm": "580 m²",
    "configuration": "Reinforced Concrete Frame · Smart Home MEP · Infinity Pool",
    "exposure": "Dubai Prime Residential Plot",
    "highlight": "Delivered turnkey in 14 months with transparent milestone schedules, ISO quality control, and fixed-price BOQ.",
    "status": "Immediate Mobilization"
  },
  {
    "id": "unit-b",
    "code": "BUILD-02",
    "title": "Bespoke Estate Renovation & Extension",
    "typeLabel": "Structural Modernization",
    "areaSqm": "430 m²",
    "configuration": "Structural Steel Glazing · New Pool Deck · Underfloor HVAC",
    "exposure": "Full Envelope Upgrade",
    "highlight": "Complete seismic/structural reinforcement, acoustic triple-glazing, and zero-defect handover warranty.",
    "status": "Estimator Ready"
  },
  {
    "id": "unit-c",
    "code": "BUILD-03",
    "title": "Commercial & Boutique Hospitality Shell + Core",
    "typeLabel": "High-Spec Contracting",
    "areaSqm": "950 m²",
    "configuration": "Commercial Grade MEP · Architectural Facade · Fast-Track",
    "exposure": "Dubai Commercial Corridor",
    "highlight": "Dedicated site engineering team, municipality approval management, and premium material procurement.",
    "status": "Tender Open"
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
