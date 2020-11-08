const router = require('express').Router();

const {
    getPost,
    deletePost,
    getFeedPosts,
    getProfilePosts,
    createPost,
    likePost,
    unlikePost,
    checkUserLike,
    createComment,
    deleteComment,
    editPost
} = require('../controllers/post');

router.get('/:postId', getPost);  
router.delete('/:postId', deletePost); 
router.get('/feed/:uid', getFeedPosts);
router.post('/profile', getProfilePosts);
router.post('/create', createPost);
router.post('/like', likePost);
router.post('/unlike', unlikePost);
router.post('/userliked', checkUserLike);
router.post('/comment', createComment);
router.post('/deletecomment', deleteComment);
router.post('/edit', editPost);

module.exports = router;