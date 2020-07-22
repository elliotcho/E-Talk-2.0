import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import UserCard from '../layout/UserCard';
import {saveQuery} from '../../store/actions/searchActions';
import './SearchResults.css';

class SearchResults extends Component{
    componentDidMount(){
        const {query} = this.props.match.params;

        this.props.saveQuery(query);
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        return(
            <div>
                <div className ='container'>
                    <div className = 'row d-flex justify-content-center align-items-center'>
                        <UserCard/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        saveQuery: (query) => {dispatch(saveQuery(query));}
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchResults));