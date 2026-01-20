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

        // Mobile Viewport (iPhone 12 Pro)
        await page.setViewport({ width: 390, height: 844, isMobile: true });

        // Capture Contacts Page
        console.log('Capturing Contacts Page (Mobile - After)...');
        await page.goto('http://localhost:8080/site/contacts.html');
        await page.screenshot({ path: path.join(screenshotsDir, 'contacts_mobile_after.png'), fullPage: true });

        // Capture Index Page (for reference)
        console.log('Capturing Index Page (Mobile - After)...');
        await page.goto('http://localhost:8080/site/index.html');
        await page.screenshot({ path: path.join(screenshotsDir, 'index_mobile_after.png'), fullPage: true });

        console.log('Screenshots captured in site/img/screenshots/');

    } catch (error) {
        console.error('Error capturing screenshots:', error);
    } finally {
        await browser.close();
    }
})();
