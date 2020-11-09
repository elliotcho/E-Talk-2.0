import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as postActions from '../../store/actions/postActions';
import Post from './post/Post';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Posts.css';

class PostDetails extends Component{
    constructor(){
        super(); 
        this.deletePost = this.deletePost.bind(this);
    }

    async componentDidMount(){
        const postId = this.props.match.params.id;
        const {dispatch} = this.props;
        
        const post = await postActions.getPost(postId);
        const postList = [post];

        dispatch(postActions.reloadPosts(postList));
    }

    deletePost(postId){
        const confirmDeletePost = () => {
            const {dispatch} = this.props;

            dispatch(postActions.deletePostFromList(postId));
            
            this.props.history.push('/'); 
        }

        confirmAlert({
            title: 'E-Talk',
            message: 'Are you sure you want to this post?',
            buttons: [
                {label: 'Yes', onClick: confirmDeletePost},
                {label: 'No', onClick: () => {return;}}
            ]
        });
    }

    render(){
        const {uid, posts} = this.props;

        return(
            <div>
                {posts.length === 0? <h1 className='noposts text-center'>Post is Loading...</h1>:
                    posts.map(post => 
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
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid: state.auth.uid,
        posts: state.posts.posts
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));