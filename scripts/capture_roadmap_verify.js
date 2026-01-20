import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const screenshotsDir = path.join(projectRoot, 'site/img/screenshots');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // 1. Mobile Viewport (iPhone 12 Pro)
        await page.setViewport({ width: 390, height: 844, isMobile: true });
        console.log('Capturing Index Page (Mobile - Roadmap Redesign)...');
        await page.goto('http://localhost:8080/site/index.html');
        // Scroll to roadmap to ensure it renders if lazy loaded (though standard HTML usually is fine)
        await page.screenshot({ path: path.join(screenshotsDir, 'index_mobile_roadmap.png'), fullPage: true });

        // 2. Desktop Viewport
        await page.setViewport({ width: 1440, height: 900 });
        console.log('Capturing Index Page (Desktop - Roadmap Redesign)...');
        await page.goto('http://localhost:8080/site/index.html');
        await page.screenshot({ path: path.join(screenshotsDir, 'index_desktop_roadmap.png'), fullPage: true });

        console.log('Screenshots captured in site/img/screenshots/');

    } catch (error) {
        console.error('Error capturing screenshots:', error);
    } finally {
        await browser.close();
    }
})();
