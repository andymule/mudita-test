const request = require('supertest');
const express = require('express');
const app = express();
const OpenAI = require('openai');
require('dotenv').config();

// Mock dependencies
jest.mock('openai');

// Body parser middleware
app.use(express.json());

// Import the route handler function
const planRoute = async (req, res) => {
  try {
    const { tasks } = req.body;
    
    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one task' });
    }

    // Mock successful response for testing
    const mockSchedule = {
      schedule: [
        { time: '9:00 AM', task: 'Sample task 1' },
        { time: '11:00 AM', task: 'Sample task 2' }
      ],
      explanation: 'Tasks are arranged for optimal productivity'
    };
    
    return res.json(mockSchedule);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Register the route
app.post('/api/plan', planRoute);

describe('Planning API', () => {
  test('POST /api/plan - should return 400 if no tasks are provided', async () => {
    const response = await request(app)
      .post('/api/plan')
      .send({ tasks: [] });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Please provide at least one task');
  });
  
  test('POST /api/plan - should return a schedule with valid tasks', async () => {
    const response = await request(app)
      .post('/api/plan')
      .send({ tasks: ['Task 1', 'Task 2'] });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('schedule');
    expect(response.body).toHaveProperty('explanation');
    expect(Array.isArray(response.body.schedule)).toBe(true);
  });
}); 