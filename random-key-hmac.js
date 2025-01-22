import crypto from 'crypto';

class Cryptographics{
    static generateSecretKey() {
        return crypto.randomBytes(32); // 256 bits
    }

    static calculateHMAC(message, key) {
        const messageBuffer = Buffer.isBuffer(message) ? message : Buffer.from(message.toString());
        const keyBuffer = Buffer.isBuffer(key) ? key : Buffer.from(key, 'hex');

        const hmac = crypto.createHmac('sha3-256', keyBuffer);
        hmac.update(messageBuffer);
        return hmac.digest('hex').toUpperCase();
    }

    static generateRandomNumber(min, max) {
        // Calculate number of bits
        const range = max - min + 1;
        const bitsNeeded = Math.ceil(Math.log2(range));
        const bytesNeeded = Math.ceil(bitsNeeded / 8);
        
        let result;
        do {
            const randomBytes = crypto.randomBytes(bytesNeeded);
            result = randomBytes.reduce((acc, byte) => (acc << 8) + byte, 0);
            result = result >>> (bytesNeeded * 8 - bitsNeeded); // Remove extra bits
        } while (result >= range);

        return min + result;
    }
}

export default Cryptographics;