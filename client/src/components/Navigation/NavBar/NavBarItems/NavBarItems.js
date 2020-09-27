import React, {Component} from 'react';
import './NavBarItems.css';
import {NavLink, withRouter} from 'react-router-dom'

class NavBarItems extends Component {

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.props.history.push('/search');
        }
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
                <li className="main-nav__item">
                    <NavLink to='/login' exact onClick={this.props.click}>Login</NavLink>
                </li>
                <li className="main-nav__item main-nav__item--cta">
                    <NavLink to='/signup' exact onClick={this.props.click}>SignUp</NavLink>
                </li>

                {/* <NavLink to='/home' exact onClick={this.props.click}>Home</NavLink>
                <NavLink to='/search' onClick={this.props.click}>SearchEportfolio</NavLink>
                <NavLink to='/myfolio' onClick={this.props.click}>MyPage</NavLink>
                <NavLink to='/about' exact onClick={this.props.click}>About</NavLink>
                <NavLink to='/settings' exact onClick={this.props.click}>Settings</NavLink>
                <NavLink to='/login' exact onClick={this.props.click}>Login</NavLink> */}
            </ul>
        );
    }
}

export default withRouter(NavBarItems);