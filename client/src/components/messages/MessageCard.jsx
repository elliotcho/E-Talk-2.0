import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import loading from '../../images/loading.jpg';

class MessageCard extends Component{
    constructor(){
        super();

        this.state = {
            chat: {}, 
            read: false, 
            memberNames: ''
        }
        
        this.formatContent = this.formatContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.formatMemberNames = this.formatMemberNames.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    async componentDidMount(){
        const {uid, chat, activeChatId, readChat} = this.props;

        if(activeChatId === JSON.parse(chat)._id){
            await readChat(uid, JSON.parse(chat)._id);
        }

        const memberNames = await this.formatMemberNames(JSON.parse(chat).members);

        const messages = JSON.parse(this.props.chat).messages;
        const n = messages.length;

        if(messages[n-1].readBy.includes(uid)){
            this.setState({
                read: true,
                memberNames
            });
        }
    }

    async componentDidUpdate(){
        const {uid, chat, activeChatId, readChat} = this.props;

        if(activeChatId === JSON.parse(chat)._id){
            await readChat(uid, JSON.parse(chat)._id);
        }
    }

    formatContent(){
        let res = "";

        const chat = JSON.parse(this.props.chat);
        const messages = chat.messages;
        const n = messages.length;

        messages.sort((a,b)=> b.timeSent - a.timeSent);

        const content = chat.messages[n-1].content;

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

    async formatMemberNames(members){
        const {uid} = this.props;

        members.splice(members.indexOf(uid), 1);

        let result = "";

        for(let i=0;i<members.length;i++){
            let id = members[i];

            let user = await axios.get(`http://localhost:5000/users/${id}`);

            result+= `${user.data.firstName} ${user.data.lastName}`

            if(i !== members.length - 1){
                result+=', ';
            }

            else{
                result+='';
            }
        }

        return result;
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
                        <h3>{this.state.memberNames}</h3>
                        
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