import React from 'react';
import Post from './Post';
import './Posts.css';

function PostsList(){
    return(
        <div className='postslist'>
            <Post/>
        </div>
    )
}

export default PostsList;