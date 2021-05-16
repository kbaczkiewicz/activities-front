import React, {useState} from 'react';
import './App.css';
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Navbar from "./components/common/Navbar";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import {getTokenProvider} from "./auth/TokenProvider";
import TitlePanel from "./components/common/TitlePanel";
import Interval from "./components/interval/Interval";
import {Logout} from "./components/user/Logout";
import {IntervalDetails} from "./components/interval/IntervalDetails";
import {IntervalStats} from "./components/intervalstats/IntervalStats";

const buildLinks = token => {
    let links = [];

    if (token) { //todo: implement isLoggedIn
        links.push({name: 'Interwały', href: '/intervals', align: 'left'});
        links.push({name: 'Wyloguj', href: '/logout', align: 'right'});
    } else {
        links.push({name: 'Rejestracja', href: '/register', align: 'left'});
        links.push({name: 'Zaloguj', href: '/login', align: 'left'});
    }

    return links;
};

const App = () => {
    const tokenProvider = getTokenProvider();
    const token = tokenProvider.getToken();
    const links = buildLinks(token);


    return (
        <Router>
            <Navbar links={links}/>
            <TitlePanel/>
            <Switch>
                <Route path='/register'>
                    <Register token={token}/>
                </Route>
                <Route path={'/login'}>
                    {null === token ? <Login /> : <Redirect to='/intervals'/>}
                </Route>
                <Route path={'/intervals'}>
                    <Interval/>
                </Route>
                <Route path={'/interval/:intervalId'} component={IntervalDetails}>
                </Route>
                <Route path={'/intervalStats/:intervalId'} component={IntervalStats}>
                </Route>
                <Route path={'/logout'}>
                    <Logout />
                </Route>
                <Route path='/'>
                    {<Redirect to='/login'/>}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
