import React, {Component} from 'react';

class Composer extends Component{
    render(){
        return(
            <div className='composer'>
                <header>
                    <input type ='text' placeholder='Type a name...'/>
                </header>
            </div>
        )
    }
}

export default Composer;