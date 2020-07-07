import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';

class App extends Component{  
    render(){
        const {uid} = this.props;

        return(
            <BrowserRouter>
              <Switch>
                  <Route exact path='/' render = {() => uid? <Userfeed uid = {uid}/>: <Login uid = {uid}/>}/>
                  <Route path='/signup' render ={() => <Signup uid = {uid}/>}/>
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
