import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

class App extends Component{  
    render(){
        return(
            <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Login}/>
                  <Route path='/signup' component={Signup}/>
              </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
