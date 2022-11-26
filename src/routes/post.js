'use strict';
const PostController = require( '../controllers/PostController' );
const express = require( 'express' ),
    router = express.Router();
const AuthMiddleware = require( '../middlewares/Auth/AuthMiddleware');

router.get( '/', AuthMiddleware.checkLogin, PostController.getAll );
router.get( '/:id', PostController.get );
router.post( '/', PostController.insert );
router.put( '/:id', PostController.update );
router.delete( '/:id', PostController.delete );


module.exports = router;
