const { UserService } = require( './../services/UserService' );
const { User } = require( './../models/User' );
const autoBind = require( 'auto-bind' );
const userService = new UserService(
        new User().getInstance()
    );

class UserController {
    constructor( service ) {
        this.service = service;
        autoBind( this );
    }
    async editProfile( req, res, next ) {
        try {
            const response = await this.service.editProfile( req.user , req.body , next );
            await res.status( response.statusCode ).json( response );
        } catch ( e ) {
            next( e );
        }
    }
   
}

module.exports = new UserController( userService );
