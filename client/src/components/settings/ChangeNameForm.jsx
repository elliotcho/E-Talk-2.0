import React, { Component } from 'react';
import { changeName } from '../../store/actions/profileActions';

class ChangeNameForm extends Component{
    constructor(){
        super();

        this.state = {
            firstName: '',
            lastName: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const { firstName, lastName } = this.state;
        const { uid, alert } = this.props;

        if(firstName.trim().length === 0 && lastName.trim().length === 0){
            alert.error('Input fields cannot be blank');
            return;
        }   

        const msg = await changeName({uid, ...this.state});
        alert.success(msg);

        this.setState({firstName: '', lastName: ''});
    }

    render(){
        const { firstName , lastName } = this.state;
      
        return(
            <form onSubmit={this.handleSubmit}>
                <h3 className='text-center mb-4'>
                    Change Name
                </h3>

                <input
                    id='firstName'
                    value={firstName}
                    onChange={this.handleChange}
                    placeholder='Change first name...'
                    minLength='2'
                    maxLength='30'
                />

                <input
                    id='lastName'
                    value={lastName}
                    onChange={this.handleChange}
                    placeholder='Change last name...'
                    minLength='2'
                    maxLength='30'
                />

                <button className='btn btn-success mt-4'>
                    Change Name
                </button>
            </form>
        )
    }
}

export default ChangeNameForm;