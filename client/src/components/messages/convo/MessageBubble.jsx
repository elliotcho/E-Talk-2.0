import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getReadReceipts} from '../../../store/actions/messagesActions';
import {getProfilePic, getUserData} from '../../../store/actions/profileActions';
import ImageModal from './ImageModal';
import loading from '../../../images/loading.jpg';
import moment from 'moment';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state = {
            ownerImgURL: null,
            attachedImgURL: null,
            readReceipts: [],
            senderName: 'Loading...User...'
        }

        this.loadReadReceipts = this.loadReadReceipts.bind(this);
        this.toProfile = this.toProfile.bind(this);
    }

    async componentDidMount(){
        const {senderId, showRead} = this.props;

        const ownerImgURL = await getProfilePic(senderId);
        const userData = await getUserData(senderId);

        this.setState({
            ownerImgURL,
            senderName:  `${userData.firstName} ${userData.lastName}`
        
        });

        if(showRead){
            await this.loadReadReceipts();
        }
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
        const {senderName, ownerImgURL, readReceipts} = this.state;
        const {uid, msgId, chatId, senderId, timeSent, content, hasImage, showRead} = this.props;
    
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
                            data-toggle='tooltip' 
                            data-placement='top'
                            title= {moment(timeSent).calendar()}
                        />: 
                        null
                    }

                    <div className ={`msg ${msgPosition} my-1`}>
                        <p className='mb-3'>
                            <strong>{senderName}</strong>
                        </p>

                        <div>
                            {hasImage? 
                                (<div className='text-primary photo-link' data-toggle ='modal' data-target ={`#${msgId}-image`}>
                                    Photo
                                </div>):
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
                            data-toggle='tooltip' 
                            data-placement='top'
                            title= {moment(timeSent).calendar()}
                        />:
                        null
                    }
                </div>

                {hasImage? 
                    (<div className='modal fade' id={`${msgId}-image`} data-backdrop='static'>
                        <ImageModal 
                            msgId={msgId} 
                            chatId={chatId}
                            timeSent = {timeSent}
                        />
                    </div>):
                    null
                }
            </div>
        )
    }
}

export default withRouter(MessageBubble);