import FairNumberGenerator from './fair-number.js';
import GameMenu from './game-menu.js';
import Cryptographics from './random-key-hmac.js';

class DiceGame {
    constructor(dice) {
        this.dice = dice;
        this.menu = new GameMenu(dice);
        this.fairGenerator = new FairNumberGenerator();
        this.cryptographics = new Cryptographics();
    }

    async start() {
        // Determine first player
        const firstPlayer = await this.determineFirstPlayer();
        console.log(`\n${firstPlayer ? 'You guessed correctly, ' : 'I'} make the first move.`);

        // First player selects dice
        let firstDiceIndex, secondDiceIndex;
        if (firstPlayer) {
            firstDiceIndex = await this.menu.getDiceSelection();
            console.log(`You chose the [${this.dice[firstDiceIndex]}] dice.`);
            secondDiceIndex = Cryptographics.generateRandomNumber(0, this.dice.length - 1);
            while (secondDiceIndex === firstDiceIndex) {
                secondDiceIndex = Cryptographics.generateRandomNumber(0, this.dice.length - 1);
            }
            console.log(`I choose the [${this.dice[secondDiceIndex]}] dice.`);
        } else {
            firstDiceIndex = Cryptographics.generateRandomNumber(0, this.dice.length - 1);
            console.log(`I choose the [${this.dice[firstDiceIndex]}] dice.`);
            secondDiceIndex = await this.menu.getDiceSelection(firstDiceIndex);
            console.log(`You choose the [${this.dice[secondDiceIndex]}] dice.`);
        }

        // Perform throws, the order does not matter
        const computerResult = await this.performThrow("computer's", "My", firstPlayer ? secondDiceIndex : firstDiceIndex);
        const userResult = await this.performThrow("your", "Your", firstPlayer ? firstDiceIndex : secondDiceIndex);

        // Determine winner
        this.determineWinner(userResult, computerResult);
    }

    async determineFirstPlayer() {
        console.log("\nLet's see who makes the first move!");
        const {hmac, computerNumber, key} = await this.fairGenerator.generateFairNumber(2);
        
        console.log(`I've selected a random value in the range 0-1 (HMAC=${hmac}).\n`);
        const userSelection = await this.menu.getUserSelection();

        console.log(`My selection: ${computerNumber} (KEY=${key})`);
        if (userSelection === computerNumber){
            return true;
        }
        return false;
    }

    async performThrow(player, playerResultText, diceIndex) {
        console.log(`\nIt's time for ${player} throw.`);
        const { hmac, computerNumber, key, range } = await this.fairGenerator.generateFairNumber(6);
        
        console.log(`I selected a random value in the range 0-5 (HMAC=${hmac}).`);

        const userNumber = await this.menu.getNumberSelection(range);
        
        console.log(`My number is ${computerNumber} (KEY=${key}).`);
        const result = (computerNumber + userNumber) % range;
        console.log(`The result is ${computerNumber} + ${userNumber} = ${result} (mod ${range})`);

        const throwResult = this.dice[diceIndex].faces[result];
        console.log(`${playerResultText} throw is ${throwResult}`);
        
        return throwResult;
    }

    determineWinner(userResult, computerResult) {
        console.log(`\nComputer's result: ${computerResult}`);
        console.log(`User's result: ${userResult}`);
        
        if (userResult > computerResult) {
            console.log(`You win! (${userResult} > ${computerResult})`);
        } else if (computerResult > userResult) {
            console.log(`Computer wins! (${computerResult} > ${userResult})`);
        } else {
            console.log("It's a tie!");
        }
    }
}

export default DiceGame;