import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPosts, createPost, deletePost} from '../../store/actions/postActions';
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
        const {getPosts, uid, profileId}  = this.props;

        if(profileId === null){
            getPosts(uid);
        }

        else{
            getPosts(uid, profileId);
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

        const {uid, profileId} = this.props;

        if(profileId === null){
            this.props.deletePost(uid, postId);
        }

        else{
            this.props.deletePost(uid, postId, profileId);
        }
    }

    render(){
        const posts = this.props.posts.map(post =>(
            <Post key = {post._id}  
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
        posts: state.posts.list
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createPost: (uid, content, profileId) => {dispatch(createPost(uid, content, profileId));},
        getPosts: (uid, profileId) => {dispatch(getPosts(uid, profileId));},
        deletePost: (uid, postId, profileId) => {dispatch(deletePost(uid, postId, profileId));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);