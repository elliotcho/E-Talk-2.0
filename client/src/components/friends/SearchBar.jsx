import React, {Component} from 'react';
import './Friends.css';

class SearchBar extends Component{
    render(){
        return (
            <section className ='col-md-5 col-xl-3 text-white search-users'>
                <form>
                    <h2 className='mb-3'>Find Users</h2>
    
                    <div className ='row'>
                        <div className='col-9 col-sm-7 col-md-10'>
                            <input type = 'text'/>
                        </div>

                        <button className='col-1 col-sm-1 col-md-1'>
                            <i className = 'fa fa-search'></i>
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default SearchBar;