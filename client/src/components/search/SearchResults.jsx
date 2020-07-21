import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SearchResults extends Component{
    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        return(
            <div>
                
            </div>
        )
    }
}

export default SearchResults;