import React, {Component} from 'react';
import {filterMsgCards} from '../../store/actions/messagesActions';

class SearchContacts extends Component{
    constructor(){
        super();

        this.state = {
            query: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id] : e.target.value});
    }

    handleKeyUp(){
        const {query} = this.state;
        const {uid, dispatch} = this.props;

        dispatch(filterMsgCards(query, uid));
    }

    render(){
        const {query} = this.state;

        return(
            <div className ='search-contacts' onSubmit={(e) => e.preventDefault()}>
                <form>
                    <input 
                        type='text' 
                        id = 'query'
                        placeholder ='Search...'
                        value = {query}
                        onChange = {this.handleChange}
                        onKeyUp = {this.handleKeyUp}
                    />
                </form>
            </div>
        )
    }
}

export default SearchContacts;