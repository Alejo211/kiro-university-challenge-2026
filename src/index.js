import { Command } from 'commander';
import { signs } from './signs.js';
import { getRandomPhrase, isValidSign, getAllSigns } from './horoscope.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('horoscope')
  .description('Get your daily horoscope')
  .argument('<sign>', 'zodiac sign (lowercase)')
  .action((sign) => {
    if (!sign) {
      console.error(chalk.red('Error: Please provide a zodiac sign.'));
      process.exit(1);
    }

    if (!isValidSign(sign)) {
      console.error(
        chalk.red(
          `Error: Invalid sign "${sign}". Valid signs: ${getAllSigns().join(', ')}`
        )
      );
      process.exit(1);
    }

    const signData = signs[sign];
    const phrase = getRandomPhrase(sign);

    console.log(chalk.green(`${signData.emoji} ${signData.name}`));
    console.log(chalk.yellow(phrase));
    process.exit(0);
  });

program.parse();
