import React, { useState } from 'react';
import { Switch,Route } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Nav from './component/Nav'
import Home from './component/Home'
import Login from './component/Login'
import Spinner from './component/Spinner'
import AdminDashboard from './component/AdminDashboard';
export const base = 'http://localhost:8080'
const App = ({loading}) => {

  return (
    <div>
      <Spinner data={loading} />
       <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/admin' component={AdminDashboard} />
          <Route exact path='/login' component={Login} />
        </Switch>
    </div>
  );
}

export default connect(state=>{return {...state}})(App);