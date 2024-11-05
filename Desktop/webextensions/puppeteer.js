const puppeteer = require('puppeteer');

async function sendInstagramMessage({ recipient, message }) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/accounts/login/');

    // Login automation
    await page.type('input[name="username"]', 'maurya___satyam123');
    await page.type('input[name="password"]', 'satyam@123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Navigate to DMs
    await page.goto(`https://www.instagram.com/direct/t/${recipient}/`);

    // Type and send message
    await page.type('textarea', message);
    await page.click('button[type="submit"]');

    await browser.close();
}

// Example call
const messageData = { recipient: 'instagram-username', message: 'Happy Birthday!' };
sendInstagramMessage(messageData);
