import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Network extends Component{
    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        return(
            <div className ='text-white'>
                Friend Request page... Under construction
            </div>
        )
    }
}

export default Network;