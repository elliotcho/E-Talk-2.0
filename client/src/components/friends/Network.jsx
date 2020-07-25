import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Network.css';

import loading from '../../images/loading.jpg';

class Network extends Component{
    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        return(
            <div className = 'network'>
                <div>
                    <div className = 'request row d-flex justify-content-center'>
                        <div className = 'col-2 text-center'>
                            <img src ={loading} className ='img-fluid' alt ='profile pic'/>
                        </div>

                        <div className ='col-5'>
                            <h2>
                                <strong>Gugsa Challa</strong>
                                <span>Sent you a friend request</span>
                            </h2>
                        </div>

                        <div classname = 'col-1'>
                            Confirm
                        </div>

                        <div className ='col-1'>
                            Delete Request
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Network;