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

                <NavLink to='/home' exact onClick={this.props.click}>Home</NavLink>
                <NavLink to='/search' onClick={this.props.click}>SearchEportfolio</NavLink>
                <NavLink to='/myfolio' onClick={this.props.click}>MyPage</NavLink>
                <NavLink to='/about' exact onClick={this.props.click}>About</NavLink>
                <NavLink to='/settings' exact onClick={this.props.click}>Settings</NavLink>
            </div>
        );
    }
}

export default NavBarItems;