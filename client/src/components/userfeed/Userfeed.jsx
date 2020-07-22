import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {clearQuery} from '../../store/actions/searchActions';
import PostList from '../posts/PostList';
import './Userfeed.css';

class Userfeed extends Component{
    componentDidMount(){
        this.props.clearQuery();
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to='/'/>
        }

        return (
            <div className='userfeed'>    
                <PostList profileId = {null}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        clearQuery: () => {dispatch(clearQuery());}
    }
}

export default connect(null, mapDispatchToProps)(Userfeed);