import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';
import Profile from './components/profile/Profile';
import Navbar from './components/layout/Navbar';
import './App.css';

class App extends Component{  
    render(){
        const {uid} = this.props;

        return(
            <BrowserRouter>
              {uid? <Navbar/>: null}

              <Switch>
                  <Route exact path='/' render = {() => uid? <Userfeed uid = {uid}/>: <Login uid = {uid}/>}/>
                  <Route path='/signup' render ={() => <Signup uid = {uid}/>}/>
                  <Route path ='/profile/:id' render ={() => <Profile/>}/>
              </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(App);
