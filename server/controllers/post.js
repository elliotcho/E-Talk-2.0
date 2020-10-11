const {User} = require('../models/user');
const {Comment, Post} = require('../models/post');
const {Notification} = require('../models/notif');

exports.getPost = async (req, res) =>{
    const {postId} = req.params; 

    const post = await Post.findOne({_id: postId});

    if(post !== null){
        res.json(post);
    }
}

exports.deletePost = async (req, res) =>{
    const {postId} = req.params;

    await Post.deleteOne({_id: postId});
    await Notification.deleteMany({postId});

    res.json({msg: "Success"});
}

exports.getFeedPosts = async (req, res) =>{   
    const {uid} = req.params;
        
    const user = await User.findOne({_id: uid});

    const {friends} = user;
    friends.push(uid);

    const posts = await Post.find({uid: {$in: friends}});

    posts.sort((a, b) => b.createdAt - a.createdAt);

    res.json(posts);
}

exports.getProfilePosts = async (req, res) =>{
    const {uid, profileId} = req.body;

    const posts = await Post.find({uid: profileId});

    posts.sort((a, b) => b.createdAt - a.createdAt);

    res.json(posts);
}

exports.createPost = async (req, res) =>{
    const newPost = new Post({ 
        ...req.body,
        createdAt: new Date(),
        likes: [],
        comments: []
    });

    const post = await newPost.save();

    res.json(post);
}

exports.likePost = async (req, res) => {
    const {uid, postId} = req.body;

    const post = await Post.findOne({_id: postId});
    
    if(post !== null){
        const {likes} = post;
        likes.push(uid);

        await Post.updateOne({_id: postId}, {likes});

        if(post.uid !== uid){
            const newNotification = new Notification({
                receiverId: post.uid, 
                senderId: uid,
                postId: postId,
                date: new Date(),
                seen: false,
                msg: 'liked your post:',
                type: 'LIKE_POST'
            });
    
            await newNotification.save();

            const notifContent = ` ${newNotification.msg} ${post.content}`;

            res.json({
                receiverId: post.uid,
                notifContent
            });
        }

        else{
            res.json({
                receiverId: null, 
                notifContent: null
            });
        }
    }
}

exports.unlikePost = async (req, res) =>{  
    const {uid, postId} = req.body;

    const post = await Post.findOne({_id: postId});
    const {likes} = post;

    likes.splice(likes.indexOf(uid), 1);

    await Post.updateOne({_id: postId}, {likes});
    await Notification.deleteOne({postId, senderId: uid, type: 'LIKE_POST'});

    res.json({msg: "Post was unliked"});
}

exports.checkUserLike = async (req, res) =>{
    const {postId, uid} = req.body;

    const post = await Post.findOne({_id: postId});

    if(post === null){
        res.json({msg: 'Post no longer exists'});
    }

    else{
        const {likes} = post;

        if(likes.includes(uid)){
            res.json({userLiked: true});
        } else{
            res.json({userLiked: false});
        }
    }
}

exports.createComment = async (req, res)=>{
    const {postId, uid, content} = req.body;

    const post = await Post.findOne({_id: postId});

    if(post !== null){
        const {comments} = post;

        const newComment = new Comment({
            uid,
            createdAt: new Date(),
            content
        });

        comments.push(newComment);
        comments.sort((a, b) => b.createdAt - a.createdAt);
        
        await Post.updateOne({_id: postId}, {comments});

        if(post.uid !== uid){
            const newNotification = new Notification({
                receiverId: post.uid, 
                senderId: uid,
                postId: postId,
                date: new Date(),
                seen: false,
                msg: 'commented on your:',
                type: 'POST_COMMENT'
            });
    
            await newNotification.save();

            res.json({
                comments,
                receiverId: post.uid,
                notifContent: ` ${newNotification.msg} ${post.content}`
            });
        }

        else{
            res.json({
                comments,
                receiverId: null,
                notifContent: null
            });
        }
    }
}

exports.deleteComment =  async (req, res) =>{
    const {uid, postId, commentId} = req.body;

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
        await Notification.deleteOne({postId, senderId: uid, type: 'POST_COMMENT'});

        res.json(comments);
    }
}