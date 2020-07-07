import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';

class App extends Component{  
    constructor(){
        super();
        
        this.state = { 
            signedIn: false
        }

        this.changeAuthStatus = this.changeAuthStatus.bind(this);
    }

    changeAuthStatus(){
        const {signedIn} = this.state;

        this.setState({
            signedIn: !signedIn
        });
    }

    render(){
        const {signedIn} =this.state;

        return(
            <BrowserRouter>
              <Switch>
                  <Route exact 
                         path='/' 
                         render = {() => (
                                signedIn? 
                                <Userfeed signedIn = {signedIn} logout = {this.changeAuthStatus}/>: 
                                <Login signedIn = {signedIn} login = {this.changeAuthStatus}/>
                         )}                           
                  />
                  <Route path='/signup' render ={() => <Signup signedIn = {signedIn} />}/>
              </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
