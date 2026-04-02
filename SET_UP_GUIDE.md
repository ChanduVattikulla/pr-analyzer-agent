# Setup for Your Friends 👥

Your PR Analyzer Agent is ready to use! Here are different ways your friends can use it:

---

## **Option 1: Use the Web Interface (EASIEST)**

No installation needed!

1. **Go to:** `app.html` in this repo (open in browser)
2. **Enter:**
   - Repository owner (e.g., `nodejs`)
   - Repository name (e.g., `node`)
   - PR number (e.g., `50000`)
3. **Click:** "Analyze PR"
4. **Get:** Instant code review! ✨

---

## **Option 2: Use Lyzr Studio (Cloud - NO SETUP)**

Your friends don't need to install ANYTHING!

1. **Go to:** https://studio.lyzr.ai/agents/your-agent-id
2. **Input:** `owner repo pr_number`
3. **Click:** Analyze
4. **Done!** ✅

See `LYZR_DEPLOYMENT.md` for setup.

---

## **Option 3: Local Installation (For Developers)**

If your friend wants to run it locally:
```bash
# 1. Clone
git clone https://github.com/ChanduVattikulla/pr-analyzer-agent.git
cd pr-analyzer-agent

# 2. Install
npm install

# 3. Setup
cp .env.example .env
# Add GITHUB_TOKEN if needed

# 4. Analyze any PR
npm start
# Or specific repo:
node run-agent.js owner repo 123
```

---

## **Option 4: GitHub Actions (Auto on Every PR)**

Your friend adds this to their repo:

**In their repo, create `.github/workflows/pr-review.yml`:**
```yaml
name: PR Analyzer Agent
on: [pull_request]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm start
```

Now every PR gets auto-reviewed! 🚀

---

## **Which Option for Which Friend?**

| Friend Type | Best Option |
|-------------|------------|
| Non-technical | Lyzr Studio (no setup) |
| Developer | GitHub Actions (auto) |
| Developer wanting offline | Local installation |
| Casual tester | Web interface |

---

## **For Your Personal Projects**

Use **GitHub Actions** in all your repos - every PR gets instant auto-review!