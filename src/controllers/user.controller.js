import { Users } from '../database/models';
import AuthHelper from '../helpers/auth.helper';

export default class UserController {

    /**
     * @description - This method signs a user up
     * @param {Object} req 
     * @param {Object} res 
     */
    static async signupUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = AuthHelper.EncryptPassword(password)
            const user = await Users.create({ username, email, password: hashedPassword })
            res.status(200).json({
                message: 'Signup Success',
                user
            })
        } catch (error) {
            res.status(500).jons({
                message: error
            })
        }
    }
}
