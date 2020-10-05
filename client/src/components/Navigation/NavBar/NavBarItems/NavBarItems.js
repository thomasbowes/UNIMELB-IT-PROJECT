import React, {Component} from 'react';
import './NavBarItems.css';
import {NavLink, withRouter} from 'react-router-dom';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'


class NavBarItems extends Component {

    state = {
        loggedIn: false
    }

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
                <NavLink to='/home' exact onClick={() => {this.props.click(); this.logoutHandler()}}>Logout</NavLink>
            </li>
        </Aux>
    );

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.props.history.push('/search');
        }
    }

    logoutHandler = () => {
        this.setState({loggedIn: false});
    }

    render(){

        return (
            <ul className="NavBarItems">
                {/* <a href="#Home">Home</a>
                <a href="#BrowseEportfolior">BrowseEportfolio</a>
                <a href="#MyPage">MyPage</a>
                <a href="#About">About</a>
                <a href="#Settings">Settings</a> */}

                <div className="search-bar">
                    <input type="text" placeholder="Search..." onKeyPress={this.handleKeyPress}/>
                </div>
                
                <li className="main-nav__item">
                    <NavLink to='/about' exact onClick={this.props.click}>About</NavLink>
                </li>

                {this.state.loggedIn ? this.myProfileButton: this.logInSignUpButtons}
            </ul>
        );
    }
}

export default withRouter(NavBarItems);