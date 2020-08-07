import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class MessageBubble extends Component{
    constructor(){
        super();

        this.state = {
            ownerImgURL: null
        }
    }

    componentDidMount(){
        const {msg} = this.props;

        fetch(`http://localhost:5000/users/profilepic/${msg.uid}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({ownerImgURL: URL.createObjectURL(file)});
        });
    }

    render(){
        const {msg, uid} = this.props;

        const {ownerImgURL} = this.state;

        const msgPosition = (msg.uid === uid)? 'msg-r': 'msg-l';

        return(
            <div className ='row no-gutters'>
                <div className='msg-container'>
                    <div className ={`msg ${msgPosition} my-1`}>
                        <div className='msg-content'>
                            {msg.content}
                        </div>
    
                        <div className = 'read mx-1 my-1'>
                            {/*<img src = {loading} alt ='profile pic'/>
                            <img src = {loading} alt ='profile pic'/>*/}
                        </div>
                    </div>
    
                    <img src = {ownerImgURL? ownerImgURL: loading} alt ='profile pic'/>
                </div>
            </div>
        )
    }
}

export default MessageBubble;