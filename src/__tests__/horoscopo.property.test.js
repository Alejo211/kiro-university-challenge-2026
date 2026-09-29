import { test } from 'node:test';
import { deepStrictEqual, ok } from 'node:assert';
import fc from 'fast-check';

import { signs } from '../signs.js';
import {
  getRandomPhrase,
  isValidSign,
  getSignData,
  getAllSigns
} from '../horoscope.js';

test('Property 1: getRandomPhrase always returns a non-empty string for valid signs', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...Object.keys(signs)),
      (sign) => {
        const phrase = getRandomPhrase(sign);
        ok(phrase !== null && phrase !== undefined, 'Phrase should not be null or undefined');
        ok(typeof phrase === 'string' && phrase.length > 0, 'Phrase should be a non-empty string');
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 2: isValidSign correctly identifies valid and invalid signs', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.constantFrom(...Object.keys(signs)),
        fc.string().filter((s) => !Object.keys(signs).includes(s))
      ),
      (sign) => {
        if (isValidSign(sign)) {
          deepStrictEqual(signs[sign], getSignData(sign), 'Valid sign should return sign data');
        } else {
          deepStrictEqual(getSignData(sign), null, 'Invalid sign should return null');
        }
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 3: getRandomPhrase always returns a phrase from the hardcoded list', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...Object.keys(signs)),
      (sign) => {
        const phrase = getRandomPhrase(sign);
        ok(phrase !== null && phrase !== undefined, 'Phrase should not be null or undefined');
        deepStrictEqual(signs[sign].phrases.includes(phrase), true, 'Phrase should be in the sign\'s phrases array');
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 4: getSignData always returns sign emoji and name for valid signs', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...Object.keys(signs)),
      (sign) => {
        const signData = getSignData(sign);
        ok(signData !== null, 'Sign data should not be null for valid signs');
        ok(typeof signData.emoji === 'string' && signData.emoji.length > 0, 'Emoji should be a non-empty string');
        ok(typeof signData.name === 'string' && signData.name.length > 0, 'Name should be a non-empty string');
      }
    ),
    { numRuns: 100 }
  );
});

test('Property 5: getAllSigns returns exactly 12 signs', () => {
  deepStrictEqual(getAllSigns().length, 12, 'Should return exactly 12 signs');
  deepStrictEqual(getAllSigns().every((s) => isValidSign(s)), true, 'All returned signs should be valid');
});

test('Property 6: Phrase selection distribution has minimum variation', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...Object.keys(signs)),
      fc.integer({ min: 100, max: 100 }),
      (sign, iterations) => {
        const phraseCounts = {};
        for (let i = 0; i < iterations; i++) {
          const phrase = getRandomPhrase(sign);
          phraseCounts[phrase] = (phraseCounts[phrase] || 0) + 1;
        }
        const distinctPhrases = Object.keys(phraseCounts).length;
        ok(distinctPhrases >= 3, 'Should have at least 3 distinct phrases in 100 runs');
      }
    ),
    { numRuns: 50 }
  );
});
