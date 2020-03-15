import React, { Fragment } from 'react';
import './App.css';
import Auth from './containers/auth/Auth';

import {Route , Switch} from 'react-router-dom';

function App() {
  return ( 
    <Fragment>
      <p> Hello I am Main Page Of this Application change Link to /login fro Login Page</p>
      <Switch>
        <Route path='/login' exact component={Auth}/>
      </Switch>
    </Fragment>
  );
}
export default App;
