document.getElementById('sendForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from submitting the default way

    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;
    const scheduleTime = document.getElementById('scheduleTime').value;

    if (scheduleTime) {
        const scheduleTimestamp = new Date(scheduleTime).getTime(); // Convert schedule time to a timestamp
        const currentTime = Date.now();
        const delayInMs = scheduleTimestamp - currentTime; // Delay in milliseconds

        if (delayInMs > 0) {
            // Store the message data in local storage
            const messageData = {
                recipient: recipient,
                message: message,
                scheduleTime: scheduleTimestamp
            };
            await chrome.storage.local.set({ messageData });

            // Start countdown timer in console
            startCountdown(delayInMs, recipient, message);

            // Set alarm for the scheduled time
            const delayInMinutes = delayInMs / 60000; // Convert milliseconds to minutes
            chrome.alarms.create('sendScheduledMessage', { delayInMinutes });
            console.log(`Alarm set for ${new Date(scheduleTimestamp).toLocaleString()} (delay: ${delayInMs}ms)`);
            alert('Message scheduled successfully!');
        } else {
            alert('Scheduled time must be in the future.');
        }
    } else {
        // Send the message immediately if no schedule time is provided
        sendMessage(recipient, message);
    }
});

function startCountdown(delayInMs, recipient, message) {
    let countdown = Math.floor(delayInMs / 1000); // Convert milliseconds to seconds

    const intervalId = setInterval(() => {
        if (countdown <= 0) {
            clearInterval(intervalId);
            console.log("Time's up! Sending message...");
            sendMessage(recipient, message);
        } else {
            const minutes = Math.floor(countdown / 60);
            const seconds = countdown % 60;
            console.log(`Time remaining: ${minutes}m ${seconds}s`);
            countdown--;
        }
    }, 1000);
}

async function sendMessage(recipient, message) {
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
            alert('Message sent successfully!');
        } else {
            alert(`Failed to send message: ${result.status}`);
        }
    } catch (error) {
        alert('Error sending message: ' + error.message);
    }
}
