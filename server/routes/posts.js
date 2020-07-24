const {Post} = require('../dbschemas');
const router = require('express').Router();

router.get('/:uid', (req, res) =>{
    if(req.params.uid !== "empty"){
        Post.find({uid: req.params.uid}).then(result =>{
            result.sort((a, b) => b.createdAt - a.createdAt);
            res.json(result);
        });
    }

    else{
        Post.find({}).then(result =>{
            result.sort((a, b) => b.createdAt - a.createdAt);
            res.json(result);
        });
    }
});

router.post('/create', (req, res) =>{
    const newPost = new Post({
        uid: req.body.uid,
        createdAt: new Date(),
        content: req.body.content,
        likes: [],
        comments: []
    });

    newPost.save().then(() =>{
        res.json("Success");
    });
});

router.delete('/:id', (req, res) =>{
    Post.deleteOne({_id: req.params.id}).then(()=>{
        res.json("Success");
    });
});

router.post('/like', (req, res) =>{
    const {uid, postId, userLiked} = req.body;

    Post.findOne({_id: postId}).then(result=>{ 
        const likes = [...result.likes];

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
        const {likes} = result;

        if(likes.includes(uid)){
            res.json({userLiked: true, likes});
        }
 
        else{
            res.json({userLiked: false, likes});
        }
    });
});

module.exports = router;