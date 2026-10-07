import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUTPUT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\b4103042-9608-4f40-a499-317bee543efb\\scratch\\qa_screens";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runQA() {
  console.log("Starting Edge for Visual QA...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  
  const consoleMessages = [];
  page.on("console", (msg) => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  page.on("pageerror", (err) => {
    consoleMessages.push({ type: "pageerror", text: err.toString() });
  });

  // 1. Capture Desktop Preloader
  await page.setViewport({ width: 1440, height: 900 });
  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

  await page.screenshot({ path: path.join(OUTPUT_DIR, "01-desktop-initial.png") });
  console.log("Captured initial screen");

  // 2. Wait for Preloader animation to complete (approx 4s)
  await new Promise((r) => setTimeout(r, 4500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "02-desktop-hero.png") });
  console.log("Captured desktop hero after preloader");

  // 3. Scroll to Story
  await page.evaluate(() => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "03-desktop-story.png") });
  console.log("Captured desktop story");

  // 4. Scroll to Rituals
  await page.evaluate(() => {
    document.getElementById("rituals")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "04-desktop-rituals.png") });
  console.log("Captured desktop rituals");

  // 5. Scroll to Philosophy
  await page.evaluate(() => {
    document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "05-desktop-philosophy.png") });
  console.log("Captured desktop philosophy");

  // 6. Scroll to Sanctuary
  await page.evaluate(() => {
    document.getElementById("sanctuary")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "06-desktop-sanctuary.png") });
  console.log("Captured desktop sanctuary");

  // 7. Scroll to CTA & Footer
  await page.evaluate(() => {
    document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "07-desktop-cta.png") });
  
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "08-desktop-footer.png") });
  console.log("Captured desktop footer");

  // 8. Test Mobile Viewport (iPhone 14: 390 x 844)
  console.log("Switching to mobile viewport (390 x 844)...");
  await page.setViewport({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle0" });
  
  // Wait for preloader on mobile
  await new Promise((r) => setTimeout(r, 4500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "09-mobile-hero.png") });
  console.log("Captured mobile hero");

  // Check for horizontal overflow on mobile
  const overflowCheck = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const viewWidth = window.innerWidth;
    return {
      docWidth,
      viewWidth,
      hasHorizontalOverflow: docWidth > viewWidth,
    };
  });
  console.log("Mobile overflow check:", JSON.stringify(overflowCheck));

  // Mobile Story & Products
  await page.evaluate(() => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "10-mobile-story.png") });

  await page.evaluate(() => {
    document.getElementById("rituals")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "11-mobile-rituals.png") });

  // Mobile Sanctuary
  await page.evaluate(() => {
    document.getElementById("sanctuary")?.scrollIntoView({ behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "12-mobile-sanctuary.png") });

  // Mobile Menu Click
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Open Navigation Menu"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "13-mobile-drawer.png") });
  console.log("Captured mobile drawer");

  await browser.close();

  // Save log report
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "console_report.json"),
    JSON.stringify({ consoleMessages, overflowCheck }, null, 2)
  );

  console.log("QA script finished successfully!");
}

runQA().catch((err) => {
  console.error("QA error:", err);
  process.exit(1);
});
