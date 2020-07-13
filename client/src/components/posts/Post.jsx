import React, {Component} from 'react';
import PostLikes from './post/PostLikes';
import PostHeader from './post/PostHeader';

class Post extends Component{
    constructor(){
        super();

        this.state= {
            commentCount: 0
        }
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

    render(){
        const {uid, ownerId, postId, createdAt, deletePost, content, likes} = this.props;

        const {commentCount} = this.state;

        return(
            <div className ='post bg-white'>
                 <PostHeader
                    uid = {uid}
                    ownerId = {ownerId}
                    postId = {postId}
                    createdAt = {createdAt}
                    deletePost = {deletePost}
                />

                <main className='content'>
                    {content}
                </main>

                <section className='mt-4'>
                    <PostLikes
                                 uid = {uid}
                                 postId = {postId} 
                                 formatCount = {this.formatCount} 
                                 likes={likes}
                    />

                    <i className ='fas fa-comment-alt'/>
                    <span className='ml-2'>
                        {commentCount === 0? null: this.formatCount(commentCount)} 
                        {commentCount>1? " Comments": " Comment"}
                    </span>
                </section>
            </div>
        )
    }
}

export default Post;