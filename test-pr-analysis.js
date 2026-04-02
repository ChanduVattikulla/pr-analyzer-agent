import { analyzePR } from './skills/analyze-pr/analyze-pr.js';

async function testPRAnalysis() {
  try {
    console.log('🚀 Testing PR Analyzer Agent with Real GitHub Data...\n');
    
    // Test with a real public repo and PR
    // Using Node.js repo as example (change these to test with your own repos)
    const results = await analyzePR('nodejs', 'node', 50000);
    
    console.log('\n✅ Analysis Results:');
    console.log(JSON.stringify(results, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPRAnalysis();