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
        // TODO - send welcome email
        try {
            const { username, email, password } = req.body;
            const hashedPassword = AuthHelper.EncryptPassword(password)
            const user = await Users.create({ username, email, password: hashedPassword })
            res.status(201).json({
                message: 'Signup Success',
                user
            })
        } catch (error) {
            res.status(400).json(ErrorHelper.handleAuthInputError(error))
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

    /**
     * @description - This method gets a user by id
     * @param {Object} req 
     * @param {Object} res 
     */
    static async getUserById(req, res) {
        const { user_id } = req.params;
        try {
            const user = await Users.findOne({
                where: { id: user_id }
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(ErrorHelper.handleAuthInputError(error));
        }
    }

    /**
     * @description - This updates a user's profile
     * @param {Object} req 
     * @param {Object} res 
     */
    static async updateUserProfile(req, res) {
        const { user_id } = req.params;
        const { username, avatar_url } = req.body;
        try {
            const updatedUser = await Users.update({ username, avatar_url }, {
                where: { id: user_id }
            })
            res.status(200).json({
                message: "Profile Updated",
                updatedUser
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    /**
     * @description - this method deletes a users profile
     * @param {Object} req 
     * @param {Object} res 
     */
    static async deleteUserProfile(req, res) {
        const { user_id } = req.params;
        try {
            const deletedProfile = await Users.destroy({
                where: { id: user_id }
            });
            res.json(deletedProfile)
        } catch (error) {
            res.json(error);
        }
    }


}
