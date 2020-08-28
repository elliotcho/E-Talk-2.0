import React, {Component} from 'react';
import {getProfilePic} from '../../store/actions/profileActions';
import loading from '../../images/loading.jpg';

class TypingBubble extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null
        }
    }

   async componentDidMount(){
        const {typingId, handleScroll} = this.props;

        const imgURL = await getProfilePic(typingId);
        
        this.setState({imgURL}, () => {handleScroll();})
    }

    render(){
        const {msg, display} = this.props;

        const {imgURL} = this.state; 

        const style = (display)? {display: 'flex'} : {display: 'none'};

        return(
            <div className = 'typing-container' style = {style}>
                <img src = {imgURL? imgURL: loading} alt ='profile pic'/>

                <div className ='typing-bubble my-1'>
                    <div>
                        {msg}
                    </div>
                </div>
            </div>
        )
    }
}

export default TypingBubble;