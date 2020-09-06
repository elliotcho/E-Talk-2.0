import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeRequest, readRequests} from '../../store/actions/friendsActions';
import FriendRequest from './FriendRequest';
import './Network.css';

class Network extends Component{
    constructor(){
        super();
        this.deleteRequest = this.deleteRequest.bind(this);
    }

    componentDidMount(){
        //load/read all friend requests
        this.props.dispatch(readRequests(this.props.uid));
    }
    
    deleteRequest(id){
        //remove friend request from the screen
        this.props.dispatch(removeRequest(id));
    }

    componentDidUpdate(prevProps){
        const {unreadRequests} = this.props;

        //if we have a new request refresh the page
        if(prevProps.unreadRequests !== unreadRequests && unreadRequests!==0){   
            window.location.reload();
        }
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
                {requests.length === 0? 
                    (<h1 className ='no-requests text-center'>
                        Friend Requests Unavailable
                    </h1>):
                    (<div className ='fr-container'>
                        {requests}
                    </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid, 
        requests: state.friends.requests,
        unreadRequests: state.friends.unreadRequests
    }
}

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(Network);