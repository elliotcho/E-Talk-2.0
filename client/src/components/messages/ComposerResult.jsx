import React, {Component} from 'react';
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

    componentDidMount(){
        const {_id, firstName, lastName} = this.props.user;

        this.setState({firstName, lastName});

        fetch(`http://localhost:5000/users/profilepic/${_id}`, {
            method: 'GET'
        }).then(response => response.blob())
        .then(file => {
            this.setState({imgURL: URL.createObjectURL(file)});
        });
    }

    render(){
        const {firstName, lastName, imgURL} = this.state;

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