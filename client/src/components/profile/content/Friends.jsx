import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFriends} from '../../../store/actions/friendsActions';
import UserCard from '../../layout/UserCard';
import './ProfileContent.css';

class Friends extends Component{
    componentDidMount(){
        this.props.getFriends(this.props.uid);
    }

    render(){
        const {uid} = this.props;

        const friends = this.props.friends.map(friend =>
            <UserCard key={friend._id} user={friend} uid={uid}/>
        );

        return(
            <div>
                <div className ='jumbotron'>
                        <div className = 'row d-flex justify-content-center align-items-stretch'>
                            {friends}
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        uid: state.auth.uid,
        friends: state.friends.friends
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getFriends: (uid) => {dispatch(getFriends(uid));}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);