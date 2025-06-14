const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,  // यही path चलाता है lambda Chrome
    headless: chromium.headless,
    ignoreHTTPSErrors: true
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
