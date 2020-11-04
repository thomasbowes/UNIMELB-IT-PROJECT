import React, {Component} from 'react';
import './NavBarItems.css';
import {NavLink, withRouter} from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions/index';
import axios from "axios";

// Produces the navbar items that get added to the navbar on large screens
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
            // close side drawer
            this.props.closeBackDrop();

            //if no input return
            if (this.state.searchString === '') return;

            event.preventDefault();
            const data = this.state.searchString;
            const searchURL = `/api/users/search?key=${data}`;

            axios.get(searchURL)
                .then(response => {
                    //console.log(response.data.data);
                    this.props.history.push({pathname: '/search', searchResult: response.data.data});
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
                <a style={{cursor: "pointer"}} onClick={() => {window.location.href='/userfolio/' + this.props.userAuthToken._id}}>MyFolioPage</a>
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