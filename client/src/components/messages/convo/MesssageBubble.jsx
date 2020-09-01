import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getProfilePic} from '../../../store/actions/profileActions';
import {getReadReceipts} from '../../../store/actions/messagesActions';
import loading from '../../../images/loading.jpg';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state = {
            ownerImgURL: null,
            readReceipts: []
        }

        this.loadReadReceipts = this.loadReadReceipts.bind(this);
        this.toProfile = this.toProfile.bind(this);
    }

    async componentDidMount(){
        const {showRead} = this.props;
        const {uid} = this.props.msg;

        const ownerImgURL = await getProfilePic(uid);

        if(showRead){
            await this.loadReadReceipts();
        }   

        this.setState({ownerImgURL});
    }

    async componentDidUpdate(prevProps){
        const {showRead} = this.props;
        const {readBy} = this.props.msg;

        if((prevProps.msg.readBy.length > readBy.length || (showRead !== prevProps.showRead)) && showRead){
           await this.loadReadReceipts();
        }
    }

    async loadReadReceipts(){
        const {handleScroll} = this.props;
        const {readBy, uid} = this.props.msg;

        const readReceipts = await getReadReceipts(readBy, uid, getProfilePic);
      
        this.setState({readReceipts}, ()=>{
            handleScroll();
        });
    }

    toProfile(){
        const profileId = this.props.msg.uid;
        this.props.history.push(`/profile/${profileId}/posts`);
    }

    componentWillUnmount(){
        this.setState = () =>{
            return;
        }
    }

    render(){
        const {msg, uid} = this.props;

        const {
            ownerImgURL, 
            readReceipts
        } = this.state;

        const msgPosition = (msg.uid === uid)? 
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
                            {msg.content}
                        </div>
    
                        <div className = 'read mx-1 my-1'>
                            {readReceipts.map(imgURL =>
                                <img 
                                    key={imgURL} 
                                    src = {imgURL} 
                                    alt ='profile pic'
                                />
                            )}
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