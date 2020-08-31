import React, {Component} from 'react';
import {getProfilePic} from '../../store/actions/profileActions';
import loading from '../../images/loading.jpg';

class ComposerResult extends Component{
    constructor(){
        super();

        this.state = {
            firstName: 'Loading...',
            lastName: 'User...',
            imgURL: null,
        }
    }

    async componentDidMount(){
        const {_id, firstName, lastName} = this.props.user;

        const imgURL = await getProfilePic(_id);

        this.setState({
            firstName, 
            lastName,
            imgURL
        });
    }

    render(){
        const {
            firstName, 
            lastName, 
            imgURL
        } = this.state;
        
        const {addRecipient, user} = this.props;

        return(
            <div className ='user-composed-to' onClick = {()=>{addRecipient(user)}}>
                <img src={imgURL? imgURL: loading} alt = 'profile-pic'/>
                <p>
                    {firstName} {lastName}
                </p>
            </div>
        )
    }
}

export default ComposerResult;