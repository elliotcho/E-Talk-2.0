import React, {Component} from 'react';

import loading from '../../images/loading.jpg';

class Post extends Component{
    render(){
        return(
            <div className ='post bg-white'>
                 <div className='row mb-3'>
                    <section className='col-s-2 ml-2'> 
                        <img src={loading} alt='profile pic'/>
                    </section>

                    <div className='col-7 col-sm-8'>
                        <h3 className='text-primary mt-2'>Gugsa Challa</h3>
                        <p className='text-muted'>5 minutes ago</p>
                    </div>

                    <section className='col-1 mt-4'>
                        <i className='fas fa-edit'></i>
                        <i className='fas fa-trash-alt'></i>
                    </section>
                </div>

                <div className='content'>
                    This is some content
                </div>

                <section className='like mt-4'>
                    <i className ='fa fa-heart mx-0'></i>
                    <span className='ml-1'>3 likes</span>
                </section>
            </div>
        )
    }
}

export default Post;
