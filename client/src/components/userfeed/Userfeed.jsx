import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PostList from '../posts/PostList';
import './Userfeed.css';

function Userfeed({uid}){
    if(!uid){
        return <Redirect to='/'/>
    }

    return (
        <div className='userfeed'>    
            <PostList profileId = {null}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(Userfeed);