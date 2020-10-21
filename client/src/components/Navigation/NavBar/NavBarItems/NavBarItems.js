import React, {Component} from 'react';
import './NavBarItems.css';
import {NavLink, withRouter} from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';
import axios from "axios";

class NavBarItems extends Component {

    state = {
        searchString :''
    }

    setStateHandler = (event) => {
        event.preventDefault();
        this.setState({searchString: event.target.value});
    }


    searchSubmitHandler = (event) =>{

        if(event.key === 'Enter') {

            //if no input return
            if (this.state.searchString === '') return;

            event.preventDefault();
            const data = this.state.searchString;

            axios.get('/api/users/search?' + "key=" + data)
                .then(response => {
                    console.log(response.data);
                    this.props.history.push({pathname: '/search', searchResult: response.data});
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    logInSignUpButtons = ( 
        <li className="main-nav__item main-nav__item--cta">
            <NavLink to= '#loginSignIn' exact onClick={() => {this.props.click(); this.props.loginSignUpclicked()}}>Login/SignUp</NavLink>
        </li>

    );

    myProfileButton = () => (
        <Aux>
            <li className="main-nav__item">
                <NavLink to={'/userfolio/' + this.props.userAuthToken._id} exact onClick={this.props.click}>MyFolioPage</NavLink>
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
                <p>{this.state.searchString} </p>

                <div className="search-bar">
                    <input type="text" placeholder="Search..." onChange={this.setStateHandler} onKeyPress={this.searchSubmitHandler}/>
                </div>
                
                <li className="main-nav__item">
                    <NavLink to='/about' exact onClick={this.props.click}>About</NavLink>
                </li>

                {this.props.userAuthToken? this.myProfileButton(): this.logInSignUpButtons}
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