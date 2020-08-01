import React, {Component} from 'react';

class SearchContacts extends Component{
    render(){
        return(
            <div className ='search-contacts'>
                <form>
                    <input type='text' id ='query' placeholder ='Search...'/>
                </form>
            </div>
        )
    }
}

export default SearchContacts;