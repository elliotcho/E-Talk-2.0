import React, {Component} from 'react';
import PostLikes from './likes/PostLikes';
import PostComments from './comments/PostComments';
import PostHeader from './PostHeader';
import PostBody from './PostBody';

class Post extends Component{
    constructor(){
        super();

        this.state= {
            commentCount: 0
        }

        this.toPostDetails = this.toPostDetails.bind(this);
    }

    componentDidMount(){
       this.setState({comments: this.props.comments.length});
    }

    formatCount(num){
        if(num >= 1000000000){
            let billions = Math.floor(num/1000000000);
            let hundredMillions = Math.floor((num%1000000000)/100000000);

            return `${billions}.${hundredMillions}B`;
        }

        else if(num >= 1000000){
            let millions = Math.floor(num/1000000);
            let hundredThousands = Math.floor((num%1000000)/100000);

            return `${millions}.${hundredThousands}M`
        }

        else if(num >= 1000){
            let thousands = Math.floor(num/1000);
            let hundreds = Math.floor((num%1000)/100)

            return `${thousands}.${hundreds}K`
        }

        else{
            return num;
        }
    }

    toPostDetails(){
        const {postId} = this.props;

        if(this.props.location.pathname === `/post/${postId}`){
            window.location.reload();
        }

        else{
            this.props.history.push(`/post/${postId}`);
        }
    }

    render(){
        const {
            uid, 
            ownerId, 
            postId, 
            profileId, 
            createdAt, 
            content, 
            deletePost, 
            likes, 
            comments,
            seeMore
        } = this.props;
        
        return(
            <div className ='post bg-white'>
                 <PostHeader
                    uid = {uid}
                    ownerId = {ownerId}
                    postId = {postId}
                    profileId = {profileId}
                    createdAt = {createdAt}
                    deletePost = {deletePost}
                />

               <PostBody
                    content = {content}
                    seeMore = {seeMore}
                    toPostDetails = {this.toPostDetails}
               />

                <section className='mt-4'>
                    <PostLikes
                                 uid = {uid}
                                 postId = {postId} 
                                 likes = {likes}
                                 formatCount = {this.formatCount} 
                    />

                    <PostComments
                        uid = {uid}
                        postId = {postId}
                        comments = {comments}
                        formatCount ={this.formatCount}
                    />
                </section>
            </div>
        )
    }
}

export default Post;