import React, { Fragment,Component} from 'react'
import './NavbarS.css';
import {Navbar,Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
// import {NavLink} from 'react-router-dom';


class NavbarS extends Component {
    state={
        show:false
    }
    sideDrawerHandler=()=>{
        this.setState((prevState,props)=>({
            ...prevState,
            show:!prevState.show
        }));
    }
    render() {     
    let sideDrawer=null;
    if(this.state.show){
        sideDrawer=(
            <div className="SideDrawer">
                <div className="sideDrawerLink">
                    <Nav.Link href="/" className="navbar-brand">GoShooping</Nav.Link>
                    <hr className="devider"/>
                    <Nav.Link href="/">Home</Nav.Link>
                    {this.props.isAuthenticated 
                            ? <Nav.Link onClick={this.props.onLogout}>Logout</Nav.Link>
                            : <Fragment>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/signup">SignUp</Nav.Link>
                              </Fragment>
                        }
                </div>
            </div>
        );
        }
        return (
            <>             
                    <Navbar className="fixed-top mainnav">
                        <Nav.Link href="/" className="navbar-brand">GoShopping</Nav.Link>
                        <Nav className="d-none ml-auto d-md-flex">
                            <Nav.Link href="/">Home</Nav.Link>
                            {this.props.isAuthenticated 
                            ? <Nav.Link onClick={this.props.onLogout}>Logout</Nav.Link>
                            : <Fragment>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/signup">SignUp</Nav.Link>
                              </Fragment>
                        }
                        </Nav>
                        <div className="DrawerToggle ml-auto d-flex d-md-none" onClick={this.sideDrawerHandler}>
                                <div></div>
                                <div></div>
                                <div></div>
                        </div>
                    </Navbar>
               {sideDrawer}
               {this.state.show ? <div className="backDrop"></div>:null}
           </>
        );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
const mapDispatchToProps = dispatch =>{
    return {
        onLogout: () => dispatch(actions.logOut())
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(NavbarS);
