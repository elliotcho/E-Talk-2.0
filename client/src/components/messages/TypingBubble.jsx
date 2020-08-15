import React, {Component} from 'react';
import loading from '../../images/loading.jpg';

class TypingBubble extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null
        }
    }

    componentDidMount(){
        const {typingId, handleScroll} = this.props;

        fetch(`http://localhost:5000/users/profilepic/${typingId}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)}, () =>{
                handleScroll()
            });
        });
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