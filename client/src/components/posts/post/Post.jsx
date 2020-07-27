import React, {Component} from 'react';
import PostLikes from './likes/PostLikes';
import PostComments from './comments/PostComments';
import PostHeader from './PostHeader';

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

    computeContent(content){
        let res = "";
        let charsLeft =312;
        let limitExceeded = false;

        for(let i =0;i<content.length;i++){
            if(charsLeft <=0 ){
                limitExceeded=true;
                break;
            }

            else if(content[i] === '\n'){
                res+=content[i];
                charsLeft-=63;
            }

            else{
                res+=content[i];
                charsLeft--;
            }
        }

        if(limitExceeded){res += "...";}

        return [res, limitExceeded];
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
            comments
        } = this.props;
        
        const contentArray = this.computeContent(content);

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

                <main className='content'>
                    {contentArray[1]? 
                    (<div> 
                        {contentArray[0] + '\n'} 
                        <span className ='ml-1 see-more'>See More</span>
                    </div>):
                    contentArray[0]}
                </main>

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