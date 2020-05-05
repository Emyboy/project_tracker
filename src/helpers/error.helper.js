
export default class ErrorHelper {
    /**
     * @description - This method handles auth input error (login/signup)
     * @param {Object} error 
     */
    static handleAuthInputError(error){
        console.log('========== ERROR ============', error);
        const { type, path } = error.errors[0];
        switch (type) {
            case 'unique violation':
                if(path === 'username'){
                    return {
                        message: 'username already in use',
                        error
                    }
                }else if (path === 'email'){
                    return {
                        message: 'email already in use',
                        error
                    }
                }
                break;
            case 'Validation error':
                if(path === 'username'){
                    return {
                        message: 'username is empty',
                        error
                    }
                }else if (path === 'email'){
                    return {
                        message: 'email is empty',
                        error
                    }
                }else if(path === 'password'){
                    return {
                        message: 'password is empty',
                        error
                    }
                }
                break;
            default:
                return {
                    message: 'internal server error',
                    error
                }
        }
    }


}
