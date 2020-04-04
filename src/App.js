import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/index'

import './App.css';
import Auth from './containers/auth/login/Auth';
import SignUp from './containers/auth/signup/SingnUp';
import NavbarS from './components/nav/NavbarS';
import Products from './containers/Products/Products';

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
              <Route path='/' exact component={Products}/>
              <Redirect to="/"/> 
          </Switch>
        );
      if(this.props.isAuthenticated){
          router =(
            <Switch>
              <Route path='/' exact component={Products}/>
              <Redirect to="/" />
            </Switch> 
          );
      }

    return ( 
          <div className="App">
            <NavbarS />
             <div className="container">
              {router}    
             </div> 
          </div>
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
