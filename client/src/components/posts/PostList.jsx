import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as postActions from '../../store/actions/postActions';
import CreatePost from './CreatePost';
import Post from './post/Post';
import './Posts.css';

class PostsList extends Component{
    constructor(){
        super();
        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount(){
        const {dispatch, uid, profileId}  = this.props;

        const {getFeedPosts, getProfilePosts} = postActions;

        //if profileId is null load the user feed's posts
        if(profileId === null){
            dispatch(getFeedPosts(uid));
        }

        //otherwise load the profile's posts
        else{
            dispatch(getProfilePosts(uid, profileId));
        }
    }

    addPost(content){
        const {dispatch, uid} = this.props;
        const {createPost} = postActions;

        dispatch(createPost(uid, content));
    }

    deletePost(postId){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }

        const {dispatch} = this.props;
        const {deletePostFromList} = postActions;

        dispatch(deletePostFromList(postId));
    }

    render(){
        const {uid, profileId} = this.props;

        const posts = this.props.posts.map(post =>(
            <Post 
                  key = {post._id}  
                  postId = {post._id} 
                  ownerId = {post.uid}
                  uid = {uid}
                  profileId = {profileId}
                  createdAt = {post.createdAt}
                  content = {post.content}
                  likes = {post.likes}
                  comments = {JSON.stringify(post.comments)} 
                  deletePost={this.deletePost}
                  seeMore = {false}
            />
        ));

        return(
            <div className='mb-5'>
                {(profileId === null || profileId === uid)? 
                    <CreatePost addPost ={this.addPost}/>: 
                    null
                }
                
                {posts.length !== 0 ? 
                    posts:
                    (<h1 className='noposts text-center'>
                        No posts available
                    </h1>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        uid: state.auth.uid,
        posts: state.posts.posts
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);