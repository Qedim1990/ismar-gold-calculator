---CHECKPOINT START---
Current stage: Stage 4 (Application Shell, LocalStorage, History Engine)

Build status: passes

Files created:

- index.html (Vite entry document)
- src/main.tsx (React entry point)
- src/App.tsx (Application shell)
- src/types/calculator.ts (Calculator types)
- src/types/history.ts (History types)
- src/services/storage.ts (Pure LocalStorage utility)
- src/services/history.ts (History engine with FIFO limit)
- src/store/calculatorStore.ts (Minimal store scaffold)

Files modified:
NONE

Dependency decisions:

- Native LocalStorage only
- History limit fixed at 20 items
- No server
- No external state library
- decimal.js remains sole arithmetic engine

Validated requirements:

- Vite entry shell operational
- Build passes
- Storage isolated from UI
- Storage isolated from store
- Zero React imports in services
- Zero circular dependencies
- FIFO eviction validated
- Maximum history length = 20
- App structure modular and expandable

Validation evidence:

- npm run build passed
- 21 inserted history items
- final array length = 20
- id_1 correctly evicted
- first item = id_21
- last item = id_2

Unresolved issues:
NONE

Immutable decisions:

- Azerbaijani only
- AZN only
- No server
- Offline-first PWA
- decimal.js only
- Mobile-first design
- User-facing strings in Azerbaijani

Next permitted action:
Proceed to Stage 5 (Calculator state management and instant recalculation engine)
---CHECKPOINT END---
