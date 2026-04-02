---
name: generate-review
description: "Generates a comprehensive, constructive code review comment based on analysis results using Claude AI"
allowed-tools: Write
---

# Generate Review Skill

## Overview
This skill takes analysis results from the analyze-pr skill and uses Claude AI to generate a professional, constructive GitHub PR review that's ready to post as a comment.

## How It Works
1. Receives structured analysis data (issues, severity levels, files)
2. Sends to Claude API with a prompt for professional review generation
3. Claude generates a human-like, constructive review
4. Returns markdown-formatted review ready for GitHub

## Review Characteristics
- Professional and encouraging tone
- Organized by severity (Critical → Warnings → Suggestions)
- Explains WHY issues matter (educational)
- Provides concrete suggestions with examples
- Includes positive observations
- Uses markdown for readability
- Actionable and specific

## Output Format
```markdown
## Code Review Summary
[Generated review with issues, explanations, and suggestions]
```

## Integration
Works seamlessly with:
- `analyze-pr`: Takes its output as input
- `commit-suggestions`: Review can link to committed suggestions