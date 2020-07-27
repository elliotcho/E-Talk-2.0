import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Post from './post/Post';
import axios from 'axios';
import './Posts.css'

class PostDetails extends Component{
    constructor(){
        super(); 

        this.state = {
            posts: []
        }

        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount(){
        const postId = this.props.match.params.id;

        axios.get(`http://localhost:5000/posts/${postId}`).then(response =>{
            this.setState({posts: response.data});
        });
    }

    deletePost(postId){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }

        this.setState({posts: []});

        axios.delete(`http://localhost:5000/posts/${postId}`).then(() =>{
            this.props.history.push('/'); 
        });
    }

    render(){
        const {uid} = this.props;

        const posts = this.state.posts.map(post =>
            <Post key = {post._id}  
                  postId = {post._id} 
                  ownerId = {post.uid}
                  uid = {uid}
                  profileId = {null}
                  createdAt = {post.createdAt}
                  content = {post.content}
                  likes = {post.likes}
                  comments = {post.comments} 
                  deletePost={this.deletePost}
            />
        );

        return(
            <div>
                {posts.length === 0? <h1 className='noposts text-center'>Post is Loading...</h1>: posts}
            </div>
        )
    }
}

export default withRouter(PostDetails);