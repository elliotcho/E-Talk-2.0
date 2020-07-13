import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import PostList from '../posts/PostList';
import ActiveBar from '../friends/ActiveBar';
import SearchBar from '../friends/SearchBar';
import './Userfeed.css';

class Userfeed extends Component{
    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to='/'/>
        }

        return (
            <div className='userfeed'>
                <Navbar/>
                
                <div className='row'>
                    <SearchBar uid = {uid}/>

                    <section className='col-12 col-md-6 col-xl-6'>
                        <PostList/>
                    </section>

                    <ActiveBar/>
                </div>
            </div>
        )
    }
}

export default Userfeed;