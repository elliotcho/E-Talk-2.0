import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {checkIfUserLiked, handleLike} from '../../../../store/actions/postActions';
import LikesModal from './LikesModal';
import {io} from '../../../../App';
import './Likes.css';

class PostLikes extends Component{
    constructor(){
        super();
        
        this.state = {
            userLiked: false, 
        }

        this.handleLike = this.handleLike.bind(this);
    }

    async componentDidMount(){
        const {uid, postId} = this.props;

        const userLiked = await checkIfUserLiked(uid, postId);
      
        this.setState({userLiked});
    }

    async handleLike(e){
        let {userLiked} = this.state;

        let {
            uid, 
            postId, 
            likes
        } = this.props;
    
        if(userLiked){
            e.target.style.color = 'white';

            likes.splice(likes.indexOf(uid), 1);

            io.emit('UNLIKE_POST', {
                senderId: uid, 
                postId
            });
        }

        else{
            e.target.style.color = 'red';
            
            likes.push(uid);

            io.emit('LIKE_POST', {
                senderId: uid, 
                postId
            });
        }

        await handleLike(uid, postId, userLiked);
    
        this.setState({
            userLiked: !userLiked
        });
    }

    render(){
        const {userLiked} = this.state;

        const {
            formatCount, 
            likes, 
            postId
        } = this.props;

        const styleLike = (userLiked)? 
            {color: 'red'}: 
            {color: 'white'};

        return(
            <div className='d-inline-block likes'>
                    <i 
                        className ='fa fa-heart mx-0' 
                        onClick = {this.handleLike} 
                        style={styleLike}
                    />
                    
                    {likes.length !== 0?
                        (<span className='ml-2' data-toggle ='modal' data-target ={`#likesModalFor${postId}`}>
                            {formatCount(likes.length)}
                            
                            {likes.length===1? 
                                " like": 
                                " likes"
                            }
                        </span>): 
                        null
                    }

                    <div className='modal fade' id= {`likesModalFor${postId}`}>
                        <LikesModal 
                            likes={likes} 
                            postId={postId}
                        />
                    </div>
            </div>
        )
    }
}

export default withRouter(PostLikes);