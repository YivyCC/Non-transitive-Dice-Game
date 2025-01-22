class ProbabilityCalculator {
    constructor(dice) {
        this.dice = dice;
    }

    calculateProbability(dice1, dice2) {
        let wins = 0;
        let total = dice1.faces.length * dice2.faces.length;

        // Compare each possible combination
        for (let face1 of dice1.faces) {
            for (let face2 of dice2.faces) {
                if (face1 > face2) {
                    wins++;
                }
            }
        }

        // Return probability as percentage
        return (wins / total * 100).toFixed(1);
    }

    generateProbabilityMatrix() {
        const matrix = [];
        
        // Generate probability for each dice pair
        for (let i = 0; i < this.dice.length; i++) {
            matrix[i] = [];
            for (let j = 0; j < this.dice.length; j++) {
                if (i === j) {
                    matrix[i][j] = "---"; // The same dice cannot be picked twice so the probability against itself is not neccesary
                } else {
                    matrix[i][j] = this.calculateProbability(this.dice[i], this.dice[j]);
                }
            }
        }

        return matrix;
    }
}

export default ProbabilityCalculator;