import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUnreadRequests} from './store/actions/friendsActions';
import {getUnreadNotifs} from './store/actions/notificationActions';
import {getUsersComposedTo} from './store/actions/messagesActions';
import socket from 'socket.io-client';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';
import Profile from './components/profile/Profile';
import Network from './components/friends/Network';
import SearchResults from './components/search/SearchResults';
import Notifications from './components/notifications/Notifications';
import PostDetails from './components/posts/PostDetails';
import MessagesHome from './components/messages/MessagesHome';
import Navbar from './components/layout/Navbar';
import {handleSocketEvents} from './socket/socketEvents';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

let io;

class App extends Component{ 
    constructor(props){
      super(props);

      io = socket('http://localhost:5000');

      handleSocketEvents(
        io, 
        props.getUnreadRequests, 
        props.getUnreadNotifs,
        props.getUsersComposedTo
      );
    }

  
    render(){
        const {uid} = this.props;

        if(uid){
          io.emit('USER_AUTHENTICATED', {uid});
        }

        return(
            <BrowserRouter>
              {uid? <Navbar/>: null}

              <main style = {uid? {marginTop: '120px'}: null}>
                <Switch>
                  <Route exact path='/' render = {() => uid? <Userfeed uid = {uid}/>: <Login uid = {uid}/>}/>
                  <Route path='/signup' render ={() => <Signup uid = {uid}/>}/>
                  <Route path ='/profile/:id/:type' render ={() => <Profile uid = {uid}/>}/>
                  <Route path = '/mynetwork' render = {() => <Network uid = {uid}/>}/>
                  <Route path = '/search/:query' render = {() => <SearchResults uid = {uid}/>}/>
                  <Route path = '/notifications' render = {()=><Notifications uid={uid}/>}/>
                  <Route path = '/post/:id' render = {() => <PostDetails uid={uid}/>}/>
                  <Route path = '/chat/:id' render = {() => <MessagesHome uid={uid}/>}/>
                </Switch>

                <ToastContainer style = {{fontFamily: 'Trebuchet MS'}}/>
              </main>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        uid: state.auth.uid
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getUnreadRequests: (uid) => {dispatch(getUnreadRequests(uid));},
        getUnreadNotifs: (uid)  => {dispatch(getUnreadNotifs(uid));},
        getUsersComposedTo: (queryResult) => {dispatch(getUsersComposedTo(queryResult));}
    }
}

export {io};
export default connect(mapStateToProps, mapDispatchToProps)(App);