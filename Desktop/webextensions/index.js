const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
    const { username, message } = req.body;

    console.log("Process started..."); 

    // Instagram credentials
    const instagramUsername = 'maurya___satyam123';
    const instagramPassword = 'satyam@123';

    try {
        // Launch Puppeteer
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Navigate to Instagram login page
        await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

        // Wait for username and password fields
        await page.waitForSelector('input[name="username"]', { visible: true, timeout: 10000 });
        await page.type('input[name="username"]', instagramUsername, { delay: 100 });
        await page.waitForSelector('input[name="password"]', { visible: true, timeout: 10000 });
        await page.type('input[name="password"]', instagramPassword, { delay: 100 });

        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Handle pop-ups after login
        try {
            await page.waitForSelector('button[type="button"]', { visible: true, timeout: 5000 });
            const buttons = await page.$$('button[type="button"]');
            for (const button of buttons) {
                const buttonText = await button.evaluate(el => el.textContent);
                if (buttonText === 'Not Now' || buttonText === 'Save Info') {
                    await button.click();
                }
            }
        } catch (err) {
            console.log('No pop-ups detected after login.');
        }

        // Navigate to the recipient's direct message URL
        await page.goto(`https://www.instagram.com/direct/t/${username}/`, { waitUntil: 'networkidle2' });

        // Wait for the message input div to appear with increased timeout
        const messageInputSelector = "div[aria-label='Message']";
        await page.waitForSelector(messageInputSelector, { visible: true, timeout: 15000 });

        // Type the message into the input field
        await page.type(messageInputSelector, message, { delay: 100 });

        // Simulate pressing "Enter" to send the message
        await page.keyboard.press('Enter');

        // Add a delay before closing the browser
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Close the browser after sending the message
        await browser.close();

        // Send response back to the client
        res.json({ status: 'Message sent successfully!' });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ status: 'Error sending message', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
