import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PostList from '../posts/PostList';
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
                
                <div className='row'>
                    <section className ='col-xl-3 text-white'>
                        <h1>Find Users</h1>
                    </section>

                    <section className='col-12 col-xl-6'>
                        <PostList/>
                    </section>

                    <section className ='xl-3 text-white'>
                        <h1>Find Users</h1>
                    </section>
                </div>
            </div>
        )
    }
}

export default Userfeed;