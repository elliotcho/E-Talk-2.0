import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import  moment from 'moment';

import loading from '../../images/loading.jpg';

class Post extends Component{
    constructor(){
        super();

        this.state= {
            firstName: 'Loading',
            lastName: 'User...', 
            userLiked: false, 
            likeCount: 0,
            commentCount: 0
        }

        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount(){
        const {ownerId} = this.props;

        axios.get(`http://localhost:5000/users/${ownerId}`).then(response => {
            const {firstName, lastName} = response.data;
            this.setState({firstName, lastName});
        });
    }

    handleLike(e){
        let {userLiked, likeCount} = this.state;

        if(userLiked){
            e.target.style.color = 'white';
            likeCount--;
        }

        else{
            e.target.style.color = 'red';
            likeCount++;
        }

        this.setState({userLiked: !userLiked, likeCount});
    }

    formatCount(num){
        if(num >= 1000000000){
            let billions = Math.floor(num/1000000000);
            let hundredMillions = Math.floor((num%1000000000)/100000000);

            return `${billions}.${hundredMillions}B`;
        }

        else if(num >= 1000000){
            let millions = Math.floor(num/1000000);
            let hundredThousands = Math.floor((num%1000000)/100000);

            return `${millions}.${hundredThousands}M`
        }

        else if(num >= 1000){
            let thousands = Math.floor(num/1000);
            let hundreds = Math.floor((num%1000)/100)

            return `${thousands}.${hundreds}K`
        }

        else{
            return num;
        }
    }

    render(){
        const {uid, ownerId, postId, createdAt, deletePost} = this.props;

        const {firstName, lastName, likeCount, commentCount} = this.state;

        return(
            <div className ='post bg-white'>
                 <header className='row mb-3'>
                    <section className='col-s-2 ml-2'> 
                        <img src={loading} alt='profile pic'/>
                    </section>

                    <section className='col-7 col-sm-8'>
                        <h3 className='text-primary mt-2'>
                            {firstName} {lastName}
                        </h3>

                        <p className='text-muted'>
                            {moment(createdAt).calendar()}
                        </p>
                    </section>

                    {
                        uid === ownerId? 
                                    (<section className='col-1 mt-4'>
                                        <i className='fas fa-edit'/>
                                        <i className='fas fa-trash-alt' onClick ={() => {deletePost(postId)}}/>
                                     </section>)
                                     : null
                    }
                </header>

                <main className='content'>
                    {this.props.content}
                </main>

                <section className='mt-4'>
                    <i className ='fa fa-heart mx-0' onClick = {this.handleLike}/>
                    <span className='ml-2'>
                        {likeCount ===0? null: this.formatCount(likeCount)}
                        {likeCount===1? " like": likeCount === 0? null: " likes"}
                    </span>

                    <i className ='fas fa-comment-alt'/>
                    <span className='ml-2'>
                        {commentCount === 0? null: this.formatCount(commentCount)} 
                        {commentCount>1? " Comments": " Comment"}
                    </span>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(Post);