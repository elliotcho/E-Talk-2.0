import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getReadReceipts, getMessageImage} from '../../../store/actions/messagesActions';
import {getProfilePic} from '../../../store/actions/profileActions';
import loading from '../../../images/loading.jpg';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state = {
            ownerImgURL: null,
            attachedImgURL: null,
            readReceipts: []
        }

        this.loadReadReceipts = this.loadReadReceipts.bind(this);
        this.toProfile = this.toProfile.bind(this);
    }

    async componentDidMount(){
        const {chatId, msgId, hasImage, senderId, showRead} = this.props;
    
        const ownerImgURL = await getProfilePic(senderId);
        let attachedImgURL = null;

        if(showRead){
            await this.loadReadReceipts();
        }

        if(hasImage){
            attachedImgURL = await getMessageImage(chatId, msgId);
        }

        this.setState({
            ownerImgURL,
            attachedImgURL
        });
    }

    async componentDidUpdate(prevProps){
        const {showRead, readBy} = this.props;

        

        if((readBy.length !== prevProps.readBy.length) || (showRead !== prevProps.showRead)){
            if(showRead){
                await this.loadReadReceipts();
            }

            else{
                this.setState({readReceipts: []});
            }
        }
    }

    async loadReadReceipts(){
        const {senderId, readBy, handleScroll} = this.props;
    
        const readReceipts = await getReadReceipts(readBy, senderId, getProfilePic);
      
        this.setState({readReceipts});
        handleScroll();
    }

    toProfile(){
        const profileId = this.props.senderId;
        this.props.history.push(`/profile/${profileId}/posts`);
    }

    componentWillUnmount(){
        this.setState = () =>{
            return;
        }
    }

    render(){
        const {uid, senderId, content, hasImage, showRead} = this.props;
        const {ownerImgURL, attachedImgURL, readReceipts} = this.state;

        const msgPosition = (senderId === uid)? 
            'msg-r': 
            'msg-l';

        return(
            <div className ='row no-gutters'>
                <div className='msg-container'>
                    {msgPosition === 'msg-l'? 
                        <img 
                            src = {ownerImgURL? ownerImgURL: loading} 
                            alt ='profile pic' 
                            onClick={this.toProfile}
                        />: 
                        null
                    }

                    <div className ={`msg ${msgPosition} my-1`}>
                        <div>
                            {hasImage? 
                                <img src = {attachedImgURL? attachedImgURL: loading} alt ='msg-pic'/>:
                                null
                            }
                            
                            {content}
                        </div>
    
                        <div className = 'read mx-1 my-1'>
                            {showRead? readReceipts.map((imgURL, i) =>
                                <img 
                                    key={i} 
                                    src = {imgURL} 
                                    alt ='profile pic'
                                />
                            ): null}
                        </div>
                    </div>
    
                    {msgPosition === 'msg-r'? 
                        <img 
                            src = {ownerImgURL? ownerImgURL: loading} 
                            alt ='profile pic' 
                            onClick={this.toProfile}
                        />:
                        null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(MessageBubble);