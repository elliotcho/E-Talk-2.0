import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Userfeed extends Component{
    render(){
        if(!this.props.signedIn){
            return <Redirect to='/'/>
        }

        return (
            <div>HELLO</div>
        )
    }
}

export default Userfeed;