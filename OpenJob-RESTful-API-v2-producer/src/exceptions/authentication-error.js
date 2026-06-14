import ClientError from "./client-error.js";

class AuthenticationError extends ClientError {
    constructor(messages) {
        super(messages, 401);
        this.name = 'AuthenticationError';
    }
}

export default AuthenticationError;