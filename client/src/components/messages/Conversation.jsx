import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class Conversation extends Component{
    render(){
        return(
            <div className ='convo'>
                <header>
                    <div className ='chat-info'>
                        <img src={loading} className='chat-pic' alt='chat pic'/>
                        <h2>Gugsa Challa, Jeet Undhad</h2>
                    </div>
                </header>

                <section className ='chat-box'>
                    <div className ='row no-gutters'>
                        <div className='msg-container'>
                            <div className ='msg msg-r my-1'>
                                <div className='msg-content'>
                                    Hello hello hello hello hello hello
                                </div>

                                <div className = 'read mx-1 my-1'>
                                    <img src = {loading} alt ='profile pic'/>
                                </div>
                            </div>

                            <img src = {loading} alt ='profile pic'/>
                        </div>
                    </div>

                    <div className ='row no-gutters'>
                        <div className='msg-container'>
                            <img src = {loading} alt ='profile pic'/>

                            <div className ='msg msg-l my-1'>
                                <div className='msg-content'>
                                    Hello hello hello hello hello hello
                                </div>

                                <div className = 'read my-1 mx-1'>
                                    <img src = {loading} alt ='profile pic'/>
                                    <img src = {loading} alt ='profile pic'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Conversation;