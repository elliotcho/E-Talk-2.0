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
            msg: 'liked your post!',
            type: 'LIKE_POST'
        });

        await newNotification.save();

        return post.uid;
    }
}

exports.unlikePost = async (data) =>{
    const {senderId, postId} = data;

    const post = await Post.findOne({_id: postId});

    await Notification.deleteOne({postId: postId, senderId: senderId});
}