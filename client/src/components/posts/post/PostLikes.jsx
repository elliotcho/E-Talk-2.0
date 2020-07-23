import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class PostLikes extends Component{
    constructor(){
        super();
        
        this.state = {
            userLiked: false, 
            likeCount: 0
        }

        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount(){
        const {uid, postId} = this.props;

        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/userliked', {uid, postId}, config).then(response =>{
            const {userLiked, likes} = response.data;

            this.setState({
                userLiked,
                likeCount: likes.length
            });
        });
    }

    handleLike(e){
        let {uid, postId} = this.props;
        let {userLiked, likeCount} = this.state;

        if(userLiked){
            e.target.style.color = 'white';
            likeCount--;
        }

        else{
            e.target.style.color = 'red';
            likeCount++;
        }

        const config = {headers: {'content-type': 'application/json'}};

        axios.post('http://localhost:5000/posts/like', {uid, postId, userLiked: !userLiked}, config)
        .then(()=>{});

        this.setState({userLiked: !userLiked, likeCount});
    }

    render(){
        const {userLiked, likeCount} = this.state;

        const {formatCount} = this.props;

        const styleLike = (userLiked)? {color: 'red'}: {color: 'white'};

        return(
            <div className='d-inline-block'>
                    <i className ='fa fa-heart mx-0' onClick = {this.handleLike} style={styleLike}/>
                    
                    <span className='ml-2'>
                        {likeCount ===0? null: formatCount(likeCount)}
                        {likeCount===1? " like": likeCount === 0? null: " likes"}
                    </span>
            </div>
        )
    }
}

export default withRouter(PostLikes);