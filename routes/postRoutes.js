const express = require('express');
const router = express.Router();

const {newBlogPost, 
    getBlogPosts, 
    getSingleBlogPost, 
    updateBlogPost, 
    deleteBlogPost
} = require('../controllers/postControllers');

const upload = require('../middlewares/upload');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth');

router.route('/blogs').get(getBlogPosts);

router.route('/blog/:_id').get(getSingleBlogPost);

router.route('/blog/new').post(upload.single('photo'), isAuthenticatedUser, newBlogPost);

router.route('/admin/blog/:_id').put(isAuthenticatedUser, authorizedRoles('admin'), updateBlogPost);

router.route('/admin/blog/:_id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteBlogPost);

module.exports = router;