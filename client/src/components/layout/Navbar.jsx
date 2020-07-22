import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../../store/actions/profileActions';
import {saveQuery} from '../../store/actions/searchActions';
import {Link, withRouter} from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component{
    constructor(){
        super();

        this.state = {
            query: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const {getUserInfo, uid} = this.props;

        getUserInfo(uid);
    }

    componentDidUpdate(prevProps){
        if(this.props.query !== prevProps.query){
            const {query} = this.props;

            this.setState({
                query
            });
        }
    }

    signOut(e){
        e.preventDefault();
        window.localStorage.clear();
        window.location.href='/';
    }

    computeInitials(firstName, lastName){
        return firstName!==null && lastName!==null? 
        firstName[0].toUpperCase() + lastName[0].toUpperCase():
        "..."
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();

        const {query} = this.state;

        if(query.trim().length === 0){
            return;
        }

        this.props.saveQuery(query);

        this.props.history.push(`/search/${query}`);
    }

    render(){
        const {uid, firstName, lastName} = this.props;

        return(
            <div className='text-white navbar-container'>
                <nav className='navbar navbar-expand-md'>
                    <Link to='/' className ='navbar-brand'>E-Talk</Link>
            
                    <button className='navbar-toggler' data-toggle='collapse' data-target='#links'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className ='collapse navbar-collapse' id='links'>
                        <form onSubmit = {this.handleSubmit}>
                            <input className='form-control' 
                                type='text' 
                                placeholder ='Search'
                                id = 'query'
                                value = {this.state.query}
                                onChange = {this.handleChange}
                            />
                        </form>

                        <ul className ='navbar-nav ml-auto'>
                            <Link to ='/' className ='link'>
                                <i className='fa fa-home mr-2'></i>
                                <span className='title'>Home</span>
                            </Link>
                     
                            <Link to ='/mynetwork' className ='link'>
                                <i className='fas fa-user-friends mr-2'></i>
                                <span className='title'>Find Friends</span>
                            </Link>
                        
                            <Link to ='/' className ='link'>
                                <i className='fas fa-comment mr-2'></i>
                                <span className='title'>Messages</span>
                            </Link>
                    
                            <Link to ='/' className ='link'>
                                <i className='fas fa-bell mr-2'></i>
                                <span className='title'>Notifications</span>
                            </Link>
                        
                            <Link to ={`/profile/${uid}/posts`} className = 'link'>
                                <i className = 'fa fa-address-card mr-2'></i>

                                <span className='btn btn-circle btn-md mr-2'>
                                    {this.computeInitials(firstName, lastName)}
                                </span>
                            
                                <span className='title'>Profile</span>
                            </Link>
            
                            <Link to ='/' className ='link'>
                                <i className='fas fa-user-cog mr-2'></i>
                                <span className='title'>Settings</span>
                            </Link>

                            <a onClick ={this.signOut} href='/' className='link'>
                                <i className='fas fa-sign-out-alt mr-2'></i>
                                <span className='title'>Sign Out</span>
                            </a>
                        </ul>
                    </div>
                </nav>
            </div>
        )   
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        query: state.search.query
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        saveQuery: (query) => {dispatch(saveQuery(query));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));