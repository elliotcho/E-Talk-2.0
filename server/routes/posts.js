const {User, Post, Comment} = require('../dbschemas');
const router = require('express').Router();

const getUserFeedPosts = (res) =>{
    Post.find({}).then(result =>{
        result.sort((a, b) => b.createdAt - a.createdAt);
        res.json(result);
    });
}

router.post('/create', (req, res) =>{
    const newPost = new Post({
        uid: req.body.uid,
        createdAt: new Date(),
        content: req.body.content,
        likes: [],
        comments: []
    });

    newPost.save().then(() =>{
        getUserFeedPosts(res);
    });
});

router.get('/', (req, res) =>{
    getUserFeedPosts(res);
});


router.delete('/:id', (req, res) =>{
    Post.deleteOne({_id: req.params.id}).then(()=>{
        getUserFeedPosts(res);
    });
});

router.post('/like', (req, res) =>{
    const {uid, postId, userLiked} = req.body;

    Post.findOne({_id: postId}).then(result=>{ 
        const likes = result.likes;

        if(userLiked){
            likes.push(uid);

            Post.updateOne({_id: postId}, {likes}).then(()=>{
                res.json({msg: "Post was liked"});
            });
        }

        else{
            likes.splice(likes.indexOf(uid), 1);

            Post.updateOne({_id: postId}, {likes}).then(()=>{
                res.json({msg: "Post was unliked"});
            });
        }
    });
});


router.post('/userliked', (req, res) =>{
    const {postId, uid} = req.body;

    Post.findOne({_id: postId}).then(result =>{
        if(result.likes.includes(uid)){
            res.json({userLiked: true});
        }

        else{
            res.json({userLiked: false});
        }
    });
});

module.exports = router;