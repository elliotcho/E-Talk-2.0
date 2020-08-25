const router = require('express').Router();

const {
    getPost,
    deletePost,
    getFeedPosts,
    getProfilePosts,
    createPost,
    handlePostLike,
    checkUserLike,
    createComment,
    deleteComment
} = require('../controllers/post');

router.get('/:postId', getPost);  
router.delete('/:postId', deletePost); 
router.get('/feed/:uid', getFeedPosts);
router.post('/profile', getProfilePosts);
router.post('/create', createPost);
router.post('/like', handlePostLike);
router.post('/userliked', checkUserLike);
router.post('/comment', createComment);
router.post('/deletecomment', deleteComment);

module.exports = router;