import React, {Component} from 'react';
import  moment from 'moment';

import loading from '../../images/loading.jpg';

class Post extends Component{
    render(){
        return(
            <div className ='post bg-white'>
                 <header className='row mb-3'>
                    <section className='col-s-2 ml-2'> 
                        <img src={loading} alt='profile pic'/>
                    </section>

                    <section className='col-7 col-sm-8'>
                        <h3 className='text-primary mt-2'>Gugsa Challa</h3>
                        <p className='text-muted'>{moment(this.props.date).calendar()}</p>
                    </section>

                    <section className='col-1 mt-4'>
                        <i className='fas fa-edit'></i>
                        <i className='fas fa-trash-alt' onClick ={() => {this.props.deletePost(this.props.postId)}}></i>
                    </section>
                </header>

                <main className='content'>
                    {this.props.content}
                </main>

                <section className='mt-4'>
                    <i className ='fa fa-heart mx-0'></i>
                    <span className='ml-2'>3 likes</span>

                    <i className ='fas fa-comment-alt'></i>
                    <span className='ml-2'>3 Comments</span>
                </section>
            </div>
        )
    }
}

export default Post;