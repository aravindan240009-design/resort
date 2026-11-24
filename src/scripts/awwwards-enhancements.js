import * as THREE from 'three';

/**
 * Awwwards Site-of-the-Day Level Luxury Enhancements
 * - WebGL 3D Atmospheric Gold Stardust
 * - 3D Perspective Card Tilt & Glare
 * - Kinetic Blur-to-Focus Typography
 * - Desktop Magnetic Luxury Cursor
 * - Mobile Floating Action Dock
 * - Animated SVG Architectural Elements
 */

export function initAwwwardsExperience() {
  if (typeof window === 'undefined') return;

  // Run in order
  initWebGLAtmosphere();
  init3DCardTilt();
  initKineticBlurTypography();
  initDesktopMagneticCursor();
  initMobileLuxuryDock();
  initSVGBlueprintDecorations();
}

/**
 * 1. WebGL 3D Ambient Gold Stardust Atmosphere
 */
function initWebGLAtmosphere() {
  let canvas = document.getElementById('luxury-webgl-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'luxury-webgl-canvas';
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:3;opacity:0.85;mix-blend-mode:screen;';
    document.body.appendChild(canvas);
  }

  const isMobile = window.innerWidth < 992;
  const particleCount = isMobile ? 350 : 800;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 100;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL not supported:', e);
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Geometry: Stardust particles
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  // Warm Gold Palette: #C8A97E, #DFC39E, #F7F6F2
  const colorGold1 = new THREE.Color('#c8a97e');
  const colorGold2 = new THREE.Color('#dfc39e');
  const colorAlabaster = new THREE.Color('#f7f6f2');

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 220;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 140;

    const rChoice = Math.random();
    const c = rChoice > 0.6 ? colorGold1 : rChoice > 0.25 ? colorGold2 : colorAlabaster;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 2.8 + 1.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Circular soft particle shader/texture
  const canvasTexture = createCircleTexture();
  const material = new THREE.PointsMaterial({
    size: 2.4,
    vertexColors: true,
    map: canvasTexture,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Interaction tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener(
    'mousemove',
    (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    },
    { passive: true }
  );

  let lastScrollY = window.scrollY;
  let scrollSpeed = 0;

  window.addEventListener(
    'scroll',
    () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = (currentScrollY - lastScrollY) * 0.05;
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Smooth lerp camera
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    camera.position.x = mouseX;
    camera.position.y = -mouseY;
    camera.lookAt(scene.position);

    // Particle organic motion
    particles.rotation.y = elapsed * 0.02 + window.scrollY * 0.0003;
    particles.rotation.x = elapsed * 0.01;

    // Decay scroll speed
    scrollSpeed *= 0.92;
    particles.position.y = (window.scrollY * 0.05) % 100 - 50;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  });
}

function createCircleTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(223, 195, 158, 0.8)');
  gradient.addColorStop(0.7, 'rgba(200, 169, 126, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/**
 * 2. 3D Perspective Card Tilt & Interactive Glare Reflection
 */
function init3DCardTilt() {
  if (window.innerWidth < 992) return; // Desktop only

  const cards = document.querySelectorAll(
    '.amen-slide, .apart-card, .interior-gallery-s_item, .interior-s_l_img, .other-s_item'
  );

  cards.forEach((card) => {
    if (card.dataset.tilt3d) return;
    card.dataset.tilt3d = 'true';

    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';

    // Create glare overlay
    let glare = card.querySelector('.luxury-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'luxury-glare';
      glare.style.cssText =
        'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity 0.3s ease;z-index:4;mix-blend-mode:overlay;';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      const rotX = -yPct * 8; // Max 8 deg
      const rotY = xPct * 8;

      if (window.gsap) {
        window.gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      glare.style.opacity = '0.45';
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 235, 200, 0.6) 0%, rgba(200, 169, 126, 0.1) 50%, transparent 80%)`;
    });

    card.addEventListener('mouseleave', () => {
      if (window.gsap) {
        window.gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1.0,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
      glare.style.opacity = '0';
    });
  });
}

/**
 * 3. Kinetic Blur-to-Focus Typography
 */
function initKineticBlurTypography() {
  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') return;

  const headings = document.querySelectorAll(
    '.h1, .h2, .h3, .s_title .l1, .loc-intro-s_title, .arch-s_t h2, .cta-s_title h2'
  );

  headings.forEach((h) => {
    if (h.dataset.blurKinetic || h.closest('#hero') || h.closest('.footer-s')) return;
    h.dataset.blurKinetic = 'true';

    window.gsap.fromTo(
      h,
      {
        y: 45,
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.98
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1.0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: h,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });
}

/**
 * 4. Desktop Magnetic Luxury Cursor
 */
function initDesktopMagneticCursor() {
  if (window.innerWidth < 992) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let cursorDot = document.getElementById('luxury-cursor-dot');
  let cursorRing = document.getElementById('luxury-cursor-ring');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.id = 'luxury-cursor-dot';
    cursorDot.style.cssText =
      'position:fixed;top:0;left:0;width:8px;height:8px;background:#c8a97e;border-radius:50%;pointer-events:none;z-index:999999;transform:translate(-50%,-50%);transition:transform 0.1s ease;';
    document.body.appendChild(cursorDot);
  }

  if (!cursorRing) {
    cursorRing = document.createElement('div');
    cursorRing.id = 'luxury-cursor-ring';
    cursorRing.style.cssText =
      'position:fixed;top:0;left:0;width:38px;height:38px;border:1px solid rgba(200,169,126,0.6);border-radius:50%;pointer-events:none;z-index:999998;transform:translate(-50%,-50%);transition:width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease;';
    document.body.appendChild(cursorRing);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener(
    'mousemove',
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    },
    { passive: true }
  );

  // Smooth lerp for ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover expansion over clickable items
  const interactiveEls = document.querySelectorAll(
    'a, button, [hover-btn], [hover-nav-item], .btn-circle, .nav-item, input, select'
  );

  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '64px';
      cursorRing.style.height = '64px';
      cursorRing.style.borderColor = '#dfc39e';
      cursorRing.style.background = 'rgba(200, 169, 126, 0.12)';
      cursorRing.style.backdropFilter = 'blur(2px)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '38px';
      cursorRing.style.height = '38px';
      cursorRing.style.borderColor = 'rgba(200, 169, 126, 0.6)';
      cursorRing.style.background = 'transparent';
      cursorRing.style.backdropFilter = 'none';
    });
  });
}

/**
 * 5. Dedicated Mobile Luxury Concierge Dock
 */
function initMobileLuxuryDock() {
  if (window.innerWidth >= 992) return; // Mobile only (< 992px)

  let dock = document.getElementById('mobile-luxury-dock');
  if (dock) return;

  dock = document.createElement('div');
  dock.id = 'mobile-luxury-dock';
  dock.innerHTML = `
    <div class="mobile-dock-inner">
      <a href="/apartments/" class="dock-btn-primary">
        <span class="dock-btn-glow"></span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>View Residences (25)</span>
      </a>
      <a href="tel:+914440000000" class="dock-btn-call" aria-label="Call Concierge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
      <a href="/contact/" class="dock-btn-vip" aria-label="Book Private Viewing">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A97E" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </a>
    </div>
  `;

  // Append styling
  const style = document.createElement('style');
  style.id = 'mobile-dock-styles';
  style.textContent = `
    #mobile-luxury-dock {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99999;
      width: calc(100% - 32px);
      max-width: 420px;
      pointer-events: auto;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    }
    #mobile-luxury-dock.dock-hidden {
      transform: translateX(-50%) translateY(120px);
      opacity: 0;
    }
    .mobile-dock-inner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      background: rgba(11, 18, 30, 0.88);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(200, 169, 126, 0.35);
      border-radius: 40px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(200, 169, 126, 0.15);
    }
    .dock-btn-primary {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(135deg, #c8a97e 0%, #dfc39e 100%);
      color: #0b121e !important;
      padding: 12px 18px;
      border-radius: 30px;
      font-family: 'Maison Neue Extended', Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-decoration: none;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(200, 169, 126, 0.3);
    }
    .dock-btn-call, .dock-btn-vip {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(200, 169, 126, 0.3);
      text-decoration: none;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .dock-btn-call:active, .dock-btn-vip:active {
      transform: scale(0.92);
      background: rgba(200, 169, 126, 0.2);
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(dock);

  // Smart hide on rapid scroll down, reveal on scroll up
  let lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;
      if (currentY > lastY + 15 && currentY > 150) {
        dock.classList.add('dock-hidden');
      } else if (currentY < lastY - 10 || currentY <= 150) {
        dock.classList.remove('dock-hidden');
      }
      lastY = currentY;
    },
    { passive: true }
  );
}

/**
 * 6. Animated SVG Blueprint Compass & Navigation Instruments
 */
function initSVGBlueprintDecorations() {
  const locSection = document.querySelector('.loc-scroll-area');
  if (locSection && !document.getElementById('svg-blueprint-compass')) {
    const compassWrap = document.createElement('div');
    compassWrap.id = 'svg-blueprint-compass';
    compassWrap.style.cssText =
      'position:absolute;top:40px;right:40px;width:120px;height:120px;pointer-events:none;z-index:4;opacity:0.65;';
    compassWrap.innerHTML = `
      <svg viewBox="0 0 120 120" width="100%" height="100%" class="blueprint-svg">
        <circle cx="60" cy="60" r="56" stroke="#C8A97E" stroke-width="0.75" stroke-dasharray="3 3" fill="none"/>
        <circle cx="60" cy="60" r="46" stroke="#C8A97E" stroke-width="1" fill="none"/>
        <line x1="60" y1="4" x2="60" y2="116" stroke="#C8A97E" stroke-width="0.5" stroke-dasharray="2 2"/>
        <line x1="4" y1="60" x2="116" y2="60" stroke="#C8A97E" stroke-width="0.5" stroke-dasharray="2 2"/>
        <g id="compass-needle" transform="rotate(24 60 60)">
          <polygon points="60,18 64,60 60,56 56,60" fill="#C8A97E"/>
          <polygon points="60,102 64,60 60,64 56,60" fill="rgba(200,169,126,0.3)"/>
        </g>
        <text x="60" y="14" font-family="'Maison Neue Extended', Arial, sans-serif" font-size="8" fill="#C8A97E" text-anchor="middle" font-weight="700">N</text>
        <text x="60" y="114" font-family="'Maison Neue Extended', Arial, sans-serif" font-size="8" fill="#C8A97E" text-anchor="middle">S</text>
        <text x="114" y="63" font-family="'Maison Neue Extended', Arial, sans-serif" font-size="8" fill="#C8A97E" text-anchor="middle">E</text>
        <text x="6" y="63" font-family="'Maison Neue Extended', Arial, sans-serif" font-size="8" fill="#C8A97E" text-anchor="middle">W</text>
      </svg>
    `;
    locSection.style.position = 'relative';
    locSection.appendChild(compassWrap);

    // Rotate needle on scroll
    window.addEventListener(
      'scroll',
      () => {
        const needle = document.getElementById('compass-needle');
        if (needle) {
          const rot = 24 + window.scrollY * 0.08;
          needle.setAttribute('transform', `rotate(${rot} 60 60)`);
        }
      },
      { passive: true }
    );
  }
}
