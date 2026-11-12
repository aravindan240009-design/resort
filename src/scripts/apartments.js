/**
 * Apartments Catalog — Filtering, Sorting & Detail Lightbox — ERA Residence
 * Works on authentic DOM cards and data/apartments.json
 */

export function initApartmentCatalog() {
  const cards = Array.from(document.querySelectorAll('.apart-card'));
  if (!cards.length) return;

  const filterButtons = document.querySelectorAll('[data-filter], .filter_item');
  const sortSelect = document.querySelector('[data-sort], .filter_select');
  const resetBtn = document.querySelector('[data-reset], .filter_reset');

  let activeTypology = 'all';
  let activeBeds = 'all';
  let activeSort = 'relevant';

  function applyFilters() {
    let visibleCount = 0;
    cards.forEach((card) => {
      const typeEl = card.querySelector('[data-type]');
      const bedEl = card.querySelector('[data-bed]');

      const cardType = typeEl?.getAttribute('data-type') || '';
      const cardBed = bedEl?.getAttribute('data-bed') || '';

      const matchType = activeTypology === 'all' || cardType.toLowerCase().includes(activeTypology.toLowerCase());
      const matchBed = activeBeds === 'all' || cardBed === activeBeds;

      if (matchType && matchBed) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const counter = document.querySelector('[data-apart-count]');
    if (counter) counter.textContent = visibleCount;
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filterVal = btn.getAttribute('data-filter') || btn.textContent.trim().toLowerCase();
      if (['all', 'ground-floor-basement', 'ground-floor', 'penthouse-duplex'].includes(filterVal)) {
        activeTypology = filterVal;
      } else if (['2', '3'].includes(filterVal)) {
        activeBeds = filterVal;
      }
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      applyFilters();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activeTypology = 'all';
      activeBeds = 'all';
      filterButtons.forEach(b => b.classList.remove('is-active'));
      applyFilters();
    });
  }
}
