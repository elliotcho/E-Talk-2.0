import React, {Component} from 'react';
import {getProfilePic, getUserData} from '../../../store/actions/profileActions';
import loading from '../../../images/loading.jpg';

class TypingBubble extends Component{
    constructor(){
        super();

        this.state = {
            firstName: '',
            lastName: '',
            imgURL: null
        }
    }

   async componentDidMount(){
        const {typingId, handleScroll} = this.props;

        const user = await getUserData(typingId);

        const {
            firstName, 
            lastName
        } = user;

        const imgURL = await getProfilePic(typingId);
        
        this.setState({firstName, lastName, imgURL}, () => {
            handleScroll();
        });
    }

    render(){
        const {display} = this.props;

        const {firstName, lastName, imgURL} = this.state; 

        const style = (display)? 
            {display: 'flex'} : 
            {display: 'none'};

        return(
            <div className = 'typing-container' style = {style}>
                <img src = {imgURL? imgURL: loading} alt ='profile pic'/>

                <div className ='typing-bubble my-1'>
                    <div>
                        {firstName} {lastName} is typing...
                    </div>
                </div>
            </div>
        )
    }
}

export default TypingBubble;