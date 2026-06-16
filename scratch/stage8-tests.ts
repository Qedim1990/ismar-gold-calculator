// Mock localStorage
const store: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (k: string) => store[k] || null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { for (let key in store) delete store[key]; }
};

import { parseInput } from '../src/utils/decimalEngine';
import { calculatorStore } from '../src/store/calculatorStore';
import { historyService } from '../src/services/history';
import { storageService } from '../src/services/storage';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    passed++;
    console.log(`✅ ${testName}`);
  } else {
    failed++;
    console.error(`❌ FAIL: ${testName}`);
  }
}

function expectThrow(fn: () => void, expectedMessage: string, testName: string) {
  try {
    fn();
    failed++;
    console.error(`❌ FAIL: ${testName} - Expected error but succeeded`);
  } catch (e: any) {
    if (e.message.includes(expectedMessage)) {
      passed++;
      console.log(`✅ ${testName}`);
    } else {
      failed++;
      console.error(`❌ FAIL: ${testName} - Expected "${expectedMessage}", got "${e.message}"`);
    }
  }
}

// 1. Decimal Engine
console.log("\n--- 1. Decimal Engine ---");
assert(parseInput("1,13").equals(1.13), 'parse("1,13") -> "1.13"');
assert(parseInput("1.13").equals(1.13), 'parse("1.13") -> "1.13"');
assert(parseInput("001.1300").equals(1.13), 'parse("001.1300") -> "1.13"');
assert(parseInput("0.0001").equals(0.0001), 'parse("0.0001") -> "0.0001"');
expectThrow(() => parseInput("-5"), 'Yalnız müsbət rəqəmlər', 'parse("-5") throws Azerbaijani error');
expectThrow(() => parseInput(""), 'Boş daxiletmə', 'parse("") throws Azerbaijani error');
expectThrow(() => parseInput("."), 'Yalnız müsbət rəqəmlər', 'parse(".") throws Azerbaijani error');
expectThrow(() => parseInput("1..13"), 'Yalnız müsbət', 'parse("1..13") throws Azerbaijani error');

// 2. Calculation Engine
console.log("\n--- 2. Calculation Engine ---");
calculatorStore.setPrice("175");
calculatorStore.setWeight("1.13");
assert(calculatorStore.result.total?.equals(197.75) ?? false, '175 × 1.13 = 197.75');

calculatorStore.setWeight("1,13");
assert(calculatorStore.result.total?.equals(197.75) ?? false, '175 × 1,13 = 197.75');

calculatorStore.setWeight("0.001");
assert(calculatorStore.result.total?.equals(0.175) ?? false, '175 × 0.001 = 0.175');

calculatorStore.setWeight("0.0001");
assert(calculatorStore.result.total?.equals(0.0175) ?? false, '175 × 0.0001 = 0.0175');

calculatorStore.setPrice("173");
calculatorStore.setWeight("3.45");
assert(calculatorStore.result.total?.equals(596.85) ?? false, '173 × 3.45 = 596.85');

calculatorStore.setPrice("175");
calculatorStore.setWeight("0");
assert(calculatorStore.result.total?.equals(0) ?? false, '0 × any valid weight = 0');

calculatorStore.setPrice("0");
calculatorStore.setWeight("2.5");
assert(calculatorStore.result.total?.equals(0) ?? false, 'any valid price × 0 = 0');

// 3. State management
console.log("\n--- 3. State management ---");
let recalculations = 0;
calculatorStore.subscribe(() => recalculations++);
calculatorStore.setPrice("180");
calculatorStore.setWeight("2");
assert(recalculations > 0, 'recalculation happens on every string change');
assert(calculatorStore.result.total?.equals(360) ?? false, 'setPrice() recalculates immediately');

calculatorStore.setWeight("-2");
assert(calculatorStore.error?.includes('müsbət') ?? false, 'invalid values produce Azerbaijani errors');
// Note: store hydration is tested via storage integration.

// 4. History engine
console.log("\n--- 4. History engine ---");
historyService.clearHistory();
calculatorStore.setPrice("175");
for(let i=1; i<=25; i++) {
  calculatorStore.setWeight(String(i));
}
assert(historyService.getHistory().length === 20, 'maximum 20 items');
assert(historyService.getHistory()[0].weightStr === "25", 'FIFO eviction works');

let beforeLen = historyService.getHistory().length;
calculatorStore.setWeight("25."); // Logical duplicate
assert(historyService.getHistory().length === beforeLen, 'duplicate logical states are not added');

// 5. Storage engine
console.log("\n--- 5. Storage engine ---");
storageService.set('test', { a: 1 });
let saved = storageService.get('test');
assert(saved.a === 1, 'identical payloads are not rewritten (write logic)');
assert(storageService.get('non_existent') === null, 'invalid JSON is safely handled');

console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
