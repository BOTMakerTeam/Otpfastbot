const puppeteer = require('puppeteer');
const fs = require('fs');
const { extractSMS } = require('./forwarder');
const config = require('./config');

(async () => {
    console.log("[*] Launching system Chromium...");

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));
    await page.setCookie(...cookies);

    await page.goto(config.OTP_URL, { waitUntil: 'networkidle2' });
    console.log("[✅] Logged in using cookies!");

    console.log("[*] Starting OTP Monitoring...");
    while (true) {
        try {
            await extractSMS(page);
            await page.waitForTimeout(3000);
        } catch (err) {
            console.error("[ERR]", err);
            await page.waitForTimeout(5000);
        }
    }
})();
