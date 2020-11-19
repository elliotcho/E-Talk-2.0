import React, { Component } from 'react';
import { changePwd } from '../../store/actions/profileActions';

class ChangePasswordForm extends Component{
    constructor(){
        super();

        this.state = {
            currPwd: '',
            newPwd: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){    
        this.setState({[e.target.id] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const { uid, alert } = this.props;
  
        const msg = await changePwd({uid, ...this.state});

        if(msg === 'Your password is incorrect'){
            alert.error(msg);
        } else{
            alert.success(msg);
        }

        this.setState({currPwd: '', newPwd: ''});
    }

    render(){
        const { currPwd, newPwd } = this.state;

        return(
            <form onSubmit={this.handleSubmit}>
                  <input
                    id='currPwd'
                    type='password'
                    value={currPwd}
                    onChange={this.handleChange}
                    placeholder='Current password...'
                    minLength='6'
                    maxLength='50'
                    required
                />

                <input
                    id='newPwd'
                    type='password'
                    value={newPwd}
                    onChange={this.handleChange}
                    placeholder='New password...'
                    minLength='6'
                    maxLength='50'
                    required
                />

                <button>Change Password</button>
            </form>
        )
    }
}

export default ChangePasswordForm;