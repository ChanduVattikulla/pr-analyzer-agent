# Deploy Your Agent to Lyzr Studio 🚀

## What is Lyzr Studio?

Lyzr Studio is a platform where your agent can run in the cloud without you managing servers. Your friends can use it without installing anything!

## Step-by-Step Deployment

### Step 1: Go to Lyzr Studio
Visit: https://studio.lyzr.ai/

### Step 2: Sign Up / Login
Create account with GitHub or email

### Step 3: Create New Agent
- Click "Create Agent"
- Select "Import from GitHub"
- Paste your repo URL: `https://github.com/ChanduVattikulla/pr-analyzer-agent.git`

### Step 4: Configure
- **Agent Name:** PR Analyzer Agent
- **Description:** Analyzes GitHub PRs and generates reviews
- **Model:** Claude Sonnet

### Step 5: Set Environment Variables
Add your secrets:
```
GITHUB_TOKEN=your_github_token
LYZR_API_KEY=your_lyzr_key
GITHUB_USERNAME=your_username
```

### Step 6: Deploy
Click "Deploy" and wait for green checkmark

### Step 7: Share with Friends
Copy the agent link and share: `https://studio.lyzr.ai/agents/your-agent-id`

## Using the Deployed Agent

Your friends can:
1. Go to the link
2. Input: `owner/repo pr_number`
3. Click "Analyze"
4. Get instant code review!

No installation needed! 🎉