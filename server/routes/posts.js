const {User, Post, Comment} = require('../dbschemas');
const router = require('express').Router();

router.get('/:id', (req, res) =>{
    const {id} = req.params; 

    Post.findOne({_id: id}).then(result =>{
        res.json([result]); 
    }); 
});  
 
router.delete('/:id', (req, res) =>{
    Post.deleteOne({_id: req.params.id}).then(()=>{
        res.json("Success"); 
    });
}); 
  
router.post('/', (req, res) =>{   
    const {uid, profileId} = req.body;

    if(profileId !== "empty"){
        Post.find({uid: profileId}).then(result =>{
            result.sort((a, b) => b.createdAt - a.createdAt);
            res.json(result); 
        });
    }

    else{
        User.findOne({_id: uid}).then(result =>{
            const {friends} = result; 

            friends.push(uid);

            Post.find({uid: {$in: friends}}).then(posts =>{
                posts.sort((a, b) => b.createdAt - a.createdAt);
                res.json(posts);
            });
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
        if(result === null){
            res.json({msg: 'Post no longer exists'});
        }
 
        else{
            const {likes} = result;

            if(likes.includes(uid)){ 
                res.json({userLiked: true, likes});
            }
    
            else{ 
                res.json({userLiked: false, likes});
            }
        }
    });
});

router.post('/comment', (req, res)=>{
    const {postId, uid, content} = req.body;

    Post.findOne({_id: postId}).then(result =>{
        const {comments} = result;

        if(result === null){
            res.json({msg:"Post not found"});
        }

        else{
            const newComment = new Comment({
                uid,
                createdAt: new Date(),
                content,
                likes: []
            });

            comments.push(newComment);

            comments.sort((a,b) => b.createdAt - a.createdAt);

            Post.updateOne({_id: postId}, {comments}).then(() =>{
                res.json(comments);
            });
        }
    });
});

module.exports = router;