import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFriends} from '../../../store/actions/friendsActions';
import UserCard from '../../search/UserCard';
import './ProfileContent.css';

class Friends extends Component{
    componentDidMount(){
        const {dispatch, profileId} = this.props;
        dispatch(getFriends(profileId));
    }

    render(){
        const {uid} = this.props;

        const friends = this.props.friends.map(friend =>
            <UserCard 
                key={friend._id} 
                user={friend} 
                uid={uid} 
                type='friend'
            />
        );

        return(
            <div>
                {friends.length === 0? 
                    (<h1 className ='nofriends text-center'>
                        No Friends Available
                    </h1>):
                    (<div className ='jumbotron friends-container'>
                        <div className = 'friend row d-flex justify-content-center align-items-stretch'>
                            {friends}
                        </div>
                    </div>)
                }
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

const mapDispatchToProps = (dispatch) =>({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);