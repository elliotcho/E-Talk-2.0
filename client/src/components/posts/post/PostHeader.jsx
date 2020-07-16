import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import loading from '../../../images/loading.jpg';


class PostHeader extends Component{
    constructor(){
        super();
        
        this.state = {
            firstName: 'Loading',
            lastName: 'User...', 
            imgURL: null
        }
    }

    componentDidMount(){
        const {ownerId} = this.props;

        axios.get(`http://localhost:5000/users/${ownerId}`).then(response => {
            this.setState({
                firstName: response.data.firstName,
                lastName: response.data.lastName
            });
        });

        fetch(`http://localhost:5000/users/profilepic/${ownerId}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

        const {uid, ownerId, postId, createdAt, deletePost} = this.props;

        return(
            <header className ='row mb-3'>
                 <section className='ml-2'> 
                    <img src={imgURL? imgURL: loading} alt='profile pic'/>
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
                        (<section className='mt-4'>
                            <i className='fas fa-edit'/>
                            <i className='fas fa-trash-alt' onClick ={() => {deletePost(postId)}}/>
                        </section>)
                        : null
                }
            </header>
        )
    }
}

export default PostHeader;