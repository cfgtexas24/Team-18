// pages/api/chatgpt.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
  
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }
  
    // Log the message that will be sent to the OpenAI API
    console.log('Message to OpenAI:', message);
  
    try {
      // Start by logging the request we're sending
      console.log('Sending request to OpenAI API with key:', process.env.OPENAI_API_KEY);
  
      // Send request to OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  // Securely accessing API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',  // or 'gpt-4' if using GPT-4
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: message },
          ],
        }),
      });
  
      // Log the status and headers of the response
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      const data = await response.json();  // Parse the response
  
      // Log the entire response for debugging
      console.log('OpenAI API Response Data:', data);
  
      if (!response.ok) {
        // Log specific errors from OpenAI if available
        console.error('OpenAI API returned an error:', data);
        return res.status(response.status).json({ error: data });
      }
  
      // Return the AI's reply to the client
      res.status(200).json({ reply: data.choices[0].message.content });
  
    } catch (error) {
      // Log full error details including error stack for debugging
      console.error('Error occurred during fetch:', error.stack);
      res.status(500).json({ error: 'No HIPPA Approved API key found', details: error.message });
    }
  }
  