const https = require('https');

function sendToTelegram(botToken, chatId, message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    https.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log("[✅] OTP sent to Telegram!");
        } else {
            console.log("[❌] Failed to send Telegram message:", res.statusCode);
        }
    }).on('error', (err) => {
        console.error("[ERR] Telegram Error:", err);
    });
}

module.exports = { sendToTelegram };