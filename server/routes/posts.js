const {User, Post, Comment} = require('../dbschemas');
const router = require('express').Router();

router.post('/create', (req, res) =>{
    const newPost = new Post({
        uid: req.body.uid,
        createdAt: new Date(),
        content: req.body.content,
        likes: [],
        comments: []
    });

    newPost.save().then(() =>{
        Post.find({}).then(result =>{
            result.sort((a, b) => b.createdAt - a.createdAt);
            res.json(result);
        });
    });
});

router.get('/', (req, res) =>{
    Post.find({}).then(result =>{
        result.sort((a, b) => b.createdAt - a.createdAt);
        res.json(result);
    });
});


router.delete('/:id', (req, res) =>{
    Post.deleteOne({_id: req.params.id}).then(()=>{
        Post.find({}).then(result =>{
            result.sort((a, b) => b.createdAt - a.createdAt);
            res.json(result);
        });
    });
});

module.exports = router;