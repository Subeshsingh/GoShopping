import React, { Fragment,Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/index'

import './App.css';
import Auth from './containers/auth/login/Auth';
import SignUp from './containers/auth/signup/SingnUp';
import Navbar from './components/nav/Navbar';
import Logout from './containers/auth/logout/Logout';

import {Route , Switch, Redirect} from 'react-router-dom';

class  App extends Component {

  componentDidMount() {
    this.props.onCheckAuth();
    console.log("Checking for authentication"); 
 };

 render(){
      let router=(
          <Switch>
              <Route path='/login' exact component={Auth}/>
              <Route path='/signup' exact component={SignUp}/>
              <Redirect to="/"/> 
          </Switch>
        );
      if(this.props.isAuthenticated){
          router =(
            <Switch>
              <Route path='/logout' exact component={Logout}/>
              <Redirect to="/"/>
            </Switch> 
          );
      }

    return ( 
          <Fragment>
            <Navbar authenticated={this.props.isAuthenticated}/>
            <p> Hello I am Main Page Of this Application change Link to /login fro Login Page</p>
              {router}    
          </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onCheckAuth: () => dispatch (actions.authCheckState())
  };
};

export default connect (mapStateToProps, mapDispatchToProps)(App);
