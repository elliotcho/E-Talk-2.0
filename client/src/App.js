import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';
import Profile from './components/profile/Profile';
import Network from './components/friends/Network';
import SearchResults from './components/search/SearchResults';
import Notifications from './components/notifications/Notifications';
import PostDetails from './components/posts/PostDetails';
import MessagesHome from './components/messages/MessagesHome';
import DeadPage from './components/layout/DeadPage';
import Navbar from './components/layout/Navbar';
import socket from 'socket.io-client';
import {ToastContainer} from 'react-toastify';
import {handleSocketEvents} from './socket/socketEvents';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

let io;

class App extends Component{ 
    constructor(props){
      super(props);

      io = socket('http://localhost:5000');

      handleSocketEvents(io, props.dispatch);
    }

    componentDidMount(){
        const {uid} = this.props;

        if(uid){
          io.emit('USER_AUTHENTICATED', {uid});
        }
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
                  <Route exact path='/' render = {() => uid? <Userfeed/>: <Login/>}/>
                  <Route exact path='/signup' render ={() => <Signup/>}/>
                  <Route exact path ='/profile/:id/:type' render ={() => <Profile/>}/>
                  <Route exact path = '/mynetwork' render = {() => <Network/>}/>
                  <Route exact path = '/search/:query' render = {() => <SearchResults/>}/>
                  <Route exact path = '/notifications' render = {()=><Notifications/>}/>
                  <Route exact path = '/post/:id' render = {() => <PostDetails/>}/>
                  <Route exact path = '/chat/:id' render = {() => <MessagesHome/>}/>
                  <Route path = '/' component = {DeadPage}/>
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

const mapDispatchToProps = (dispatch) => ({dispatch});

export {io};
export default connect(mapStateToProps, mapDispatchToProps)(App);