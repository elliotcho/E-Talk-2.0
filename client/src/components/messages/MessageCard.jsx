import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    constructor(){
        super();

        this.state = {
            chat: {}, 
            read: false
        }
        
        this.formatContent = this.formatContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount(){
        const {uid} = this.props;

        const messages = JSON.parse(this.props.chat).messages;
        const n = messages.length;

        if(messages[n-1].readBy.includes(uid)){
            this.setState({
                read: true
            });
        }
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

    formatDate(){
        const messages = JSON.parse(this.props.chat).messages;
        const n = messages.length;

        return messages[n-1].timeSent;
    }

    handleClick(){
        const chat = JSON.parse(this.props.chat);
        this.props.history.push(`/chat/${chat._id}`);
    }

    render(){
        const chat = JSON.parse(this.props.chat);
        
        const {activeChatId} = this.props;

        const active = (activeChatId === chat._id)? 'active': '';

        return(
            <div className ={`msg-card ${active} card flex-row flex-wrap`} onClick = {this.handleClick}>         
                    <div className ='card-header border-0'>
                        <img src={loading} alt='profile-pic'/>
                    </div>
                      
                   <div className ='card-block'>
                        <h3>Gugsa Challa</h3>
                        
                        <p>
                            {this.state.read?
                                this.formatContent():
                               <strong className ='text-dark'>{this.formatContent()}</strong>
                            }
                        </p>
                        
                        <p className='text-muted'>{moment(this.formatDate()).calendar()}</p>
                   </div>
            </div>
        )
    }
}

export default withRouter(MessageCard);