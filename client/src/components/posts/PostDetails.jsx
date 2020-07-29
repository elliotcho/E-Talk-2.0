import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteFromPostDetails} from '../../store/actions/postActions';
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

        this.props.deleteFromPostDetails(postId, this.props.posts);
        
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
                  comments = {JSON.stringify(post.comments)} 
                  deletePost={this.deletePost}
                  seeMore = {true}
            />
        );

        return(
            <div>
                {posts.length === 0? <h1 className='noposts text-center'>Post is Loading...</h1>: posts}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        posts: state.posts.list
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        deleteFromPostDetails: (postId, posts) => {dispatch(deleteFromPostDetails(postId, posts));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));