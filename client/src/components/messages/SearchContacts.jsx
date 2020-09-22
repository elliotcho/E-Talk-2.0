import React, {Component} from 'react';
import {filterMsgCards} from '../../store/actions/messagesActions';

class SearchContacts extends Component{
    constructor(){
        super();

        this.state = {
            query: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id] : e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();

        const {query} = this.state;
        const {uid, dispatch} = this.props;

        dispatch(filterMsgCards(query, uid));
    }

    render(){
        const {query} = this.state;

        return(
            <div className ='search-contacts' onSubmit = {this.handleSubmit}>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text' 
                        id = 'query'
                        placeholder ='Search...'
                        value = {query}
                        onChange = {this.handleChange}
                    />
                </form>
            </div>
        )
    }
}

export default SearchContacts;