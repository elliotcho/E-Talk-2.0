import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    constructor(){
        super();

        this.state = {
            chat: {}
        }
        
        this.formatContent = this.formatContent.bind(this);
    }

    formatContent(){
        let res = "";

        const chat = JSON.parse(this.props.chat);
        const messages = chat.messages;

        messages.sort((a,b)=> b.timeSent - a.timeSent);

        const content = chat.messages[0].content;

        if(content.length>20){
            res = content.substring(0, 20) + "...";
        }

        else{
            res = content;
        }

        return res;
    }

    render(){
        const chat = JSON.parse(this.props.chat);
        
        const {activeId} = this.props;

        const active = (activeId === chat._id)? 'active': '';

        return(
            <div className ={`msg-card ${active} card flex-row flex-wrap`}>         
                    <div className ='card-header border-0'>
                        <img src={loading} alt='profile-pic'/>
                    </div>
                      
                   <div className ='card-block'>
                        <h3>Gugsa Challa</h3>
                        
                        <p>
                            {this.formatContent()}
                        </p>
                        
                        <p className='text-muted'>October 15, 2019</p>
                   </div>
            </div>
        )
    }
}

export default MessageCard;