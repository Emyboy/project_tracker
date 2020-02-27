import bcrypt from 'bcrypt';


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
}

