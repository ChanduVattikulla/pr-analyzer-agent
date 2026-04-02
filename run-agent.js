import { analyzePR } from './skills/analyze-pr/analyze-pr.js';
import { generateReview } from './skills/generate-review/generate-review.js';
import { commitSuggestions } from './skills/commit-suggestions/commit-suggestions.js';
import * as dotenv from 'dotenv';

dotenv.config();

async function runAgent(owner, repo, prNumber) {
  console.log('\n🤖 === PR ANALYZER AGENT ACTIVATED ===\n');
  console.log(`📦 Target: ${owner}/${repo} | PR #${prNumber}\n`);

  try {
    // Step 1: Analyze PR
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('STEP 1: Analyzing Pull Request');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const analysisResults = await analyzePR(owner, repo, prNumber);

    // Step 2: Generate Review
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('STEP 2: Generating Code Review');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const reviewResult = await generateReview(analysisResults);

    // Step 3: Commit Suggestions
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('STEP 3: Committing Suggestions to Git');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    const commitResult = await commitSuggestions(analysisResults, reviewResult.review);

    // Final Summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ AGENT EXECUTION COMPLETE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n📊 Summary:
  Repository: ${analysisResults.repository}
  PR Number: ${analysisResults.pr_number}
  Files Analyzed: ${analysisResults.files_analyzed}
  Total Issues: ${analysisResults.summary.total_issues}
  Critical: ${analysisResults.summary.critical} | Warnings: ${analysisResults.summary.warnings} | Suggestions: ${analysisResults.summary.suggestions}
  Review Generated: ✅
  Suggestions Committed: ✅
  
💾 Suggestions File: ${commitResult.file}
🔗 Ready for: GitHub Integration, Lyzr Deployment\n`);

    return {
      analysis: analysisResults,
      review: reviewResult,
      commit: commitResult
    };

  } catch (error) {
    console.error('\n❌ AGENT FAILED:', error.message);
    process.exit(1);
  }
}

// Get arguments from command line
const owner = process.argv[2] || 'nodejs';
const repo = process.argv[3] || 'node';
const prNumber = process.argv[4] || 50000;

runAgent(owner, repo, prNumber).then(result => {
  console.log('🎉 Agent workflow completed successfully!');
}).catch(err => {
  console.error('Fatal error:', err);
});