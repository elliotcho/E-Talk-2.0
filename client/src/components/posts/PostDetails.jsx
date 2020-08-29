import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteFromPostDetails, getPost} from '../../store/actions/postActions';
import Post from './post/Post';
import './Posts.css'

class PostDetails extends Component{
    constructor(){
        super(); 

        this.state = {
            post: null
        }

        this.deletePost = this.deletePost.bind(this);
    }

    async componentDidMount(){
        const postId = this.props.match.params.id;
        
        const post = await getPost(postId);
   
        this.setState({post});
    }

    async deletePost(postId){
        if(!window.confirm("Are you sure you want to delete this post?")){
            return;
        }

        await deleteFromPostDetails(postId);
        
        this.props.history.push('/'); 
    }

    render(){
        const {uid} = this.props;

        const {post} = this.state;

        return(
            <div>
                {!post? <h1 className='noposts text-center'>Post is Loading...</h1>:
                    (<Post 
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
                    />)
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(null, mapDispatchToProps)(PostDetails));