import Cryptographics from './random-key-hmac.js';

class FairNumberGenerator {
    constructor() {
        this.cryptographics = Cryptographics;
    }

    async generateFairNumber(range) {
        // Generate secret key for selection
        const key = this.cryptographics.generateSecretKey();
        
        // Generate computer's number. Either from 0-1 or 0-N depending on the game stage.
        const computerNumber = this.cryptographics.generateRandomNumber(0, range - 1);

        // Calculate HMAC        
        const hmac = this.cryptographics.calculateHMAC(computerNumber, key);
        
        return {
            key: key.toString('hex').toUpperCase(),
            hmac,
            computerNumber,
            range
        };
    }
}

export default FairNumberGenerator;