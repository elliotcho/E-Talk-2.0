import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import UserCard from './UserCard';
import {saveQuery, applySearch} from '../../store/actions/searchActions';
import './SearchResults.css';

class SearchResults extends Component{
    componentDidMount(){
        const {query} = this.props.match.params;

        this.props.saveQuery(query);
        this.props.applySearch(query);
    }

    componentWillUpdate(prevProps){
        const {query} = this.props.match.params;

        if(prevProps.match.params.query !== query){
            window.location.reload();
        }
    }

    render(){
        const {uid, results} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const cards = results.map(user =>
            <UserCard key = {user._id} user = {user} uid = {uid} type='search'/>
        );

        return(
            <div className ='search-results jumbotron'>
                <div className ='container'>
                    <div className = 'row d-flex justify-content-center align-items-stretch'>
                        {cards.length === 0? <h3 className ='text-white'>No Users Found</h3>: cards}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        results: state.search.results
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        saveQuery: (query) => {dispatch(saveQuery(query));},
        applySearch: (query) => {dispatch(applySearch(query));}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));