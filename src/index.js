import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import './index.css';
import Home from "./Home";
import AuthorHome from "./AuthorHome";
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/author_home" component={AuthorHome}/>
            <Redirect to="/home"/>
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
