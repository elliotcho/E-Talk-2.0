import React, {Component} from 'react';
import loading from '../../../images/loading.jpg';

class ProfilePic extends Component{
    constructor(){
        super();
        this.state = {
            imgURL: null
        }
    }

    render(){
        return(
            <section>
                <img src ={loading} alt='profile pic'></img>
             </section>
        )
    }
}

export default ProfilePic;