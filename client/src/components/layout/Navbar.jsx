import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {saveQuery} from '../../store/actions/searchActions';
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
        const {query} = this.props;

        if(query !== prevProps.query){
            this.setState({query});
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

        this.props.dispatch(saveQuery(query));
        this.props.history.push(`/search/${query}`);
    }

    render(){
        const {
            dispatch,
            uid, 
            initials, 
            unreadNotifs, 
            unreadRequests, 
            unseenChats,
        } = this.props;

        

        return(
            <div className='text-white navbar-container'>
                <nav className='navbar navbar-expand-md'>
                    <Link to='/' className ='navbar-brand'>
                        E-Talk
                    </Link>
            
                    <button className='navbar-toggler' data-toggle='collapse' data-target='#links'>
                        <span className='navbar-toggler-icon'/>
                    </button>

                    <div className ='collapse navbar-collapse' id='links'>
                        <form onSubmit = {this.handleSubmit}>
                            <input className='form-control' 
                                type='text' 
                                id = 'query'
                                placeholder ='Search'
                                value = {this.state.query}
                                onChange = {this.handleChange}
                            />                       
                        </form>

                        <NavbarLinks 
                            dispatch = {dispatch}
                            uid={uid} 
                            initials = {initials}
                            unreadRequests={unreadRequests}
                            unseenChats = {unseenChats}
                            unreadNotifs = {unreadNotifs}
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
        initials: state.profile.initials,
        query: state.search.query,
        unreadRequests: state.friends.unreadRequests,
        unreadNotifs: state.notifs.unreadNotifs,
        unseenChats: state.messages.unseenChats
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));