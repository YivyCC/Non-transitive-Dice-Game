import DiceGame from "./dice-game.js";

class Dice{
    constructor(faces) {
        this.faces = faces;
        this.numFaces = faces.length;
    }

    toString() {
        return this.faces.join(',');
    }

    static validateFaces(faces) {
        return faces.every(face => Number.isInteger(face) && face >= 0);
    }
}

class DiceParser{
    static parse(args) {
        if (args.length < 3) {
            console.log(`Please add at least 3 dice configurations. Each dice separated by a space and each face value by a comma.\nFor example: 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3`);
            process.exit(0);
        }

        // get each individual dice
        const dice = args.map(arg => {
            const faces = arg.split(',').map(num => parseInt(num.trim())); // remove commas and convert each face value to integer
            
            // Validate face count
            if (faces.length !== 6) {
                console.log(`Each dice must have exactly 6 faces. Found ${faces.length} faces in dice: '${arg}'`);
                process.exit(0);
            }

            // Validate face values
            if (!Dice.validateFaces(faces)) {
                console.log(`Invalid face values in dice: ${arg}. All faces must be non-negative integers.`);
                process.exit(0);
            }

            return new Dice(faces);
        });

        return dice;
    }
}

const args = process.argv.slice(2);
const dice = DiceParser.parse(args);
const newGame = new DiceGame(dice);
newGame.start();
