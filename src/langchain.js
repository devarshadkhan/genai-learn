// // import { ChatGroq } from '@langchain/groq';
// // import dotenv from 'dotenv';
// // dotenv.config();

// // const model = new ChatGroq({
// //   apiKey: process.env.GROQ_API_KEY,
// //   model: 'llama-3.3-70b-versatile',
// //   temperature: 0.7
// // });

// // const response = await model.invoke(
// //   'Mujhe LangChain ke baare mein batao! isko hinghlish me batana ok short me batao'
// // );

// // console.log(response.content);






// import { ChatGroq } from '@langchain/groq';
// import { PromptTemplate } from '@langchain/core/prompts';
// import dotenv from 'dotenv';
// dotenv.config();

// const model = new ChatGroq({
//   apiKey: process.env.GROQ_API_KEY,
//   model: 'llama-3.3-70b-versatile',
//   temperature: 0.7
// });

// // Step 1 — Title banao
// const titlePrompt = PromptTemplate.fromTemplate(
//   'Is topic ka ek catchy title banao hinghlish me: {topic}'
// );

// // Step 2 — Blog likho
// const blogPrompt = PromptTemplate.fromTemplate(
//   'Is title pe ek short blog likho hinghlish me: {title}'
// );

// // Chain banao
// const titleChain = titlePrompt.pipe(model);
// const blogChain = blogPrompt.pipe(model);

// // Run karo
// const topic = 'Artificial Intelligence';

// const titleResult = await titleChain.invoke({ topic });
// console.log('Title:', titleResult.content);

// const blogResult = await blogChain.invoke({ 
//   title: titleResult.content 
// });
// console.log('Blog:', blogResult.content);

import { ChatGroq } from '@langchain/groq';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import dotenv from 'dotenv';
dotenv.config();

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7
});

// Memory — khud banaya!
const history = [];

async function chat(message) {
  // User message add karo
  history.push(new HumanMessage(message));

  // Model ko poori history bhejo
  const response = await model.invoke(history);

  // AI jawab bhi save karo
  history.push(new AIMessage(response.content));

  return response.content;
}

// Test karo
const res1 = await chat('Mera naam Arshad hai aur main MERN developer hoon!');
console.log('AI:', res1);

const res2 = await chat('Mera kya naam hai aur main kya karta hoon?');
console.log('AI:', res2);

console.log('Chat History:', history);