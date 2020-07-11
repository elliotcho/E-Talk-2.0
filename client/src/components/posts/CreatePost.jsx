import React, {Component} from 'react';
import './Posts.css';

class CreatePost extends Component{
    constructor(){
        super();

        this.state ={
            content: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.checkForEmptyContent = this.checkForEmptyContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    checkForEmptyContent(s){
        let split = s.split('\n');

        for(let i=0;i<split.length;i++){
            if(split[i].length>0){
                return false;
            }
        }

        return true;
    }

    handleSubmit(e){
        e.preventDefault();

        const {content} = this.state;

        if(this.checkForEmptyContent(content)){
            return; 
        }

        this.setState({content: ""});
    }

    render(){
        return(
            <div className='createpost text-white'>
                <h2 className='mt-5 mb-4'>What's on your mind?</h2>

                <form onSubmit = {this.handleSubmit}>
                    <textarea minLength = '1'
                              maxLength = '600000'
                              id = 'content'
                              onChange = {this.handleChange}
                              value = {this.state.content}
                              required = {true}
                    />

                    <button className='btn btn-lg btn-success mb-4'>Post</button>
                </form>
            </div>
        )
    }
}

export default CreatePost;