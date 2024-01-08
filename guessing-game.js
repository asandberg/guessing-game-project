const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let min;
let max;
let secretNumber;
let maxNumberAttempts;
let numAttempts = 0;

function askRange() {
    rl.question("Enter a max number: ", handleMaxResponse);

    function handleMaxResponse(answer) {
        max = answer;
        rl.question("Enter min number: ", handleMinResponse)
    }

    function handleMinResponse(answer) {
        min = answer;
        if (min > max) {
            console.log("Min must be less that max.")
            askRange();
        } else {
            rl.question("How many responses do you get? ", handleAttemptResponse)
        }
    }

    function handleAttemptResponse(answer) {
        maxNumberAttempts = Number(answer)
        secretNumber = randomInRange(min, max);
        console.log(`I'm thinking of a number between ${min} and ${max}...`)

        rl.question("Enter a guess: ", askGuess);
    }
}

function randomInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function askGuess(answer) {
    let guessChecked = checkGuess(answer);
    if (guessChecked !== 0) {
        if (guessChecked === 1) {
            console.log("Too high.");
        } else {
            console.log("Too low.")
        }
        numAttempts++;
        if (numAttempts >= maxNumberAttempts) {
            rl.close();
            console.log("You Lose.")
        } else {
            rl.question("Enter a guess: ", askGuess);
        }
    } else {
        console.log("Correct!");
        console.log("YOU WIN!");
        rl.close()
    }
}

function checkGuess(answer) {
    answer = Number(answer);
    if (answer > secretNumber) {
        return 1;
    } else if (answer < secretNumber) {
        return -1;
    } else {
        return 0;
    }
}

askRange();
