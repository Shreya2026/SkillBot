"use client"
import {
  GoogleGenerativeAI,
} from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
console.log('🔑 Gemini API Key loaded:', apiKey ? `${apiKey.substring(0, 10)}...` : 'MISSING');
const genAI = new GoogleGenerativeAI(apiKey);

const model=genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
};

// Utility function to handle API calls with retry logic
export const sendMessageWithRetry = async (chatSession, prompt, maxRetries = 3) => {
    let lastError;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const result = await chatSession.sendMessage(prompt);
            return result;
        } catch (error) {
            lastError = error;
            
            // Check if it's a quota/rate limit error
            if (error.message && error.message.includes('429')) {
                // Extract retry delay from error message if available
                const retryMatch = error.message.match(/retry in (\d+(?:\.\d+)?)/i);
                const retryDelay = retryMatch 
                    ? parseFloat(retryMatch[1]) * 1000 
                    : Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s
                
                console.log(`Rate limit hit. Retrying in ${retryDelay/1000}s... (Attempt ${attempt + 1}/${maxRetries})`);
                
                if (attempt < maxRetries - 1) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    continue;
                } else {
                    throw new Error('API quota exceeded. Please try again later or upgrade your plan.');
                }
            }
            
            // For other errors, don't retry
            throw error;
        }
    }
    
    throw lastError;
};

export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate A Course Tutorial on Following Detail with field as Course Name, Description, Along with Chapter Name, about, Duration"
                }
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: "```json\n{\n  \"Course Name\": \"...\",\n  \"Description\": \"...\",\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"...\",\n      \"About\": \"...\",\n      \"Duration\": \"2 hours\"\n    },\n    {\n      \"Chapter Name\": \"...\",\n      \"About\": \"...\",\n      \"Duration\": \"3 hours\"\n    }\n  ]\n}\n```"
                }
            ],
        },
    ],
});

export const GenerateChapterContent_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "\nExplain the concept in Detail on Topic: Python Basic, chapter: Introduction to Python in JSON Format with list of array with fields as title, description in detail, Code Example (code field in <precode> format) if applicable"
                }
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: "```json\n{\n  \"title\": \"Introduction to Python\",\n  \"description\": \"Python is a high-level, interpreted programming language known for its readability and versatility.\",\n  \"code\": \"<precode>print('Hello, World!')</precode>\"\n}\n```"
                }
            ],
        }
    ]
});
