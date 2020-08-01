const {Post, Notification} = require('../dbschemas');

exports.likePost = async (data) =>{
    const {senderId, postId} = data;

    const post = await Post.findOne({_id: postId});

    if(post!== null && post.uid !== senderId){
        const newNotification = new Notification({
            receiverId: post.uid, 
            senderId: senderId,
            postId: postId,
            date: new Date(),
            seen: false,
            msg: 'liked your post:',
            type: 'LIKE_POST'
        });

        await newNotification.save();

        return [post.uid, post.content];
    }
}

exports.unlikePost = async (data) =>{
    const {
        senderId, 
        postId
    } = data;

    await Notification.deleteOne({postId, senderId, type: 'LIKE_POST'});
}

exports.addComment = async (data) =>{
    const {senderId, postId} = data;

    const post = await Post.findOne({_id: postId});

    if(post!==null && post.uid!== senderId){
        const newNotification = new Notification({
            receiverId: post.uid, 
            senderId: senderId,
            postId: postId,
            date: new Date(),
            seen: false,
            msg: 'commented on your:',
            type: 'POST_COMMENT'
        });

        await newNotification.save();

        return [post.uid, post.content];
    }
    
    else{
        return [null, null];
    }
}

exports.removeComment = async (data) =>{
    const {
        senderId,
        postId
    } = data;

    await Notification.deleteOne({postId, senderId, type: 'POST_COMMENT'});
}