import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state = {
            ownerImgURL: null,
            readReceipts: []
        }
    }

    async componentDidMount(){
        const {msg, showRead} = this.props;

        fetch(`http://localhost:5000/users/profilepic/${msg.uid}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({ownerImgURL: URL.createObjectURL(file)});
        });

        if(showRead){
            const {readBy} = this.props.msg;
            const readReceipts = [];
    
            for(let i =0;i<readBy.length;i++){
                if(readBy[i] === msg.uid){
                    continue;
                }
    
                const response = await fetch(`http://localhost:5000/users/profilepic/${readBy[i]}`);
                const file = await response.blob();
    
                readReceipts.push(URL.createObjectURL(file));
            }
    
            this.setState({readReceipts}, ()=>{
                this.props.handleScroll();
            });
        }   
    }

    render(){
        const {msg, uid} = this.props;

        const {ownerImgURL, readReceipts} = this.state;

        const msgPosition = (msg.uid === uid)? 'msg-r': 'msg-l';

        return(
            <div className ='row no-gutters'>
                <div className='msg-container'>
                    {msgPosition === 'msg-l'? <img src = {ownerImgURL? ownerImgURL: loading} alt ='profile pic'/>: null}

                    <div className ={`msg ${msgPosition} my-1`}>
                        <div className='msg-content'>
                            {msg.content}
                        </div>
    
                        <div className = 'read mx-1 my-1'>
                            {readReceipts.map(imgURL =>
                                <img key={imgURL} src = {imgURL} alt ='profile pic'/>
                            )}
                        </div>
                    </div>
    
                    {msgPosition === 'msg-r'? <img src = {ownerImgURL? ownerImgURL: loading} alt ='profile pic'/>: null}
                </div>
            </div>
        )
    }
}

export default MessageBubble;