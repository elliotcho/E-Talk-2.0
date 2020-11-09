import * as types from '../constants/actionTypes';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};

export const getPost = async (postId) =>{
    const response = await axios.get(`http://localhost:5000/posts/${postId}`); 
    return response.data;
}

export const getFeedPosts = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/posts/feed/${uid}`);
        const posts = response.data;

        dispatch({
            type: types.LOAD_POSTS, 
            posts
        });
    }
}

export const getProfilePosts = (uid, profileId) =>{
    return async (dispatch) =>{
        const response = await axios.post('http://localhost:5000/posts/profile', {uid, profileId}, config);
        const posts = response.data;

        dispatch({
            type: types.LOAD_POSTS, 
            posts
        });
    }
}

export const createPost = (uid, content) =>{
    return async (dispatch) =>{
        const response = await axios.post('http://localhost:5000/posts/create', {uid, content}, config);
        const newPost = response.data;

        dispatch({
            type: types.CREATE_POST, 
            newPost
        });
    }
}

export const deletePostFromList = (postId) => {
    return async (dispatch, getState) =>{
        await axios.delete(`http://localhost:5000/posts/${postId}`);

        const state = getState();
        const {posts} = state.posts;

        for(let i=0;i<posts.length;i++){
            if(posts[i]._id === postId){
                posts.splice(i, 1);
                break;
            }
        }
        
        dispatch({
            type: types.DELETE_POST, 
            posts
        });
    }
}

export const checkIfUserLiked = async (uid, postId) =>{
    const response = await axios.post('http://localhost:5000/posts/userliked', {uid, postId}, config);
    const {userLiked} = response.data;

    return userLiked;
}

export const likePost = async (uid, postId) =>{
    const data = {uid, postId};

    const response = await axios.post('http://localhost:5000/posts/like', data , config);
    return response.data;
}

export const unlikePost = async (uid, postId) => {
    await axios.post('http://localhost:5000/posts/unlike', {uid, postId} , config);
}

export const createComment = async (postId, uid, content) =>{
    const data = {
        uid,
        postId,
        content
    };

    const response =  await axios.post('http://localhost:5000/posts/comment',  data , config);
    return response.data;
}

export const deleteComment = async (uid, postId, commentId) =>{
    const config = {headers: {'content-type': 'application/json'}};

    const data = {
        uid,
        postId, 
        commentId
    };

    const response =  await axios.post('http://localhost:5000/posts/deletecomment', data, config);
    return response.data;
}

export const updatePost = async (postId, newContent) => {
    await axios.post('http://localhost:5000/posts/edit', {postId, newContent}, config);
}

export const reloadPosts = (posts) => {
    return (dispatch) => {
        dispatch({
            type: types.LOAD_POSTS,
            posts
        });
    }
}