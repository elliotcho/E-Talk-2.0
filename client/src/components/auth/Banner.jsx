import React from 'react';

function Banner(){
    return(
        <nav className='navbar'>
            <h2 className='navbar-brand'>E-Talk</h2>


            <button className='navbar-toggler' data-toggle='collapse' data-target='#message'>
                <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='message'>
                <ul className='navbar-nav'>
                    E-Talk is a full stack social media platform made for users
                    to network with others in the tech industry.
                    Created using the MERN stack, redux, GraphQL and Boostrap.
               </ul>
            </div>

        </nav>
    )
}

export default Banner;