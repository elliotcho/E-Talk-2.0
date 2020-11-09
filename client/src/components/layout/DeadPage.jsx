import React from 'react';
import {Link} from 'react-router-dom';
import './DeadPage.css';

function DeadPage(props){
    const goBack = (e) => {
        e.preventDefault();
        props.history.goBack();
    }

    return(
        <div className='dead-page text-center'>
            <div>
                <h1>
                    This Page Doesn't Exist
                </h1>

                <p className='mt-4'>
                    Please check your URL or return to your home page
                </p>
            </div>

            <div className='mt-5'>
                <i className = 'fa fa-exclamation-triangle'/>
            </div>

            <ul className='mt-5'>
                <Link to='/'>
                    <li>Home</li>
                </Link>

                <Link to='/' onClick={goBack}>
                    <li>Back</li>
                </Link>
            </ul>
        </div>
    )
}

export default DeadPage;