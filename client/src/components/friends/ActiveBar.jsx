import React, {Component} from 'react';
import './Friends.css';

class ActiveBar extends Component{
    render(){
        return(
            <section className ='text-white text-center col-xl-2 active-users'>
                <h3>Chat</h3>
               
                <p className='text-muted'>30 Online</p>
            </section>
        )
    }
}

export default ActiveBar;