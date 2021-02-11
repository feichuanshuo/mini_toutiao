import React, {Component,Fragment} from 'react';
import {Route,Redirect,Switch} from "react-router-dom";
import Home from './Home'
import AuthorHome from './AuthorHome'
import './App.less'
class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/authorhome" component={AuthorHome}/>
                    <Redirect to="home"/>
                </Switch>
            </Fragment>
        );
    }
}

export default App;