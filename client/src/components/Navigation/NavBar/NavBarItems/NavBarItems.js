import React, {Component} from 'react';
import './NavBarItems.css';
import {NavLink, withRouter} from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';


class NavBarItems extends Component {

    logInSignUpButtons = ( 
        <li className="main-nav__item main-nav__item--cta">
            <NavLink to= '#loginSignIn' exact onClick={() => {this.props.click(); this.props.loginSignUpclicked()}}>Login/SignUp</NavLink>
        </li>

    );

    myProfileButton = (
        <Aux>
            <li className="main-nav__item">
                <NavLink to='/userfolio' exact onClick={this.props.click}>MyFolioPage</NavLink>
            </li>
            <li className="main-nav__item">
                <NavLink to='/home' exact onClick={() => {this.props.click(); this.props.onLogout()}}>Logout</NavLink>
            </li>
        </Aux>
    );

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.props.history.push('/search');
        }
    }

    render(){

        return (
            <ul className="NavBarItems">

                <div className="search-bar">
                    <input type="text" placeholder="Search..." onKeyPress={this.handleKeyPress}/>
                </div>
                
                <li className="main-nav__item">
                    <NavLink to='/about' exact onClick={this.props.click}>About</NavLink>
                </li>

                {this.props.userAuthToken? this.myProfileButton: this.logInSignUpButtons}
            </ul>
        );
    }
}

//bring in redux state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        LoginMessage: state.auth.message,
        userAuthToken: state.auth.userAuthToken
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch( actionCreators.auth(email, password)),
        onLogout: () => dispatch(actionCreators.authLogout())

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBarItems));