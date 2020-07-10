import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PostsList from '../posts/PostsList';
import Navbar from '../layout/Navbar';
import './Userfeed.css';

class Userfeed extends Component{


    render(){
        if(!this.props.uid){
            return <Redirect to='/'/>
        }

        return (
            <div className='userfeed'>
                <Navbar/>
                
                <PostsList/>
            </div>
        )
    }
}

export default Userfeed;