import React, {Component} from 'react'
import {Redirect, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../store/actions/authActions';
import {withAlert} from 'react-alert';
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
        
        const {dispatch, alert} = this.props;

        dispatch(login(this.state, alert));
    }

    render(){
        if(this.props.uid){
            return <Redirect to='/'/>
        }

        return(
            <div className='auth text-white' onSubmit={this.handleSubmit}>
                <nav className='navbar'>
                    <Link to ='/' className='navbar-brand'>E-Talk</Link>
                </nav>

                <form>
                    <h1 className='mb-3'>Sign In</h1>

                    <input type='email' 
                           id='email' 
                           onChange={this.handleChange}
                           placeholder='Your email here'
                           required
                    />
                    
                    <input type='password' 
                           id='password' 
                           onChange={this.handleChange}
                           placeholder='Your password here'
                           required
                    />
                    
                    <button className='btn btn-lg btn-success'>Sign In</button>

                    <p onClick={this.toSignup} className='mt-3'>
                        Don't have an account? Sign up here!
                    </p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid: state.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAlert()(Login)));