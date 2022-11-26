'use strict';
const MediaController = require( '../controllers/MediaController' );
const AuthMiddleware = require( '../middlewares/Auth/AuthMiddleware');
const express = require( 'express' ),
    router = express.Router();
const AuthController = require( '../controllers/AuthController' );

router.get( '/:id', AuthMiddleware.checkLogin, MediaController.get );
router.post( '/', [ AuthMiddleware.checkLogin, MediaController.upload.single( 'file' ) ], MediaController.insert );
router.delete( '/:id', AuthMiddleware.checkLogin, MediaController.delete );


module.exports = router;
