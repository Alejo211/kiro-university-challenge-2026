# Implementation Plan: horoscopo-cli

## Overview

This CLI tool provides daily horoscope readings for 12 Spanish zodiac signs. The implementation follows a modular architecture with separate modules for CLI entry, data storage, and random phrase selection. Property-based testing will validate the 6 correctness properties defined in the design.

## Tasks

- [ ] 1. Set up project structure and configuration
  - Create package.json with ES modules support
  - Configure type: "module" for ES module support
  - Add dependencies: commander.js and chalk
  - Add devDependencies: fast-check for property-based testing
  - Add bin entry pointing to src/index.js
  - _Requirements: 6.4_

- [ ] 2. Create data module (src/signs.js)
  - [ ] 2.1 Implement the signs data structure
    - Export const signs object with all 12 zodiac signs
    - Each sign includes: emoji, name, and 5 phrases array
    - Include all required signs: aries, tauro, geminis, cancer, leo, virgo, libra, escorpio, sagitario, capricornio, acuario, piscis
    - _Requirements: 5.1, 5.2_
  
  - [ ]* 2.2 Write property test for complete data coverage
    - **Property 6: Complete data coverage**
    - **Validates: Requirements 5.1, 5.2**
    - Verify all 12 signs exist with exactly 5 phrases each
  
  - [ ]* 2.3 Write unit tests for signs data
    - Test each sign has required properties (emoji, name, phrases)
    - Test phrase count is exactly 5 for each sign
    - _Requirements: 5.1, 5.2_

- [ ] 3. Create logic module (src/horoscope.js)
  - [ ] 3.1 Implement getRandomPhrase function
    - Accept signData parameter
    - Return random phrase from signData.phrases array
    - Use Math.random() for selection
    - _Requirements: 3.1, 3.2_
  
  - [ ] 3.2 Implement isValidSign function
    - Accept sign argument (string)
    - Return true if sign exists in signs object, false otherwise
    - _Requirements: 1.3_
  
  - [ ] 3.3 Implement getValidSigns function
    - Return array of all valid sign keys
    - _Requirements: 4.2_
  
  - [ ]* 3.4 Write property test for phrase selection bounds
    - **Property 2: Phrase selection is within bounds**
    - **Validates: Requirements 3.1**
    - Verify returned phrase is always in the sign's phrases array
  
  - [ ]* 3.5 Write property test for uniform distribution
    - **Property 1: Random phrase selection is uniformly distributed**
    - **Validates: Requirements 3.2**
    - Run 100+ iterations, verify frequency convergence to equal probability
  
  - [ ]* 3.6 Write unit tests for logic functions
    - Test getRandomPhrase returns valid phrase
    - Test isValidSign with valid and invalid signs
    - Test getValidSigns returns all 12 signs
    - _Requirements: 1.3, 3.1, 3.2, 4.2_

- [ ] 4. Create CLI entry point (src/index.js)
  - [ ] 4.1 Set up commander.js configuration
    - Import commander, signs, horoscope functions, and chalk
    - Create new Command instance
    - Configure name, description, and argument requirements
    - _Requirements: 6.1_
  
  - [ ] 4.2 Implement valid sign handling
    - Display sign emoji using chalk.green()
    - Display sign name using chalk.green()
    - Get and display random phrase
    - Exit with code 0
    - _Requirements: 1.1, 2.1, 2.2, 3.1_
  
  - [ ] 4.3 Implement invalid sign error handling
    - Check if sign is valid using isValidSign
    - Display error message with chalk.red()
    - List valid signs using chalk.yellow()
    - Exit with code 1
    - _Requirements: 1.3, 4.1, 4.2, 4.3_
  
  - [ ] 4.4 Implement no-arguments error handling
    - Check for missing arguments
    - Display error message using chalk.red()
    - Exit with code 1
    - _Requirements: 1.2_
  
  - [ ]* 4.5 Write property test for error message coverage
    - **Property 4: Invalid sign rejection includes all valid signs**
    - **Validates: Requirements 4.2, 4.3**
    - Verify error message contains all 12 signs
  
  - [ ]* 4.6 Write property test for CLI argument requirement
    - **Property 5: CLI argument requirement**
    - **Validates: Requirements 1.2**
    - Test no-argument invocation produces error
  
  - [ ]* 4.7 Write integration tests for CLI
    - Test valid sign argument produces correct output
    - Test invalid sign produces error with valid signs list
    - Test no arguments produces error message
    - Test all 12 signs work correctly
    - _Requirements: 1.1, 1.2, 1.3, 4.1_

- [ ] 5. Checkpoint - Verify setup and core logic
  - Ensure all tests pass, ask the user if questions arise.
  - Verify package.json configuration
  - Verify signs.js exports all 12 signs with correct structure
  - Verify horoscope.js functions work correctly

- [ ] 6. Verify and test the complete application
  - [ ] 6.1 Build and verify no-argument error
    - Run the CLI without arguments
    - Verify error message is displayed correctly
    - _Requirements: 1.2_
  
  - [ ] 6.2 Verify valid sign output
    - Run the CLI with a valid sign (e.g., "aries")
    - Verify emoji, name, and phrase are displayed
    - Verify output uses green coloring
    - _Requirements: 1.1, 2.1, 2.2, 3.1_
  
  - [ ] 6.3 Verify invalid sign error
    - Run the CLI with an invalid sign
    - Verify error message displays all valid signs
    - Verify error message uses red and yellow coloring
    - _Requirements: 1.3, 4.1, 4.2, 4.3_
  
  - [ ]* 6.4 Run all property-based tests
    - Run fast-check tests for properties 1-6
    - Ensure minimum 100 iterations per property
    - Verify all tests pass
    - _Requirements: All property requirements_
  
  - [ ]* 6.5 Run all unit and integration tests
    - Run all example-based tests
    - Verify test coverage targets
    - _Requirements: All acceptance criteria_

- [ ] 7. Final checkpoint - Ensure everything works
  - Ensure all tests pass, ask the user if questions arise.
  - Verify CLI works for all 12 signs
  - Verify error handling for invalid inputs

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each property-based test validates a specific correctness property from the design
- All error messages use chalk for colored terminal output
- The CLI uses commander.js for argument parsing and chalk for styling
- Property tests run with fast-check library (100+ iterations minimum)
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end CLI behavior

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "3.1", "3.2", "3.3"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.4", "3.5", "3.6", "4.1"] },
    { "id": 3, "tasks": ["4.2", "4.3", "4.4"] },
    { "id": 4, "tasks": ["4.5", "4.6", "4.7"] },
    { "id": 5, "tasks": ["5.1", "6.1", "6.2", "6.3"] },
    { "id": 6, "tasks": ["6.4", "6.5"] }
  ]
}
```