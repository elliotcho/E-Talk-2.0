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
            lastName: 'User...'
        }
    }

    componentDidMount(){
        const {ownerId} = this.props;

        axios.get(`http://localhost:5000/users/${ownerId}`).then(response => {
            const {
                firstName, 
                lastName
            } = response.data;
            
            this.setState({firstName, lastName});
        });
    }

    render(){
        const {uid, ownerId, postId, createdAt, likes, comments, deletePost} = this.props;

        const {firstName, lastName} = this.state;

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
                    <i className ='fa fa-heart mx-0'/>
                    <span className='ml-2'>
                        {likes.length===0? null: likes.length}
                        {likes.length===1? "like": likes.length === 0? null: "likes"}
                    </span>

                    <i className ='fas fa-comment-alt'/>
                    <span className='ml-2'>
                        {comments.length === 0? null: comments.length} 
                        {comments.length>1? "Comments": "Comment"}
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