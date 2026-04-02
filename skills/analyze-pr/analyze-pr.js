import { Octokit } from "@octokit/rest";
import * as dotenv from "dotenv";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function analyzePR(owner, repo, prNumber) {
  try {
    console.log(`📊 Analyzing PR #${prNumber} in ${owner}/${repo}...`);

    // Fetch PR details
    const { data: prData } = await octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber
    });

    console.log(`✅ PR Title: ${prData.title}`);
    console.log(`✅ Author: ${prData.user.login}`);
    console.log(`✅ Files changed: ${prData.changed_files}`);

    // Get list of files changed
    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber
    });

    console.log(`\n🔍 Analyzing ${files.length} files...`);

    const analysisResults = {
      pr_number: prNumber,
      repository: `${owner}/${repo}`,
      pr_title: prData.title,
      pr_author: prData.user.login,
      files_analyzed: files.length,
      issues: [],
      files_details: []
    };

    // Analyze each file
    for (const file of files) {
      console.log(`  📄 Analyzing: ${file.filename}`);

      const fileAnalysis = {
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        patch: file.patch || "No patch available"
      };

      // Basic pattern-based analysis (before Claude integration)
      const issues = performBasicAnalysis(file.filename, file.patch || "");
      
      if (issues.length > 0) {
        analysisResults.issues.push(...issues);
        fileAnalysis.issues_found = issues.length;
      }

      analysisResults.files_details.push(fileAnalysis);
    }

    // Summary
    const criticalCount = analysisResults.issues.filter(i => i.severity === "Critical").length;
    const warningCount = analysisResults.issues.filter(i => i.severity === "Warning").length;
    const suggestionCount = analysisResults.issues.filter(i => i.severity === "Suggestion").length;

    analysisResults.summary = {
      total_issues: analysisResults.issues.length,
      critical: criticalCount,
      warnings: warningCount,
      suggestions: suggestionCount
    };

    console.log(`\n✨ Analysis complete!`);
    console.log(`   Critical: ${criticalCount} | Warnings: ${warningCount} | Suggestions: ${suggestionCount}`);

    return analysisResults;

  } catch (error) {
    console.error(`❌ Error analyzing PR: ${error.message}`);
    throw error;
  }
}

// Basic pattern-based security and quality checks
function performBasicAnalysis(filename, patch) {
  const issues = [];
  const lines = patch.split('\n');

  let lineNumber = 0;
  for (const line of lines) {
    if (line.startsWith('+')) {
      lineNumber++;

      // Security checks
      if (line.match(/password\s*=\s*['"][^'"]+['"]/i)) {
        issues.push({
          file: filename,
          line: lineNumber,
          type: "Security",
          severity: "Critical",
          issue: "Hardcoded password detected",
          why: "Passwords should never be hardcoded in source code",
          suggestion: "Use environment variables or a secrets manager"
        });
      }

      if (line.match(/api[_-]?key\s*=\s*['"][^'"]+['"]/i)) {
        issues.push({
          file: filename,
          line: lineNumber,
          type: "Security",
          severity: "Critical",
          issue: "Hardcoded API key detected",
          why: "API keys should never be committed to source code",
          suggestion: "Use environment variables or a secrets manager"
        });
      }

      if (line.match(/eval\s*\(|exec\s*\(|Function\s*\(/)) {
        issues.push({
          file: filename,
          line: lineNumber,
          type: "Security",
          severity: "Critical",
          issue: "Dangerous eval/exec detected",
          why: "eval and exec can execute arbitrary code and create security vulnerabilities",
          suggestion: "Use safer alternatives like JSON.parse or proper templating"
        });
      }

      // SQL injection patterns
      if (line.match(/query\s*\(\s*['"]\s*SELECT.*\$|query\s*\(\s*['"]\s*SELECT.*\+/i)) {
        issues.push({
          file: filename,
          line: lineNumber,
          type: "Security",
          severity: "Critical",
          issue: "Potential SQL injection vulnerability",
          why: "String concatenation in SQL queries allows injection attacks",
          suggestion: "Use parameterized queries or prepared statements"
        });
      }

      // XSS patterns
      if (line.match(/innerHTML\s*=|innerHTML\s*\+=/)) {
        issues.push({
          file: filename,
          line: lineNumber,
          type: "Security",
          severity: "Warning",
          issue: "innerHTML used (XSS risk)",
          why: "innerHTML can execute malicious scripts if used with untrusted data",
          suggestion: "Use textContent for text or sanitize HTML with a library like DOMPurify"
        });
      }

      // Quality checks
      if (line.length > 120) {
        issues.push({
          file: filename,
          line: lineNumber,
          type: "Quality",
          severity: "Suggestion",
          issue: "Line exceeds 120 characters",
          why: "Long lines reduce readability",
          suggestion: "Break line into multiple lines for better readability"
        });
      }

      // Performance checks
      if (filename.includes('.js') && line.match(/for\s*\(.*for\s*\(/)) {
        issues.push({
          file: filename,
          line: lineNumber,
          type: "Performance",
          severity: "Warning",
          issue: "Nested loops detected",
          why: "Nested loops can cause O(n²) complexity",
          suggestion: "Consider using Map/Set for lookups instead of nested loops"
        });
      }
    }
  }

  return issues;
}

// Test the function
if (import.meta.url === `file://${process.argv[1]}`) {
  const owner = process.argv[2] || "torvalds";
  const repo = process.argv[3] || "linux";
  const prNumber = process.argv[4] || 1;

  analyzePR(owner, repo, prNumber).then(results => {
    console.log("\n📋 Full Results:");
    console.log(JSON.stringify(results, null, 2));
  }).catch(err => {
    console.error("Analysis failed:", err.message);
  });
}