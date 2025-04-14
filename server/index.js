require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? './.env' : './.env' });
const express = require('express');
const path = require('path');
const OpenAI = require('openai');
const app = express();

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5001', 'https://mudita-test.herokuapp.com'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize OpenAI API 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Log environment for debugging
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? `${process.env.OPENAI_API_KEY.substring(0, 10)}...` : 'not set'
});

// API endpoint to get optimized schedule
app.post('/api/plan', async (req, res) => {
  console.log('Plan API called with tasks:', req.body);
  
  try {
    const { tasks } = req.body;
    
    if (!tasks || tasks.length === 0) {
      console.log('Error: No tasks provided');
      return res.status(400).json({ error: 'Please provide at least one task' });
    }

    const taskList = tasks.join(', ');
    console.log('Task list prepared:', taskList);
    
    // Define system guidance for the AI
    const systemGuidance = `You are an intelligent daily planner assistant that optimizes task scheduling. 
You analyze tasks and create the most efficient schedule based on:
1. Task dependencies and priorities
2. Logical grouping of similar activities
3. Optimal time allocation throughout the day
4. Energy level considerations for different types of tasks

Return a visually engaging, well-organized schedule with a brief, insightful explanation.`;

    // Define response format guidance
    const responseFormat = `{
  "schedule": [
    {
      "time": "HH:MM AM/PM format",
      "task": "Task description"
    }
  ],
  "explanation": "A concise 2-3 sentence explanation of why this schedule ordering makes sense"
}`;

    console.log('Making OpenAI API request...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `${systemGuidance}\n\nReturn JSON in the following format:\n${responseFormat}`
        },
        { 
          role: "user", 
          content: `Plan my day optimally with these tasks: ${taskList}. Group related tasks, consider natural breaks, and create a logical flow. Return ONLY a JSON response with a schedule array and brief explanation.` 
        }
      ],
      response_format: { type: "json_object" }
    });

    console.log('OpenAI API response received');
    const result = JSON.parse(completion.choices[0].message.content);
    console.log('Parsed result:', JSON.stringify(result).substring(0, 200) + '...');
    return res.json(result);
  } catch (error) {
    console.error('Plan API error:', error);
    return res.status(500).json({ 
      error: 'Server error', 
      details: error.message
    });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
} else {
  // In development, serve the public directory for static files
  app.use(express.static(path.join(__dirname, '../client/public')));
}

// Get port from environment and store in Express
const PORT = parseInt(process.env.PORT || '5001');
app.set('port', PORT);

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/plan`);
});

// Handle errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
}); 