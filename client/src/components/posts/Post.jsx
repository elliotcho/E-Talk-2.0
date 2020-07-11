import React, {Component} from 'react';

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
                        <p className='text-muted'>5 minutes ago</p>
                    </section>

                    <section className='col-1 mt-4'>
                        <i className='fas fa-edit'></i>
                        <i className='fas fa-trash-alt'></i>
                    </section>
                </header>

                <main className='content'>
                    This is some content
                </main>

                <section className='mt-4'>
                    <i className ='fa fa-heart mx-0'></i>
                    <span className='ml-2'>3 likes</span>
                </section>

                <section className='commentSection text-right'>       
                    <div className ='mr-3'>3 comments</div>
                </section>
            </div>
        )
    }
}

export default Post;
