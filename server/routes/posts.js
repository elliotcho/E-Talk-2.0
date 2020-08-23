const {User, Notification, Post, Comment} = require('../dbschemas');

const router = require('express').Router();

router.get('/:postId', async (req, res) =>{
    const {postId} = req.params; 

    const post = await Post.findOne({_id: postId});

    if(post !== null){
        res.json([post]);
    }
});  
 
router.delete('/:postId', async (req, res) =>{
    const {postId} = req.params;

    await Post.deleteOne({_id: postId});
    await Notification.deleteMany({postId});

    res.json({msg: "Success"});
}); 
  
router.post('/', async (req, res) =>{   
    const {uid, profileId} = req.body;

    if(profileId !== "empty"){
        const posts = await Post.find({uid: profileId});

        posts.sort((a, b) => b.createdAt - a.createdAt);

        res.json(posts);
    }

    else{
        const user = await User.findOne({_id: uid});

        const {friends} = user;
        friends.push(uid);

        const posts = await Post.find({uid: {$in: friends}});

        posts.sort((a, b) => b.createdAt - a.createdAt);

        res.json(posts);
    }
});

router.post('/create', async (req, res) =>{
    const {uid, content} = req.body

    const newPost = new Post({ 
        uid,
        createdAt: new Date(),
        content,
        likes: [],
        comments: []
    });

    await newPost.save();

    res.json({msg: "Success"});
});

router.post('/like', async (req, res) =>{  
    const {uid, postId, userLiked} = req.body;

    const post = await Post.findOne({_id: postId});
    const {likes} = post;

    if(userLiked){
        likes.push(uid);

        await Post.updateOne({_id: postId}, {likes});

        res.json({msg: "Post was liked"});
    }

    else{
        likes.splice(likes.indexOf(uid), 1);

        await Post.updateOne({_id: postId}, {likes});

        res.json({msg: "Post was unliked"});
    }
});

router.post('/userliked', async (req, res) =>{
    const {postId, uid} = req.body;

    const post = await Post.findOne({_id: postId});

    if(post === null){
        res.json({msg: 'Post no longer exists'});
    }

    else{
        const {likes} = post;

        if(likes.includes(uid)){
            res.json({userLiked: true, likes});
        }

        else{
            res.json({userLiked: false, likes});
        }
    }
});

router.post('/comment', async (req, res)=>{
    const {postId, uid, content} = req.body;

    const post = await Post.findOne({_id: postId});

    if(post === null){
        res.json({msg: "Post not found"});
    }

    else{
        const {comments} = post;

        const newComment = new Comment({
            uid,
            createdAt: new Date(),
            content
        });

        comments.push(newComment);
        comments.sort((a, b) => b.createdAt - a.createdAt);

        await Post.updateOne({_id: postId}, {comments});

        res.json(comments);
    }
});

router.post('/deletecomment', async (req, res) =>{
    const {postId, commentId} = req.body;

    const post = await Post.findOne({_id: postId});

    if(post === null){
        res.json({msg: 'Post not found'});
    }

    else{
        const {comments} = post;

        for(let i=0;i<comments.length;i++){
            if(String(comments[i]._id) === commentId){
                comments.splice(i, 1);
                break;
            }
        }

        await Post.updateOne({_id: postId}, {comments});

        res.json(comments);
    }
});

module.exports = router;