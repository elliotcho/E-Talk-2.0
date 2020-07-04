import React, {Component} from 'react';
import './Auth.css';

class Signup extends Component{
    constructor(){
        super();

        this.state={
            firstName: '',
            lastName: '',
            email:'',
            password:'',
            confirmPassword: ''
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toLogin=this.toLogin.bind(this);
    }

    toLogin(){
        this.props.history.push('/');
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        return(
            <div className='auth signup text-white' onSubmit={this.handleSubmit}>
                <nav className='navbar'>
                    <h2 className='navbar-brand'>E-Talk</h2>
                </nav>

                <form className='mt-4'>
                    <h3>Sign Up</h3>

                    <label htmlFor='firstName'>Your first name here<span>*</span></label>
                    <input type='text' 
                           id='firstName' 
                           onChange={this.handleChange}
                           minLength='2'
                           maxLength='30'
                           required={true}
                    />

                    <label htmlFor='lastName'>Your last name here<span>*</span></label>
                    <input type='text' 
                           id='lastName' 
                           onChange={this.handleChange}
                           minLength='2'
                           maxLength='30'
                           required={true}
                    />

                    <label htmlFor='email'>Your email here<span>*</span></label>
                    <input type='email' 
                           id='email' 
                           onChange={this.handleChange}
                           minLength='6'
                           maxLength='50'
                           required={true}
                    />
                    
                    <label htmlFor='password'>Your password here<span>*</span></label>
                    <input type='password' 
                           id='password' 
                           onChange={this.handleChange}
                           minLength='6'
                           maxLength='50'
                           required={true}
                    />

                    <label htmlFor='confirmPassword'>Confirm password<span>*</span></label>
                    <input type='password' 
                           id='confirmPassword' 
                           onChange={this.handleChange}
                           minLength='6'
                           maxLength='50'
                           required={true}
                    />  
                    
                    <button className='btn btn-lg btn-success'>Sign up</button>

                    <p onClick={this.toLogin} className='mt-3'>Already have an account? Sign in here!</p>
                </form>
            </div>
        )
    }
}

export default Signup;