import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRequests, removeRequest} from '../../store/actions/friendsActions';
import FriendRequest from './FriendRequest';
import './Network.css';

class Network extends Component{
    constructor(){
        super();
        this.deleteRequest = this.deleteRequest.bind(this);
    }

    componentDidMount(){
        this.props.getRequests(this.props.uid);
    }

    deleteRequest(id){
        const {
            requests,
            removeRequest
        } = this.props;

        removeRequest(id, requests);
    }

    render(){
        const {uid} = this.props;

        if(!uid){
            return <Redirect to ='/'/>
        }

        const requests = this.props.requests.map(request =>
            <FriendRequest 
                key={request._id} 
                request={request} 
                deleteRequest={this.deleteRequest}
            />
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
        getRequests: (uid) => {dispatch(getRequests(uid));},
        removeRequest: (requestId, requests) => {dispatch(removeRequest(requestId, requests));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Network);