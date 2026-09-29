# Design Document: horoscopo-cli

## Overview

The `horoscopo-cli` is a Node.js command-line tool that provides daily horoscope readings for zodiac signs. Users can request the horoscope for any of the 12 Spanish zodiac signs and receive a random humorous phrase from a hardcoded list. The tool uses chalk for colored terminal output and follows a modular architecture with clear separation of concerns.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      horoscopo-cli (CLI)                    │
│                    src/index.js (Entry Point)               │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌──────────────┐ ┌───────────┐ ┌──────────────┐
│  commander.js│ │ signs.js  │ │ horoscope.js │
│  (CLI parsing)││ (Data)    │ │ (Logic)      │
└──────────────┘ └───────────┘ └──────────────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
                      ▼
            ┌─────────────────────┐
            │  Colored Terminal   │
            │    Output (chalk)   │
            └─────────────────────┘
```

### Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| `src/index.js` | CLI entry point using commander.js; handles argument parsing and command execution |
| `src/signs.js` | Contains hardcoded zodiac sign data (emoji, name, phrases) |
| `src/horoscope.js` | Contains random phrase selection logic |

### Technical Stack

- **Runtime**: Node.js with ES modules (type: "module" in package.json)
- **CLI Framework**: commander.js
- **Styling**: chalk (for colored output)
- **Data Structure**: ES module exports with hardcoded data
- **Randomization**: Built-in Math.random() for phrase selection

## Components and Interfaces

### CLI Entry Point (src/index.js)

```javascript
import { Command } from 'commander';
import { signs } from './signs.js';
import { getRandomPhrase } from './horoscope.js';
import chalk from 'chalk';

// Command setup
const program = new Command();

program
  .name('horoscopo-cli')
  .description('Get your daily horoscope')
  .argument('<sign>', 'zodiac sign (lowercase)')
  .action((sign) => {
    // Validation and display logic
  });

program.parse();
```

### Data Module (src/signs.js)

```javascript
export const signs = {
  aries: {
    emoji: '♈',
    name: 'Aries',
    phrases: [
      'Hoy es un buen día para empezar algo nuevo.',
      'Tu energía está en su máxima expresión.',
      'La fortuna sonríe a los audaces.',
      'Evita las decisiones apresuradas.',
      'La comunicación será clave hoy.'
    ]
  },
  // ... 11 more signs
};
```

### Logic Module (src/horoscope.js)

```javascript
export function getRandomPhrase(signData) {
  const phrases = signData.phrases;
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

export function isValidSign(sign) {
  return sign in signs;
}

export function getValidSigns() {
  return Object.keys(signs);
}
```

## Data Models

### Zodiac Sign Model

```javascript
{
  emoji: string,      // Unicode zodiac symbol
  name: string,       // Spanish name
  phrases: string[]   // Array of exactly 5 humorous phrases
}
```

### Valid Zodiac Signs (12 total)

| Sign (argument) | Emoji | Name | Phrase Count |
|----------------|-------|------|--------------|
| aries | ♈ | Aries | 5 |
| tauro | ♉ | Tauro | 5 |
| geminis | ♊ | Geminis | 5 |
| cancer | ♋ | Cáncer | 5 |
| leo | ♌ | Leo | 5 |
| virgo | ♍ | Virgo | 5 |
| libra | ♎ | Libra | 5 |
| escorpio | ♏ | Escorpio | 5 |
| sagitario | ♐ | Sagitario | 5 |
| capricornio | ♑ | Capricornio | 5 |
| acuario | ♒ | Acuario | 5 |
| piscis | ♓ | Piscis | 5 |

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Random phrase selection is uniformly distributed

*For any* zodiac sign with a phrases array of exactly 5 elements, calling `getRandomPhrase()` multiple times across a large sample (N → ∞) should return each phrase approximately N/5 times, with the frequency converging to equal probability for all phrases.

**Validates: Requirements 3.2**

### Property 2: Phrase selection is within bounds

*For any* valid zodiac sign data and any random selection, the returned phrase must be one of the 5 hardcoded phrases in the sign's phrases array.

**Validates: Requirements 3.1**

### Property 3: Sign name matches input

*For any* valid zodiac sign argument, the displayed sign name must match the exact spelling of the provided sign argument (case-preserved from the data, since arguments are lowercase).

**Validates: Requirements 2.2**

### Property 4: Invalid sign rejection includes all valid signs

*For any* invalid sign argument, the error message must contain all 12 valid zodiac signs in lowercase, with no missing signs and no extra signs.

**Validates: Requirements 4.2, 4.3**

### Property 5: CLI argument requirement

*For any* invocation of the CLI without arguments, an error message must be displayed.

**Validates: Requirements 1.2**

### Property 6: Complete data coverage

*For any* of the 12 valid zodiac signs, the data structure must contain exactly 5 phrases and the sign must be selectable.

**Validates: Requirements 5.1, 5.2**

## Error Handling

### Error Cases

| Error Scenario | Error Message Format | Exit Code |
|----------------|---------------------|-----------|
| No arguments provided | `Error: Please provide a zodiac sign.` | 1 |
| Invalid sign | `Error: Invalid sign "${sign}". Valid signs: aries, tauro, geminis, cancer, leo, virgo, libra, escorpio, sagitario, capricornio, acuario, piscis` | 1 |
| Sign not found in data | `Error: Sign "${sign}" not found in data.` | 1 |

### Implementation Notes

- Use chalk.red() for all error messages
- Use chalk.yellow() for the list of valid signs in error messages
- Use chalk.green() for successful output (emoji + name)
- Exit with code 1 for errors, 0 for success

## Testing Strategy

### Dual Testing Approach

This feature is suitable for property-based testing because:
- Random phrase selection involves pure functions with clear input/output
- Universal properties can be verified across many random inputs
- The data structure is well-defined and easily generable

**Property-Based Testing Library**: fast-check (Node.js, supports ES modules)

**Property-Based Tests**:
- Property 1: Uniform distribution of random selection (100+ iterations)
- Property 2: Bounds checking for all signs (100+ iterations)
- Property 4: Error message contains all valid signs
- Property 5: No-argument error handling
- Property 6: Complete data coverage (12 signs × 5 phrases)

**Unit Tests** (example-based):
- Valid sign argument produces correct emoji + name + phrase output
- All 12 signs work correctly
- Case sensitivity: arguments are lowercase only
- Phrase formatting and emoji rendering

**Integration Tests**:
- CLI invocation with valid sign
- CLI invocation with invalid sign
- CLI invocation without arguments

### Test Configuration

- **Property tests**: Minimum 100 iterations per property
- **Test tags**: **Feature: horoscopo-cli, Property {number}: {property_text}**
- **Coverage target**: 100% of logic modules, 100% of data structure

### Example Test Structure

```javascript
// tests/horoscope.test.js
import fc from 'fast-check';
import { signs, getRandomPhrase, isValidSign, getValidSigns } from '../src/index.js';

test('Property 1: Uniform distribution', () => {
  // Run 100+ iterations, check frequency convergence
});

test('Property 2: Bounds checking', () => {
  fc.assert(
    fc.property(fc.constantFrom(...Object.keys(signs)), (sign) => {
      const phrase = getRandomPhrase(signs[sign]);
      expect(signs[sign].phrases).toContain(phrase);
    })
  );
});
```

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Hardcoded phrases per sign | Simple, no database/API dependencies; meets requirements exactly |
| ES modules | Modern Node.js standard; supports tree-shaking |
| commander.js | Lightweight CLI framework with good ES module support |
| Separate data module | Clear separation of concerns; easy to extend phrases |
| Random selection via Math.random() | Sufficient for CLI tool; no cryptographic randomness needed |
| Chalk for coloring | Industry standard for terminal styling |
| Lowercase-only signs | Simpler validation; user-friendly |
