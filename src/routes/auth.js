'use strict';
const AUthController = require( '../controllers/AuthController' );
const AuthMiddleware = require( '../middlewares/Auth/AuthMiddleware')
const express = require( 'express' ),
    router = express.Router();

router.post( '/login', AUthController.login );
router.get( '/logout', AuthMiddleware.checkLogin, AUthController.logout );
router.post( '/register', AUthController.register );
router.post( '/changePassword', AuthMiddleware.checkLogin, AUthController.changePassword );

module.exports = router;
