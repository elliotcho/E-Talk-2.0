import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import FriendRequest from './FriendRequest';
import './Network.css';

import {connect} from 'react-redux';
import {getRequests} from '../../store/actions/friendsActions';

class Network extends Component{
    componentDidMount(){
        this.props.getRequests(this.props.uid);
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const requests = this.props.requests.map(request =>
            <FriendRequest request = {request}/>
        );

        return(
            <div className = 'network'>
                <div className ='fr-container'>
                    {requests}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        requests: state.friends.requests
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getRequests: (uid) => {dispatch(getRequests(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Network);