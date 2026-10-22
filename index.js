import chalk from 'chalk';
import prompts from 'prompts';
import { randomInt } from 'crypto';
import fs from 'fs';

const MIN = 1;
const MAX = 10;
const MAX_Attempts = 3;

const secretNumber = randomInt(MIN, MAX + 1);


// Array to store the output messages
const output = [];
function show(message = '') {  // when show gets called it get pushed into the output array
    console.log(message);      // so that it can then be sent to fs file
    output.push(message.replace(/\x1b\[[0-9;]*m/g, ''));  // remove ANSI escape codes for colors before writing to file
}



show(chalk.magenta.bold(' GUESS THE NUMBER!'));
show(chalk.cyan('─'.repeat(38)));
show(`Guess a number between ${MIN} and ${MAX}.`);
show(chalk.yellow(`You have ${MAX_Attempts} attempts!`));
show();

let haswon = false;

for (let attempt = 1; attempt <= MAX_Attempts; attempt++) {

    const response = await prompts({
    type: 'text',
    name: 'guess',
    message: chalk.bold(`Attempt ${attempt}/${MAX_Attempts}: Enter your guess`),
    });

    // prompts prints its own question, so log the attempt and guess manuall
    output.push(`Attempt ${attempt}/${MAX_Attempts}: Enter your guess ... ${response.guess}`);

    try {
        const guess = Validateinput(response.guess);
        // check if the guess is correct
        if(guess === secretNumber) {
            haswon = true;
            show();
            show(chalk.green('You guessed the secret number!'));
            break;
        }
        // check if the guess is too low or too high
        else if (guess < secretNumber) {
            show(chalk.yellow('Too low!'));
        }
        // check if the guess is too high
        else if (guess > secretNumber) {
            show(chalk.yellow('Too high!'));
        }
    }
    // catch any errors thrown by the Validateinput function
    catch (error) {
        show(chalk.red(error.message));
    }

}

if (haswon === false) {
    show();
    show(chalk.red('GAME OVER!'));
    show(`The secret number was ${secretNumber}.`);
}

show();
show(chalk.magenta.bold('Thanks for playing!'));
show("\n");

// add the output to a file called output.txt
fs.appendFileSync('output.txt', output.join('\n'), 'utf-8');


function Validateinput(input) {

    const value = input.trim(); // remove whitespace from the input

    // check if the input is empty
    if (value === '') {
        throw new Error('Guess is required.');
    }

    const guess = Number(value);

    // check if the input is a integer
    if (!Number.isInteger(guess)) {
        throw new Error('Guess must be a whole number.');
    }

    // value less that 1 including 0 and negatives 
    else if (value < MIN){
        throw new Error(`Guess must be at least ${MIN}.`);
    }
    // values greater than 10
    else if (value > MAX){
        throw new Error(`Guess cannot exceed ${MAX}.`);
    }

    return guess;

}

