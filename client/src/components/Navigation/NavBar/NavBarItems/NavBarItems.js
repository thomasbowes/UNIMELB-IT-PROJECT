import React, {Component} from 'react';
import classes from './NavBarItems.css';
import DrawerToggle from '../../SideDrawer/DrawerToggle/DrawerToggle';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'

class NavBarItems extends Component {
    render(){
        return (
            <div className={classes.NavBarItems}>
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