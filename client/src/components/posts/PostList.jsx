import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    getFeedPosts,
    getProfilePosts, 
    createPost, 
    deletePost
} from '../../store/actions/postActions';

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
        const {uid, profileId}  = this.props;

        if(profileId === null){
            this.props.getFeedPosts(uid);
        }

        else{
            this.props.getProfilePosts(uid, profileId);
        }
    }

    addPost(content){
        const {uid, profileId} = this.props;

        if(profileId === null){
            this.props.createPost(uid, content);
        }

        else{
            this.props.createPost(uid, content, profileId);
        }
    }

    deletePost(postId){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }

        this.props.deletePost(postId);
    }

    render(){
        const posts = this.props.posts.map(post =>(
            <Post 
                  key = {post._id}  
                  postId = {post._id} 
                  ownerId = {post.uid}
                  uid = {this.props.uid}
                  profileId = {this.props.profileId}
                  createdAt = {post.createdAt}
                  content = {post.content}
                  likes = {post.likes}
                  comments = {JSON.stringify(post.comments)} 
                  deletePost={this.deletePost}
                  seeMore = {false}
            />
        ));

        const {uid, profileId} = this.props;

        return(
            <div className='mb-5'>
                {(profileId === null || profileId === uid)? 
                    <CreatePost addPost ={this.addPost}/>: 
                    null}
                
                {posts.length === 0 ? 
                    <h1 className='noposts text-center'>No posts available</h1>: 
                    posts}
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

const mapDispatchToProps = (dispatch) =>{
    return{
        createPost: (uid, content) => {dispatch(createPost(uid, content));},
        getFeedPosts: (uid) => {dispatch(getFeedPosts(uid));},
        getProfilePosts: (uid, profileId) => {dispatch(getProfilePosts(uid, profileId));},
        deletePost: (postId) => {dispatch(deletePost(postId));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);