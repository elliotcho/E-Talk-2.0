import React, {Component} from 'react';
import {Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';
import {withAlert} from 'react-alert';
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
        
       const {firstName, lastName, confirmPassword, password, email} = this.state;
       const {dispatch, alert} = this.props;

       if(password !== confirmPassword){
          alert.error('Passwords do not match');
          return;
       }

       const credentials = {firstName, lastName, password, email};
       dispatch(signUp(credentials, alert));
    }

    render(){
        if(this.props.uid){
            return <Redirect to='/'/>
        }

        return(
            <div className='auth signup text-white' onSubmit={this.handleSubmit}>
                <nav className='navbar'>
                    <Link to='/' className='navbar-brand'>E-Talk</Link>
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

                    <p onClick={this.toLogin} className='mt-3'>
                        Already have an account? Sign in here!
                    </p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAlert()(Signup)));