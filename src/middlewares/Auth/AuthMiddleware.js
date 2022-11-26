/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const { AuthService } = require('../../services/AuthService');
const { Auth } = require('../../models/Auth');
const { User } = require('../../models/User');
const autoBind = require('auto-bind');
const authService = new AuthService(
    new Auth().getInstance(), new User().getInstance()
);

class AuthMiddleware {
    constructor(service) {
        this.service = service;
        this.userModel = new User().getInstance();
        autoBind(this);
    }

    async checkLogin(req, res, next) {
        try {
            const token = this.extractToken(req);
            req.user = await this.service.checkLogin(token);
            req.authorized = true;
            req.token = token;
            next();
        } catch (e) {
            next(e);
        }
    }
    extractToken( req ) {
        if ( req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer' ) {
            return req.headers.authorization.split( ' ' )[ 1 ];
        } else if ( req.query && req.query.token ) {
            return req.query.token;
        }
        return null;
    }


}

module.exports = new AuthMiddleware(authService);