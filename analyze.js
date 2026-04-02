#!/usr/bin/env node

import { analyzePR } from './skills/analyze-pr/analyze-pr.js';
import { generateReview } from './skills/generate-review/generate-review.js';
import { commitSuggestions } from './skills/commit-suggestions/commit-suggestions.js';

const args = process.argv.slice(2);

if (args.length < 3) {
    console.log('Usage: node analyze.js <owner> <repo> <pr_number>');
    console.log('Example: node analyze.js nodejs node 50000');
    process.exit(1);
}

const [owner, repo, prNumber] = args;

(async () => {
    try {
        const analysis = await analyzePR(owner, repo, prNumber);
        const review = await generateReview(analysis);
        await commitSuggestions(analysis, review.review);
        console.log('\n✅ Analysis complete!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
})();