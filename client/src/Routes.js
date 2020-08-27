import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Userfeed from './components/userfeed/Userfeed';
import Profile from './components/profile/Profile';
import Network from './components/friends/Network';
import SearchResults from './components/search/SearchResults';
import Notifications from './components/notifications/Notifications';
import PostDetails from './components/posts/PostDetails';
import MessagesHome from './components/messages/MessagesHome';

const Routes = (uid) =>{
    return(
        <BrowserRouter>
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
        </BrowserRouter>
    )
}

export default Routes;