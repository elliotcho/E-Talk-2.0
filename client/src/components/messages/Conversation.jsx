import React, {Component} from 'react';
import axios from 'axios';
import MessageBubble from './MesssageBubble';
import loading from '../../images/loading.jpg';

class Conversation extends Component{
    constructor(){
        super();

        this.state = {
            chat: null,
            memberNames: ''
        }

        this.formatMemberNames = this.formatMemberNames.bind(this);
    }

    componentDidMount(){
        const {chatId} = this.props;

        if(chatId !== 'home' && chatId !=='new'){
            axios.get(`http://localhost:5000/chats/${chatId}`).then(async response =>{
                const memberNames = await this.formatMemberNames(response.data.members);

                this.setState({
                    chat: response.data,
                    memberNames
                });
            });
        }
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

    render(){
        const {chat, memberNames} = this.state;

        const {uid} = this.props;

        return(
            <div className ='convo'>
                <header>
                    <div className ='chat-info'>
                        <img src={loading} className='chat-pic' alt='chat pic'/>
                        <h2>
                            {memberNames}
                        </h2>
                    </div>
                </header>

                <section className ='chat-box'>
                    {chat? chat.messages.map(msg =>
                        <MessageBubble key={msg._id} msg={msg} uid={uid}/>
                    ): null}
                </section>
            </div>
        )
    }
}

export default Conversation;