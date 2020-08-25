import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUnreadRequests} from './store/actions/friendsActions';
import {getUnreadNotifs} from './store/actions/notificationActions';

import {
  setUserChats, 
  setComposerResults,
  handleNewMessage,
  getUnseenChats,
  handleTyping,
  stopTyping,
  handleReadReceipts,
  renderComposerChat
} from './store/actions/messagesActions';

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
        props.setComposerResults,
        props.setUserChats,
        props.handleNewMessage,
        props.getUnseenChats,
        props.handleTyping,
        props.stopTyping,
        props.handleReadReceipts,
        props.renderComposerChat
      );
    }

    componentDidUpdate(prevProps){
        const {uid} = this.props;

        if(uid && prevProps.uid !== uid){
          io.emit('USER_AUTHENTICATED', {uid});
        }
    }

  
    render(){
        const {uid} = this.props;

        return(
            <BrowserRouter>
              {uid? <Navbar/>: null}

              <main style = {uid? {marginTop: '120px'}: null}>
                <Switch>
                  <Route exact path='/' render = {() => uid? <Userfeed uid = {uid}/>: <Login/>}/>
                  <Route path='/signup' render ={() => <Signup/>}/>
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
        setComposerResults: (results) => {dispatch(setComposerResults(results));},
        setUserChats: (chats) => {dispatch(setUserChats(chats));},
        handleNewMessage: (newMessage, chatId, uid, io) => {dispatch(handleNewMessage(newMessage, chatId, uid, io));},
        getUnseenChats: (uid) => {dispatch(getUnseenChats(uid));},
        handleTyping: (chatId, uid) => {dispatch(handleTyping(chatId, uid));},
        stopTyping: (chatId, typingMsgs) => {dispatch(stopTyping(chatId, typingMsgs));},
        handleReadReceipts: (chatId, messages) => {dispatch(handleReadReceipts(chatId, messages));},
        renderComposerChat: (chatId) =>{dispatch(renderComposerChat(chatId))}
    }
}

export {io};
export default connect(mapStateToProps, mapDispatchToProps)(App);