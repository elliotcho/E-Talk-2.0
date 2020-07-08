import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from '../partials/Navbar';

class Userfeed extends Component{


    render(){
        if(!this.props.uid){
            return <Redirect to='/'/>
        }

        return (
            <div>
                <Navbar/>
                <input type='text'/>
            </div>
        )
    }
}

export default Userfeed;