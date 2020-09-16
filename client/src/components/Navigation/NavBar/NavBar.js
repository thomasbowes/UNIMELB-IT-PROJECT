import React, {Component} from 'react';
import classes from './NavBar.css';
import Logo from '../../../assets/Logo/Logo.png';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

class NavBar extends Component {
    render(){
        return (
            <div className={classes.NavBar}>
                <div>
                    <img src={Logo} alt='' />
                </div>
                <DrawerToggle />
                <div>
                    <a href="#Home">Home</a>
                    <a href="#BrowseEportfolior">BrowseEportfolio</a>
                    <a href="#MyPage">MyPage</a>
                    <a href="#About">About</a>
                    <a href="#Settings">Settings</a>
                </div>
            </div>
        );
    }
}

export default NavBar;