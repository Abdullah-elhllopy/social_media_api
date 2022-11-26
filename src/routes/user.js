'use strict';
const UserController = require( '../controllers/UserController' );
const AuthMiddleware = require( '../middlewares/Auth/AuthMiddleware')
const express = require( 'express' ),
    router = express.Router();

router.post( '/edit-profile', AuthMiddleware.checkLogin, UserController.editProfile );
// router.get( '/logout', AuthMiddleware.checkLogin, AUthController.logout );
// router.post( '/register', AUthController.register );
// router.post( '/changePassword', AuthMiddleware.checkLogin, AUthController.changePassword );

module.exports = router;
