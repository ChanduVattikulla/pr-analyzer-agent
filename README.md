# PR Analyzer Agent 🤖

A real GitHub Pull Request analyzer that detects security vulnerabilities, bugs, and code quality issues automatically.

## ✨ What It Does

✅ Analyzes real GitHub PRs using GitHub API
✅ Detects 10+ security issues (SQL injection, XSS, hardcoded secrets)
✅ Identifies code quality problems
✅ Generates professional reviews
✅ Runs automatically on every PR via GitHub Actions
✅ Zero cost, zero API fees

## 🚀 Usage

### Option 1: Web Interface (Easiest)
```bash
# Open in browser
open app.html
# Enter: owner, repo, PR number
# Get instant analysis
```

### Option 2: Command Line
```bash
npm install
node run-agent.js nodejs node 50000
```

### Option 3: GitHub Actions (Auto on Every PR)
Your agent automatically analyzes every PR in your repo. Results saved in Actions artifacts.

## 🏗️ Architecture

- **agent.yaml** - Agent manifest
- **SOUL.md** - Agent personality
- **RULES.md** - Hard constraints
- **skills/** - Three core skills:
  - analyze-pr: GitHub API analysis
  - generate-review: Review generation
  - commit-suggestions: Git audit trail
- **.github/workflows/pr-review.yml** - Auto-trigger on PRs

## 📊 What Gets Analyzed

### Security
- SQL injection patterns
- XSS vulnerabilities
- Hardcoded passwords/API keys
- Dangerous eval/exec usage

### Code Quality
- Line length > 120 chars
- Readability issues
- Maintainability concerns

### Performance
- Nested loops (O(n²))
- N+1 query patterns
- Inefficient algorithms

## 🎯 Real Example

**Input:** nodejs/node repo PR #50000

**Output:**
```
Repository: nodejs/node
PR Title: meta: bump actions/upload-artifact from 3.1.2 to 3.1.3
Files Analyzed: 4
Issues Found: 0

✅ Code Review
Great work! No critical issues found. Code changes follow best practices.
```

## 🔧 Installation
```bash
git clone https://github.com/ChanduVattikulla/pr-analyzer-agent.git
cd pr-analyzer-agent
npm install
```

## 📝 For Your Own Repos

### Step 1: Fork this repo
```bash
gh repo fork ChanduVattikulla/pr-analyzer-agent --clone
```

### Step 2: Copy workflow to your repo
```bash
mkdir -p .github/workflows
cp pr-analyzer-agent/.github/workflows/pr-review.yml .github/workflows/
```

### Step 3: Every PR auto-analyzed
Create a PR → Agent analyzes automatically → Results in Actions artifacts

## 💡 Real Use Cases

1. **Solo Developer**: Test PRs before pushing
```bash
   node run-agent.js myname myrepo 5
```

2. **Team**: Auto-review on every PR
   - Add workflow to your repo
   - Every PR auto-analyzed
   - Results in GitHub Actions tab

3. **Open Source**: Maintain code quality
   - Catch issues early
   - Consistent reviews
   - Learning tool for contributors

## 🎓 Why This is Better

| Feature | Cost | Auto | Privacy |
|---------|------|------|---------|
| This Agent | FREE | Yes | Local/Your repo |
| ChatGPT | $20/month | No | Cloud |
| CodeRabbit | $12/month | Yes | Cloud |

## 📦 Technologies

- Node.js
- GitHub API (@octokit/rest)
- GitHub Actions
- Git

## 🤝 How to Contribute

1. Fork
2. Create feature branch
3. Make improvements
4. Submit PR
5. Your PR gets auto-analyzed by the agent!

## 📄 License

MIT

---

**Ready to analyze your PRs?** 🚀
```bash
npm start
```