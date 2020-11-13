import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updatePost, reloadPosts} from '../../../store/actions/postActions';
import PostLikes from './likes/PostLikes';
import PostComments from './comments/PostComments';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import EditModal from '../../layout/EditModal';

class Post extends Component{
    constructor(){
        super();
        this.toPostDetails = this.toPostDetails.bind(this);
        this.editPost = this.editPost.bind(this);
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

        return num;
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

    async editPost(newContent){
        const {dispatch, posts, postId} = this.props;

        await updatePost(postId, newContent);

        for(let i=0;i<posts.length;i++){
            if(posts[i]._id === postId){
                posts[i].content = newContent;
                break;
            }
        }

        dispatch(reloadPosts(posts));
    }

    render(){
        const {
            uid,
            postId,
            ownerId,
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
                    toPostDetails = {this.toPostDetails}
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

                <button 
                    id='open-edit' 
                    data-toggle='modal' 
                    data-target='#edit'
                    style = {{display: 'none'}}
                />

                <EditModal 
                    title = 'Edit your post'
                    content={content} 
                    editContent={this.editPost}
                    maxLength = {null}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({posts: state.posts.posts});
const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));