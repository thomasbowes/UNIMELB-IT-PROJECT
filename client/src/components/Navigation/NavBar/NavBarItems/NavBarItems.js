import React, {Component} from 'react';
import './NavBarItems.css';

class NavBarItems extends Component {
    render(){
        return (
            <div className="NavBarItems">
                <a href="#Home">Home</a>
                <a href="#BrowseEportfolior">BrowseEportfolio</a>
                <a href="#MyPage">MyPage</a>
                <a href="#About">About</a>
                <a href="#Settings">Settings</a>
            </div>
        );
    }
}

export default NavBarItems;