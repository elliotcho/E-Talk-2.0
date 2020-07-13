import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createPost, getPosts, deletePost} from '../../store/actions/postActions';
import CreatePost from './CreatePost';
import Post from './Post';
import './Posts.css';

class PostsList extends Component{
    constructor(){
        super();
        this.addPost = this.addPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount(){
        this.props.getPosts();
    }

    addPost(content){
        this.props.createPost(this.props.uid, content);
    }

    deletePost(id){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }

        this.props.deletePost(id);
    }

    render(){
        const posts = this.props.posts.map(post =>(
            <Post key = {post._id}  
                  postId = {post._id} 
                  ownerId = {post.uid}
                  uid = {this.props.uid}
                  createdAt = {post.createdAt}
                  content = {post.content}
                  likes = {post.likes}
                  comments = {post.comments} 
                  deletePost={this.deletePost}
            />
        ));

        return(
            <div className='mb-5'>
                <CreatePost addPost ={this.addPost}/>
                {posts.length === 0 ? <h1 className='noposts text-center'>No posts available</h1>: posts}
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
        createPost: (uid, content) => {dispatch(createPost(uid, content));},
        getPosts: () => {dispatch(getPosts());},
        deletePost: (id) => {dispatch(deletePost(id));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);