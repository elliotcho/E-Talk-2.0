import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as searchActions from '../../store/actions/searchActions';
import UserCard from './UserCard';
import './SearchResults.css';

class SearchResults extends Component{
    componentDidMount(){
        const {query} = this.props.match.params;
        
        const {uid, dispatch} = this.props;
        const {saveQuery, applySearch} = searchActions;

        dispatch(saveQuery(query));
        dispatch(applySearch(query, uid));
    }

    componentWillUpdate(prevProps){
        const {query} = this.props.match.params;

        if(prevProps.match.params.query !== query){
            window.location.reload();
        }
    }

    componentWillUnmount(){
        const {dispatch} = this.props;
        const {clearQuery} = searchActions;
        
        dispatch(clearQuery());
    }

    render(){
        const {uid, results} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const cards = results.map(user =>
            <UserCard 
                key = {user._id} 
                user = {user} 
                uid = {uid} 
                type='search'
            />
        );

        return(
            <div className ='search-results jumbotron'>
                <div className ='container'>
                    <div className = 'row d-flex justify-content-center align-items-stretch'>
                        {cards.length === 0? 
                            (<h3 className ='text-white'>
                                No Users Found
                            </h3>): 
                            cards
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        results: state.search.results
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));