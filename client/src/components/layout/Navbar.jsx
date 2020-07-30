import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from '../../store/actions/profileActions';
import {getUnreadRequests} from '../../store/actions/friendsActions';
import {getUnreadNotifs} from '../../store/actions/notificationActions';
import {saveQuery} from '../../store/actions/searchActions';
import {Link, withRouter} from 'react-router-dom';
import NavbarLinks from './NavbarLinks';
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

    componentDidUpdate(prevProps){
        if(this.props.query !== prevProps.query){
            const {query} = this.props;

            this.setState({
                query
            });
        }
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

                        <NavbarLinks 
                            uid={this.props.uid} 
                            firstName={this.props.firstName} 
                            lastName={this.props.lastName}
                            unreadRequests={this.props.unreadRequests}
                            unreadNotifs = {this.props.unreadNotifs}
                            getUserInfo ={this.props.getUserInfo}
                            getUnreadRequests = {this.props.getUnreadRequests}
                            getUnreadNotifs = {this.props.getUnreadNotifs}
                        />
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
        query: state.search.query,
        unreadRequests: state.friends.unreadRequests,
        unreadNotifs: state.notifs.unreadNotifs
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getUserInfo: (uid) => {dispatch(getUserInfo(uid));},
        saveQuery: (query) => {dispatch(saveQuery(query));},
        getUnreadRequests: (uid) => {dispatch(getUnreadRequests(uid));},
        getUnreadNotifs: (uid) => {dispatch(getUnreadNotifs(uid));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));