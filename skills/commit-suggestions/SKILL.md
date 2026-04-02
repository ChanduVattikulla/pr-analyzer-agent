---
name: commit-suggestions
description: "Commits code review suggestions to the repository with clear commit messages and audit trail"
allowed-tools: Write Bash
---

# Commit Suggestions Skill

## Overview
This skill creates a detailed suggestions file and commits it to Git with a descriptive commit message, creating a permanent audit trail of the code review.

## How It Works
1. Creates a `suggestions/` directory if it doesn't exist
2. Generates a markdown file with all analysis results and review
3. Stages and commits the file to Git
4. Creates a commit message with PR number, issues found, and timestamp

## File Structure
```
suggestions/
├── pr-suggestions-123-2026-04-01T22-30-45.md
├── pr-suggestions-456-2026-04-01T23-15-20.md
└── ...
```

## Commit Message Format
```
chore: code-review suggestions for PR #123

Repository: owner/repo
Issues Found: 5 (Critical: 2, Warnings: 2)
Files Analyzed: 8

Reviewed by: pr-analyzer-agent
Timestamp: 2026-04-01T22:30:45Z
```

## Benefits
- **Audit Trail:** Every review is permanently recorded
- **History:** Can see evolution of code quality over time
- **Reference:** Can reference specific reviews in discussions
- **Transparency:** Shows all decisions and reasoning
- **Learning:** Team can learn from past reviews