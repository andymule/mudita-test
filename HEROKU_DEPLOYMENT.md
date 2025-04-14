# Deploying Mudita to Heroku

This guide will walk you through deploying the Mudita day planner application to Heroku step by step.

## Prerequisites

1. A [Heroku account](https://signup.heroku.com/)
2. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
3. Git installed on your machine
4. Your OpenAI API key

## Deployment Steps

### 1. Log in to Heroku CLI

Open your terminal and log into Heroku:

```bash
heroku login
```

Follow the prompts to complete the login process.

### 2. Initialize Git Repository (if not already done)

If your project isn't already a git repository:

```bash
git init
git add .
git commit -m "Initial commit for Heroku deployment"
```

### 3. Create a Heroku App

```bash
heroku create mudita-planner
```

This creates a Heroku app with the name "mudita-planner". You can replace this with your preferred name or omit it to let Heroku generate a random name.

### 4. Set Environment Variables

Set your OpenAI API key as an environment variable:

```bash
heroku config:set OPENAI_API_KEY=your_openai_api_key_here
heroku config:set NODE_ENV=production
```

### 5. Deploy to Heroku

Push your code to Heroku:

```bash
git push heroku main
```

If your main branch is named differently (e.g., "master"), use:

```bash
git push heroku master
```

### 6. Open Your Application

Once the deployment is complete, open your application:

```bash
heroku open
```

### 7. Check Logs (if needed)

If you encounter issues, check the logs:

```bash
heroku logs --tail
```

## Updating Your Application

When you make changes to your application, commit them to git and push to Heroku:

```bash
git add .
git commit -m "Your update message"
git push heroku main
```

## Scaling Your Application

By default, Heroku deploys your application with 1 web dyno. You can manage your dynos using:

```bash
# Scale to 2 web dynos
heroku ps:scale web=2

# Scale down to 1 web dyno
heroku ps:scale web=1
```

## Troubleshooting

If you experience build failures:

1. Check Heroku logs: `heroku logs --tail`
2. Make sure all dependencies are in package.json
3. Verify your Node.js version in package.json matches what Heroku supports
4. Check that your Procfile is correctly set up with `web: node server/index.js`

If the application fails after startup:

1. Check if the OpenAI API key is correctly set: `heroku config:get OPENAI_API_KEY`
2. Ensure your API requests to OpenAI are properly formatted
3. Check for any rate limiting issues with the OpenAI API 