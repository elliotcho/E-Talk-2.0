import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import UserCard from '../layout/UserCard';
import './SearchResults.css';

class SearchResults extends Component{
    componentDidMount(){
        const {query} = this.props.match.params;
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.query !== this.props.match.params.query){   
            window.location.reload();
        }
        
        window.scrollTo(0, 0);
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

export default withRouter(SearchResults);