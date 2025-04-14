# Mudita - Daily Task Planner

Mudita is a web application that helps you plan your day optimally using AI. It works on both web and mobile screens, automatically adjusting for any screen size.

## Features

- Input your daily tasks
- AI-powered schedule optimization with visual time-based cards
- Responsive design that works on any device
- Brief explanations of scheduling decisions with color coding by time of day

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Material-UI
- **AI Integration**: OpenAI API
- **Deployment**: Heroku

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- NPM or Yarn
- OpenAI API key (from [OpenAI Platform](https://platform.openai.com/))

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mudita.git
   cd mudita
   ```

2. Install dependencies:
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   This will start both the backend server and the React development server.

5. Open your browser and navigate to `http://localhost:3000`

## How It Works

1. Enter your tasks for the day
2. The application sends these tasks to the OpenAI API
3. The AI analyzes the tasks and creates an optimal schedule
4. The schedule is displayed with beautiful time-based cards
5. A brief explanation is provided on why tasks are ordered in this way

## Deployment

The application is configured for deployment on Heroku:

1. Create a new Heroku app:
   ```
   heroku create
   ```

2. Set environment variables:
   ```
   heroku config:set OPENAI_API_KEY=your_openai_api_key
   heroku config:set NODE_ENV=production
   ```

3. Deploy to Heroku:
   ```
   git push heroku main
   ```

## Security Notes

- The `.env` file containing your OpenAI API key is excluded from git via `.gitignore`
- Never commit your API keys or sensitive data to version control
- For production, always use environment variables for sensitive information

## License

MIT 