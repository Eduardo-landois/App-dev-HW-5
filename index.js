import chalk from 'chalk';
import prompts from 'prompts';
import { randomInt } from 'crypto';

const MIN = 1;
const MAX = 10;
const MAX_Attempts = 3;

const secretNumber = randomInt(MIN, MAX + 1);

console.log(chalk.magenta.bold(' GUESS THE NUMBER!'));
console.log(chalk.cyan('─'.repeat(38)));
console.log(`Guess a number between ${MIN} and ${MAX}.`);
console.log(chalk.yellow(`You have ${MAX_Attempts} attempts!`));
console.log();

const response = await prompts({
  type: 'text',
  name: 'guess',
  message: chalk.bold(`Attempt 1/${MAX_Attempts}: Enter your guess`),
});

console.log(`You entered: ${response.guess}`);