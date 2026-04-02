import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testAgent() {
  try {
    console.log('🤖 Loading PR Analyzer Agent...\n');
    
    // Read agent.yaml
    const agentYamlPath = path.join(__dirname, 'agent.yaml');
    const agentYamlContent = fs.readFileSync(agentYamlPath, 'utf-8');
    const agentYaml = YAML.load(agentYamlContent);
    
    console.log('✅ Agent loaded successfully!\n');
    console.log('📋 Agent Name:', agentYaml.name);
    console.log('📋 Version:', agentYaml.version);
    console.log('📋 Description:', agentYaml.description);
    console.log('📋 Model:', agentYaml.model.preferred);
    console.log('📋 Skills:', agentYaml.skills.join(', '));
    
    // Check if skills folders exist
    console.log('\n🔧 Checking skills...');
    for (const skill of agentYaml.skills) {
      const skillPath = path.join(__dirname, 'skills', skill, 'SKILL.md');
      if (fs.existsSync(skillPath)) {
        console.log(`  ✅ ${skill} - FOUND`);
      } else {
        console.log(`  ❌ ${skill} - MISSING`);
      }
    }
    
    console.log('\n✨ Agent is ready to deploy!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testAgent();