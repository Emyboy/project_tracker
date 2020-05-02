import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class UserMiddleware {

    /**
     * @method verifyAuthHeader
     * @description Verifies that the authorization was set
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} - JSON response object
     */
    
    static async verifyAuthHeader(req, res, next) {
        const { authorization } = req.headers;
        try {
            const token = await authorization.split(' ')[1];
            const payload = await jwt.verify(token, process.env.PRIVATE_KEY);
            if(payload.id){
                next();
            }
        } catch (error) {
            console.log('===Token Error==============', error, '===================');
            res.status(401).json({
                status: 401,
                message: 'Unauthorized - Auth Error!'
            })
        }
       
    }
}
