import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PostList from '../posts/PostList';
import './Userfeed.css';

class Userfeed extends Component{
    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to='/'/>
        }

        return (
            <div className='userfeed'>    
                <PostList/>
            </div>
        )
    }
}

export default Userfeed;