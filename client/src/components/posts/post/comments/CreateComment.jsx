import React, {Component} from 'react';
import {io} from '../../../../App';

class CreateCommment extends Component{
    constructor(){
        super();
        this.pressEnter = this.pressEnter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    pressEnter(e){
        if(e.keyCode === 13 && e.shiftKey === false){
            e.preventDefault();
            this.myCommentForm.dispatchEvent(new Event('submit'));
        }

        else{
           setTimeout(()=>{
            this.myComment.style.height = "";
            this.myComment.style.height = this.myComment.scrollHeight + 'px';
           }, 0);
        }
        
        if(this.myComment.scrollHeight > 200){
            this.myComment.style.overflow = 'auto';
        }

        else{
            this.myComment.style.overflow = 'hidden';
        }
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();

        const content = this.myComment.value;

        if(content.trim() === ""){
            return;
        }

        const {uid, postId, updateCount,createComment} = this.props;

        io.emit('COMMENT_ON_POST', {
            postId, 
            senderId: uid
        });

        createComment(content);
        updateCount(1);

        this.myComment.value = "";
    }


    render(){
        return(
            <div className ='comment-form'> 
                <form ref ={ele => this.myCommentForm = ele} onSubmit={this.handleSubmit}>
                    <textarea 
                        id = 'content'
                        className = 'form-control'
                        rows='1' 
                        ref = {ele => this.myComment = ele}
                        onKeyDown={this.pressEnter} 
                        onChange = {this.handleChange}
                        placeholder = 'Write a comment...'
                    />
                </form>
            </div>
        )
    }
}

export default CreateCommment;