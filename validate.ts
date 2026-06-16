import { multiply, parseInput } from './src/utils/decimalEngine.ts';

function assertEqual(actual: string, expected: string, name: string) {
  if (actual !== expected) {
    console.error(`❌ ${name} failed. Expected ${expected}, got ${actual}`);
    process.exit(1);
  } else {
    console.log(`✅ ${name} passed.`);
  }
}

function assertThrows(fn: () => void, name: string) {
  try {
    fn();
    console.error(`❌ ${name} failed. Expected to throw, but didn't.`);
    process.exit(1);
  } catch (e: any) {
    console.log(`✅ ${name} passed. Threw: ${e.message}`);
  }
}

console.log("Starting validation...");

// Arithmetic cases
assertEqual(multiply('175', '1.13'), '197.75', '175 x 1.13 = 197.75');
assertEqual(multiply('175', '1,13'), '197.75', '175 x 1,13 = 197.75');
assertEqual(multiply('175', '0.001'), '0.175', '175 x 0.001 = 0.175');
assertEqual(multiply('175', '0.0001'), '0.0175', '175 x 0.0001 = 0.0175');

// Reject cases
assertThrows(() => parseInput('-5'), 'Reject negative');
assertThrows(() => parseInput(''), 'Reject empty');
assertThrows(() => parseInput('   '), 'Reject whitespace-only empty');
assertThrows(() => parseInput('abc'), 'Reject alphabetic');
assertThrows(() => parseInput('1.2.3'), 'Reject malformed (multiple dots)');
assertThrows(() => parseInput('1,2,3'), 'Reject malformed (multiple commas)');
assertThrows(() => parseInput('12a4'), 'Reject malformed (alphanumeric)');

console.log("All validations passed.");
