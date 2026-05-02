// import express from 'express';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ 
//   model: 'gemini-2.5-flash',
//   generationConfig: {
//     temperature: 2.0,    // Creative responses
//     maxOutputTokens: 500 // Max words limit
//   }
// });

// const response = await model.generateContent('Hello, how are you?');

// // Token count dekho
// const usage = response.response.usageMetadata;
// console.log('Input tokens:', usage.promptTokenCount);
// console.log('Output tokens:', usage.candidatesTokenCount);
// console.log('Total tokens:', usage.totalTokenCount);

// app.post('/api/question-answer', async (req, res) => {
//   try {
//     const { question } = req.body;

//     if (!question) {
//       return res.status(400).json({
//         error: 'Question is required'
//       });
//     }

//     const response = await model.generateContent(question);
//     const answer = response.response.text();

//     res.json({
//       success: true,
//       question: question,
//       answer: answer
//     });

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       error: 'Failed to generate answer',
//       message: error.message
//     });
//   }
// });

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok', message: 'Server is running' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
//   console.log(`Question-Answer API: POST http://localhost:${PORT}/api/question-answer`);
// });






// grock

import express from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Token test
const tokenTest = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [{ role: 'user', content: 'Hello, how are you?' }]
});

console.log('Input tokens:', tokenTest.usage.prompt_tokens);
console.log('Output tokens:', tokenTest.usage.completion_tokens);
console.log('Total tokens:', tokenTest.usage.total_tokens);

app.post('/api/question-answer', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        error: 'Question is required'
      });
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: question }],
      temperature: 0.7,
      max_tokens: 500
    });

    const answer = response.choices[0].message.content;

    res.json({
      success: true,
      question: question,
      answer: answer,
      tokens: response.usage
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to generate answer',
      message: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Question-Answer API: POST http://localhost:${PORT}/api/question-answer`);
});