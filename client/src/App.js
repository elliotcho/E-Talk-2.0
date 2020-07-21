import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';
import Profile from './components/profile/Profile';
import Network from './components/friends/Network';
import SearchResults from './components/search/SearchResults';
import Navbar from './components/layout/Navbar';
import './App.css';

class App extends Component{  
    render(){
        const {uid} = this.props;

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

export default connect(mapStateToProps)(App);
