import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthHelper {

    /**
     * @description - This methods encrypts raw password strings
     * @param {String} password 
     * @returns hased password
     */
    static EncryptPassword(password) {
        const saltRounds = 10;

        return bcrypt.hashSync(password, saltRounds);
    }

    /**
     * @description - This method compares user password
     * @param {String} password 
     * @param {String} hash 
     */
    static async comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash, (err, res) => res);
    }

    static generateToken(payload) {
        return jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '24h' });
    }
}

