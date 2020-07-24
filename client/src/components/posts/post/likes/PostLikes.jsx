import React, {Component} from 'react';
import LikesModal from './LikesModal';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './Likes.css';

class PostLikes extends Component{
    constructor(){
        super();
        
        this.state = {
            userLiked: false, 
        }

        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount(){
        const {uid, postId} = this.props;

        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/userliked', {uid, postId}, config).then(response =>{
            const {userLiked} = response.data;

            this.setState({
                userLiked
            });
        });
    }

    handleLike(e){
        let {uid, postId, likes} = this.props;
        let {userLiked} = this.state;

        if(userLiked){
            e.target.style.color = 'white';
            likes.splice(likes.indexOf(uid), 1);
        }

        else{
            e.target.style.color = 'red';
            likes.push(uid);
        }

        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/like', {uid, postId, userLiked: !userLiked}, config);

        this.setState({userLiked: !userLiked});
    }

    render(){
        const {userLiked} = this.state;

        const {formatCount, likes} = this.props;

        const styleLike = (userLiked)? {color: 'red'}: {color: 'white'};

        return(
            <div className='d-inline-block likes'>
                    <i className ='fa fa-heart mx-0' onClick = {this.handleLike} style={styleLike}/>
                    
                    {likes.length !== 0? (<span className='ml-2' data-toggle ='modal' data-target ='#likesModal'>
                        {formatCount(likes.length)}
                        {likes.length===1? " like": " likes"}
                    </span>): null}

                    <div className='modal fade' id='likesModal'>
                        <LikesModal likes = {likes}/>
                    </div>
            </div>
        )
    }
}

export default withRouter(PostLikes);