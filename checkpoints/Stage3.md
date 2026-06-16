---CHECKPOINT START---
Current stage: Stage 3 (Decimal Engine)
Build status: blocked by expected absence of application entry files

Files created:

- src/utils/decimalEngine.ts (pure decimal engine using decimal.js)
- validate.ts (arithmetic and rejection validation script)

Files modified:
NONE

Dependency decisions:

- decimal.js@10.6.0 used for all calculations
- zero floating-point arithmetic permitted

Validated requirements:

- comma normalization
- exact arithmetic
- 0.001 gram precision
- 0.0001 gram precision
- Azerbaijani user-facing errors
- negative input rejection
- malformed input rejection
- parser edge cases validated
- pure utility architecture validated

Validation evidence:

- 175 × 1.13 = 197.75
- 175 × 1,13 = 197.75
- 175 × 0.001 = 0.175
- 175 × 0.0001 = 0.0175
- additional parser edge cases passed
- no Number()
- no parseFloat()
- no parseInt()
- no Math.*
- no direct * or / arithmetic
- no React or browser dependencies

Unresolved issues:

- index.html does not yet exist
- src/main.tsx does not yet exist
- src/App.tsx does not yet exist
- Vite build is expected to fail until application shell is created

Immutable decisions:

- Azerbaijani PWA gold calculator
- AZN only
- No server
- All user-facing strings in Azerbaijani
- decimal.js is the only arithmetic engine

Next permitted action:
Proceed to Stage 4 (LocalStorage, History Engine, and initial application scaffolding)
---CHECKPOINT END---
