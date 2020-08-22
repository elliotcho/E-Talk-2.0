import React, {Component} from 'react';

class SearchContacts extends Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        
    }

    render(){
        return(
            <div className ='search-contacts' onSubmit = {this.handleSubmit}>
                <form>
                    <input type='text' placeholder ='Search...'/>
                </form>
            </div>
        )
    }
}

export default SearchContacts;