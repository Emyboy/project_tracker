import { Users } from '../database/models';

export default class UserController {

    /**
     * @description - This method signs a user up
     * @param {Object} req 
     * @param {Object} res 
     */
    static async signupUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await Users.create({ username, email, password })
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
