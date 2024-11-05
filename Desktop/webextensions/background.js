chrome.alarms.onAlarm.addListener(async (alarm) => {
    console.log(`Alarm "${alarm.name}" triggered at: ${new Date().toLocaleString()}`);
    
    if (alarm.name === 'sendScheduledMessage') {
        sendScheduledMessage();
    } else if (alarm.name === 'shortAlarm') {
        const { shortDelay } = await chrome.storage.local.get('shortDelay');
        if (shortDelay && shortDelay > 0) {
            console.log(`Short delay alarm triggered. Waiting for remaining ${shortDelay}ms`);
            setTimeout(async () => {
                await sendScheduledMessage();
            }, shortDelay);
        }
    }
});

async function sendScheduledMessage() {
    const { messageData } = await chrome.storage.local.get('messageData');

    if (messageData) {
        const { recipient, message } = messageData;

        // Log before sending the message
        console.log('Preparing to send scheduled message:', messageData);

        // Send the request to the backend
        try {
            const response = await fetch('http://localhost:3000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: recipient,
                    message: message
                }),
            });

            const result = await response.json();
            if (result.status === 'Message sent successfully!') {
                console.log('Scheduled message sent successfully!');
            } else {
                console.log(`Failed to send scheduled message: ${result.status}`);
            }
        } catch (error) {
            console.error('Error sending scheduled message:', error);
        }

        // Clear the storage after sending the message
        await chrome.storage.local.remove('messageData');
        await chrome.storage.local.remove('shortDelay'); // Remove the short delay value
    } else {
        console.log("No messageData found in storage.");
    }
});
