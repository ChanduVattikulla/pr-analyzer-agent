---
name: analyze-pr
description: "Analyzes GitHub Pull Request diffs and identifies potential bugs, security issues, and code quality problems"
allowed-tools: Read Bash
---

# Analyze PR Skill

## Overview
This skill connects to GitHub using the Octokit library, fetches real Pull Request diffs, and analyzes code changes for bugs, security vulnerabilities, and quality issues.

## Implementation Details

### Prerequisites
- GitHub Personal Access Token (stored in .env)
- Repository owner and name
- Pull request number

### Process
1. Initialize Octokit with GitHub token from environment
2. Fetch the PR details from GitHub API
3. Get the list of files changed in the PR
4. For each file, get the diff (code changes)
5. Pass the diff to Claude for intelligent analysis
6. Compile results with: file, line number, issue type, severity, description

### Analysis Categories
- **Security:** SQL injection, XSS, hardcoded secrets, unvalidated input, exposed credentials
- **Bugs:** Logic errors, off-by-one errors, null pointer dereferences, race conditions
- **Quality:** Code readability, maintainability, naming conventions, code duplication
- **Performance:** N+1 queries, inefficient algorithms, memory leaks, unnecessary loops
- **Best Practices:** Following language conventions, proper error handling, test coverage

### Output Format
Returns a JSON structure:
```json
{
  "pr_number": 123,
  "repository": "owner/repo",
  "files_analyzed": 5,
  "issues": [
    {
      "file": "src/auth.js",
      "line": 45,
      "type": "Security",
      "severity": "Critical",
      "issue": "Password stored in plaintext",
      "why": "Passwords must never be stored unencrypted",
      "suggestion": "Use bcrypt or similar for password hashing"
    }
  ],
  "summary": "Found 3 critical security issues, 2 performance concerns"
}
```

### Error Handling
- If PR doesn't exist, return clear error message
- If repository isn't accessible, check GitHub token permissions
- If analysis fails, retry up to 2 times before reporting error