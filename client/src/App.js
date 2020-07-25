import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import socket from 'socket.io-client';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';
import Profile from './components/profile/Profile';
import Network from './components/friends/Network';
import SearchResults from './components/search/SearchResults';
import Navbar from './components/layout/Navbar';
import {handleSocketEvents} from './handlers/socketEvents';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

let io;

class App extends Component{ 
    constructor(){
      super();

      io = socket('http://localhost:5000');

      handleSocketEvents(io);
    }
  
    render(){
        const {uid} = this.props;

        if(uid){
          io.emit('USER_AUTHENTICATED', {uid});
        }

        return(
            <BrowserRouter>
              {uid? <Navbar/>: null}

              <main style = {uid? {marginTop: "120px"}: null}>
                <Switch>
                  <Route exact path='/' render = {() => uid? <Userfeed uid = {uid}/>: <Login uid = {uid}/>}/>
                  <Route path='/signup' render ={() => <Signup uid = {uid}/>}/>
                  <Route path ='/profile/:id/:type' render ={() => <Profile uid = {uid}/>}/>
                  <Route path = '/mynetwork' render = {() => <Network uid = {uid}/>}/>
                  <Route path = '/search/:query' render = {() => <SearchResults uid = {uid}/>}/>
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

export {io};
export default connect(mapStateToProps)(App);
