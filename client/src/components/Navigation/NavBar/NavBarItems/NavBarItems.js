import React, {Component} from 'react';
import './NavBarItems.css';
import {NavLink} from 'react-router-dom'

class NavBarItems extends Component {
    render(){
        return (
            <div className="NavBarItems">
                {/* <a href="#Home">Home</a>
                <a href="#BrowseEportfolior">BrowseEportfolio</a>
                <a href="#MyPage">MyPage</a>
                <a href="#About">About</a>
                <a href="#Settings">Settings</a> */}

                <NavLink to='/home' exact>Home</NavLink>
                <NavLink to='/search'>SearchEportfolio</NavLink>
                <NavLink to='/myfolio'>MyPage</NavLink>
                <NavLink to='/about' exact>About</NavLink>
                <NavLink to='/settings' exact>Settings</NavLink>
            </div>
        );
    }
}

export default NavBarItems;