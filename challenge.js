require('dotenv').config();  // Load environment variables from .env

const axios = require('axios'); // import axios

const endpoint = 'https://flag-gilt.vercel.app/api/challenge';
const token = process.env.BEARER_TOKEN;  // Get the token from environment variables

async function followCursors() {
    let cursor = null; // Start with no cursor

    try {
        while (true) {
            const requestBody = cursor ? { cursor } : {}; // Use cursor if available

            const response = await axios.post(endpoint, requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            console.log(data.message); // Log the message to see the progress

            if (data.nextCursor) {
                // Update the cursor for the next request
                cursor = data.nextCursor;
            } else {
                // No more cursors, we've reached the end
                console.log('Challenge complete!');
                break;
            }
        }
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Start the process
followCursors();
