import React, {Component} from 'react';
import './Auth.css';

class Login extends Component{
    constructor(){
        super();

        this.state={
            email:'',
            password:''
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toSignup=this.toSignup.bind(this);
    }

    toSignup(){
        this.props.history.push('/signup');
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
            <div className='auth text-white' onSubmit={this.handleSubmit}>
                <nav className='navbar'>
                    <h2 className='navbar-brand'>E-Talk</h2>
                </nav>

                <form>
                    <h1 className='mb-3'>Sign In</h1>

                    <input type='email' 
                           id='email' 
                           onChange={this.handleChange}
                           placeholder='Your email here'
                           minLength='6'
                           maxLength='50'
                           required={true}
                    />
                    
                    <input type='password' 
                           id='password' 
                           onChange={this.handleChange}
                           placeholder='Your password here'
                           minLength='6'
                           maxLength='50'
                           required={true}
                    />
                    
                    <button className='btn btn-lg btn-success'>Sign In</button>

                    <p onClick={this.toSignup} className='mt-3'>Don't have an account? Sign up here!</p>
                </form>
            </div>
        )
    }
}

export default Login;