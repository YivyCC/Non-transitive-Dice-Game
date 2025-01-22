import { input } from '@inquirer/prompts';
import { select } from '@inquirer/prompts';
import ProbabilityCalculator from './probability-calculator.js'
import TableGenerator from './table-generator.js';

class GameMenu {
    constructor(dice) {
        this.dice = dice;
    }

    async getDiceSelection(excludeDiceIndex = null) {
        const diceChoices = this.dice
            .map((dice, index) => ({
                name: `Dice: ${dice.faces.join(', ')}`,
                value: index
            }))
            .filter((_, index) => index !== excludeDiceIndex); //exclude the value already picked by computer if any

        while (true) {
            const diceSelection = await select({
                message: '\nChoose your dice:',
                choices: [
                    ...diceChoices,
                    {
                        name: 'X',
                        value: 'X',
                        description: 'Exit the game.',
                    },
                    {
                        name: '?',
                        value: '?',
                        description: 'Show probabilities of winning for each dice pair',
                    }
                ],
            });
    
            if (diceSelection === 'X') {
                console.log('Exiting game...');
                process.exit(0);
            }
    
            if (diceSelection === '?') {
                const probCalc = new ProbabilityCalculator(this.dice);
                const matrix = probCalc.generateProbabilityMatrix();
                console.log(TableGenerator.generateProbabilityTable(matrix, this.dice));
                continue;
            }
    
            // If a valid dice is selected, return the selected dice index
            return diceSelection;
        }
    }

    async getUserSelection(){
        while (true){
            const firstOptions = await select({
                message: 'Try to guess my selection:',
                choices: [
                    {
                        name: '0',
                        value: 0,
                    },
                    {
                        name: '1',
                        value: 1,
                    },
                    {
                        name: 'X',
                        value: 'X',
                        description: 'Exit the game.',
                    },
                    {
                        name: '?',
                        value: '?',
                        description: 'Show game instructions',
                    },
                ],
            });
    
            if (firstOptions === 'X'){
                console.log('Exiting game...');
                process.exit(0);
            } 

            if (firstOptions === '?'){
                console.log("\nThis is a general non-transitive dice game. \n1- Try to guess the computer's number between 0 and 1, if you guess correctly, you get to pick your dice first.\n2- Each player picks their prefered dice. Remember that you can use the '?' selection to view the winning probabilities for each dice.\n3- The players perform their throws and whoever rolls higher wins.\n");
                continue;
            }
    
            return firstOptions;
        }
    }

    async getNumberSelection(range) {
        const rangeArray = Array.from({ length: range }, (_, i) => ({
            name: `${i}`,
            value: i
        }));
    
        const choices = [
            ...rangeArray,
            {
                name: 'X',
                value: 'X',
                description: 'Exit the game.',
            },
            {
                name: '?',
                value: '?',
                description: 'Show probabilities of winning for each dice pair',
            }
        ];
    
        while (true) {
            const numSelection = await select({
                message: `\nSelect your number modulo 6:`,
                choices,
                loop: false  // Add this line to prevent looping
            });
    
            if (numSelection === 'X') {
                console.log('Exiting game...');
                process.exit(0);
            }
    
            if (numSelection === '?') {
                const probCalc = new ProbabilityCalculator(this.dice);
                const matrix = probCalc.generateProbabilityMatrix();
                console.log(TableGenerator.generateProbabilityTable(matrix, this.dice));
                continue;
            }
    
            return numSelection;
        }
    }
}

export default GameMenu;