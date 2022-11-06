const router = require('express').Router()
const blogController = require('./../controllers/blog.controller')
const middleware = require('./../helpers/middleware');

router.get('/', blogController.list)
router.get('/:id', blogController.getPostById)
router.get('/:id/user-posts', middleware.auth, blogController.getUserPosts)
router.post('/create', middleware.auth, blogController.create)
router.patch('/:id/update', middleware.auth, blogController.update)
router.delete('/:id/delete', middleware.auth, blogController.delete)

module.exports=router;
