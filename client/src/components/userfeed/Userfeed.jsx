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
                
                <div className='container-fluid'>
                    <div className='row'>
                        <section className='col-12'>
                            <PostList/>
                        </section>

                    </div>
                </div>
            </div>
        )
    }
}

export default Userfeed;