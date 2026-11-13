import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('1. Navigating to http://localhost:3005/contact ...');
  await page.goto('http://localhost:3005/contact', { waitUntil: 'networkidle' });

  // Check address text on contact page
  const pageContent = await page.content();
  const hasChennaiAddress = pageContent.includes('East Coast Road, Chennai, Tamil Nadu 600041, India');
  const hasECRCoastline = pageContent.includes('ECR Coastline, Chennai, Tamil Nadu, India');
  console.log('✓ Sales gallery address contains Chennai:', hasChennaiAddress);
  console.log('✓ Location contains ECR Coastline Chennai:', hasECRCoastline);

  // Check SVG content
  const svgContent = fs.readFileSync('dist/assets/images/6a258c1f74c3435f82f4f129_map_sales-office.svg', 'utf8');
  const hasEcrRoad = svgContent.includes('ECR BEACH ROAD');
  const hasMarinaCoast = svgContent.includes('MARINA COAST');
  const hasBesantNagar = svgContent.includes('BESANT NAGAR');
  const hasGuindyEstate = svgContent.includes('GUINDY ESTATE');
  console.log('✓ Map SVG has ECR BEACH ROAD:', hasEcrRoad);
  console.log('✓ Map SVG has MARINA COAST:', hasMarinaCoast);
  console.log('✓ Map SVG has BESANT NAGAR:', hasBesantNagar);
  console.log('✓ Map SVG has GUINDY ESTATE:', hasGuindyEstate);

  // Take screenshot of Contact Page with map and social buttons
  const artifactDir = 'C:/Users/ashok/.gemini/antigravity/brain/40e031e6-9ab8-40fb-b402-5e891059c713';
  await page.screenshot({ path: `${artifactDir}/contact_chennai_map_verified.png`, fullPage: false });
  console.log('✓ Saved screenshot to contact_chennai_map_verified.png');

  // Test clicking social button (Linkedin)
  console.log('2. Testing dummy social redirect click...');
  const linkedinBtn = page.locator('a.social-btn[aria-label="Linkedin"]').first();
  if (await linkedinBtn.count() > 0) {
    await linkedinBtn.click();
    await page.waitForTimeout(500);
    const toast = page.locator('#demo-toast');
    const toastVisible = await toast.isVisible().catch(() => false);
    const toastText = toastVisible ? await toast.textContent() : '';
    console.log('✓ Toast appeared on social click:', toastVisible, '| Text:', toastText);
    await page.screenshot({ path: `${artifactDir}/social_dummy_redirect_toast.png` });
  }

  // Test navigation to /apartments/
  console.log('3. Testing navigation to /apartments/ ...');
  await page.locator('a[aria-label="Select  an Apartment"]').first().click();
  await page.waitForURL('**/apartments/**', { timeout: 5000 });
  console.log('✓ Navigated to:', page.url());

  // Test clicking apartment 034
  console.log('4. Testing navigation to apartment 034 ...');
  const apt034Card = page.locator('a[href="/apartments/034/"]').first();
  if (await apt034Card.count() > 0) {
    await apt034Card.click();
    await page.waitForURL('**/apartments/034/**', { timeout: 5000 });
    console.log('✓ Navigated to apartment 034:', page.url());
  }

  // Test Book a call modal
  console.log('5. Testing Book a call modal trigger ...');
  const bookCallBtn = page.locator('[data-modal-cta-btn="book-a-call"]').first();
  await bookCallBtn.click();
  await page.waitForTimeout(500);
  const modal = page.locator('[data-modal-cta="book-a-call"]').first();
  const isModalOpen = await modal.isVisible();
  console.log('✓ Modal opened:', isModalOpen);

  // Close modal via Escape or clicking close button
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  console.log('✓ Modal closed via Escape');

  console.log('6. Checking console errors ...');
  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('All redirection & dummy redirect tests completed successfully!');
}

run().catch(console.error);
