import { Users } from '../database/models';
import AuthHelper from '../helpers/auth.helper';
import ErrorHelper from '../helpers/error.helper';

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
            res.status(201).json({
                message: 'Signup Success',
                user
            })
        } catch (error) {
            res.status(401).json(ErrorHelper.handleAuthInputError(error))
        }
    }

    /**
     * @description - This method logs in a user
     * @param {Object} req 
     * @param {Object} res 
     */
    static async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await Users.findOne({
                where: { email }
            });
            if (user !== null) {
                const ownsPassword = await AuthHelper.comparePassword(password, user.password);
                if (ownsPassword) {
                    const token = AuthHelper.generateToken(
                        {
                            id: user.id,
                            email: user.email
                        }
                    )
                    res.status(200).json({
                        message: 'Login Success',
                        user,
                        token
                    });
                } else {
                    res.status(400).json({
                        message: 'Incorrect email or password'
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Incorrect email or password'
                })
            }
        } catch (error) {
            res.status(400).json(ErrorHelper.handleAuthInputError(error))
            // res.send(error);
        }
    }
}
