import React from 'react';
import loading from '../../images/loading.jpg';

function MessageBubble({msg, uid}){
    const msgStyle = (msg.uid === uid)? 'msg-r': 'msg-l';

    return(
        <div className ='row no-gutters'>
            <div className='msg-container'>
                <div className ={`msg ${msgStyle} my-1`}>
                    <div className='msg-content'>
                        {msg.content}
                    </div>

                    <div className = 'read mx-1 my-1'>
                        <img src = {loading} alt ='profile pic'/>
                        <img src = {loading} alt ='profile pic'/>
                    </div>
                </div>

                <img src = {loading} alt ='profile pic'/>
            </div>
        </div>
    )
}

export default MessageBubble;