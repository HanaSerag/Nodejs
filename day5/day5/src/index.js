// 1. Import the math module
// and use it in the application

// TASK 1:
// Make simple calculator app that asks the user for operation to make
// The application will parse the given operation and call the appropriate function
// from the math module.
// The application will then print the result to the console.
// The application will then ask the user if they want to continue.
// If the user wants to continue, the application will repeat the process.
// If the user does not want to continue, the application will exit.
/*


rl.question("Enter an operation (e.g. 10 * 5): ", (input) => {
  const parts = input.split(" "); //SPACE IS MUST
  const a = Number(parts[0]);
  const op = parts[1];
  const b = Number(parts[2]);

  let result;
  if (op === '+') result = math.add(a, b);
  else if (op === '-') result = math.subtract(a, b);
  else if (op === '*') result = math.multiply(a, b);
  else if (op === '/') result = math.divide(a, b);
  else result = "Invalid operator!";

  console.log("Result:", result);

  rl.close();
});

// TASK 2 (Bouns 50 points):
// Make a guessing game that asks the user to guess a number between 0 and 50.
// The application will generate a random number between 0 and 50 using the randomTo50 function.
// The application will then ask the user to guess the number.
// The user has 5 attempts to guess the number. if the attempt is wrong, the application will print "Try again 🤔" to the console.
// If the user does not guess the number correctly 5 times, the application will print "You lost the game!! try again 🤔" to the console.
// If the user guesses the number correctly, the application will print "You won the game!! congrats 🥳🥳" to the console.
const math = require('../lib/math');


function GUESSTHEGAME() {
  const number = math.randomTo50();
  let attempts = 5;

  console.log("Guess the number between 1 and 50! You have 5 attempts.");

  function JUSTGUESS() {
    if (attempts === 0) {
      console.log("You lost the game!! try again 🤔");
      rl.close();
      return;
    }

    rl.question(`Enter your guess (${attempts} attempts left): `, (input) => {
      const guess = Number(input);

      if (guess === number) {
        console.log("You won the game!! congrats 🥳🥳");
        rl.close();
      } else {
        attempts--;
        if (attempts > 0) {
          console.log("Try again 🤔");
          JUSTGUESS();
        } else {
          console.log("You lost the game!! try again 🤔");
          console.log(`The number was: ${number}`);
          rl.close();
        }
      }
    });
  }

  JUSTGUESS();
}
GUESSTHEGAME();
// TASK 3 (Bouns 50 points):
// Make a function that ask the user the following questions:
// 1. What is your name?
// 2. What is your age? (if age is not a number or is less than 10, the application will print "Invalid age" and end the program)
// 3. What is the Favorite programming language
// Then after the user answers all the questions, the application will print the following.
// console.log("\n--- Summary ---");
// console.log(`Name: ${name || "(no name)"}`);
// console.log(`Age: ${age}`);
// console.log(`Favorite language: ${fav || "(not specified)"}`);
// console.log("----------------\n");
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function QUESTIONS() {
  rl.question("What is your name? ", (name) => {
    rl.question("What is your age? ", (ageInput) => {
      const age = Number(ageInput);

      if (isNaN(age) || age < 10) {
        console.log("Invalid age");
        rl.close();
        return;
      }

      rl.question("What is your favorite programming language? ", (fav) => {
        console.log("\n--- Summary ---");
        console.log(`Name: ${name || "(no name)"}`);
        console.log(`Age: ${age}`);
        console.log(`Favorite language: ${fav || "(not specified)"}`);
        console.log("----------------\n");

        rl.close();
      });
    });
  });
}

QUESTIONS();
