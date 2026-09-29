# Requirements Document

## Introduction

A Node.js command-line interface tool that provides daily horoscope readings for zodiac signs. Users can request the horoscope for any zodiac sign and receive a random funny phrase from a hardcoded list of phrases per sign.

## Glossary

- **horoscopo-cli**: The command-line interface tool
- **Zodiac_Sign**: One of the 12 astrological signs (aries, tauro, geminis, cancer, leo, virgo, libra, escorpio, sagitario, capricornio, acuario, piscis)
- **Horoscope_Phrase**: A humorous daily fortune text associated with a zodiac sign
- **Sign_Data**: Collection of 5 hardcoded Horoscope_Phrases for each Zodiac_Sign

## Requirements

### Requirement 1: CLI Command Entry Point

**User Story:** As a user, I want to run a CLI command to get my horoscope, so that I can see my daily fortune.

#### Acceptance Criteria

1. WHEN the horoscopo-cli command is executed with a valid zodiac sign argument, THE CLI SHALL display the sign emoji, sign name, and one random Horoscope_Phrase
2. WHEN the horoscopo-cli command is executed without arguments, THE CLI SHALL display an error message
3. WHEN an invalid zodiac sign is provided, THE CLI SHALL display an error message listing valid signs

### Requirement 2: Display Horoscope Information

**User Story:** As a user, I want to see my zodiac sign information, so that I know which sign the horoscope is for.

#### Acceptance Criteria

1. WHEN a valid zodiac sign is provided, THE CLI SHALL display the sign emoji followed by the sign name
2. THE displayed name SHALL match the exact spelling of the provided sign argument

### Requirement 3: Random Phrase Selection

**User Story:** As a user, I want to receive a random daily fortune, so that each day feels unique.

#### Acceptance Criteria

1. WHEN a valid zodiac sign is provided, THE CLI SHALL select one random Horoscope_Phrase from the 5 phrases associated with that sign
2. FOR ALL valid zodiac signs, each of the 5 hardcoded phrases SHALL have equal probability of being selected

### Requirement 4: Valid Sign List

**User Story:** As a user, I want to know which signs are valid, so that I can request the correct sign.

#### Acceptance Criteria

1. IF an invalid zodiac sign is provided, THEN THE CLI SHALL display an error message
2. THE error message SHALL list all 12 valid zodiac signs in lowercase
3. THE list SHALL include: aries, tauro, geminis, cancer, leo, virgo, libra, escorpio, sagitario, capricornio, acuario, piscis

### Requirement 5: Data Structure for Phrases

**User Story:** As a developer, I want to store phrases in a dedicated file, so that the code is organized and maintainable.

#### Acceptance Criteria

1. THE Sign_Data SHALL contain exactly 12 zodiac signs
2. EACH zodiac sign SHALL have exactly 5 hardcoded Horoscope_Phrases
3. ALL phrases SHALL be humorous and appropriate for general audiences

### Requirement 6: Module Structure

**User Story:** As a developer, I want the code organized into separate modules, so that each concern is separated.

#### Acceptance Criteria

1. THE project SHALL have src/index.js as the entry point
2. THE project SHALL have src/signs.js containing Sign_Data
3. THE project SHALL have src/horoscope.js containing random phrase selection logic
4. THE package.json SHALL include a bin entry for CLI execution