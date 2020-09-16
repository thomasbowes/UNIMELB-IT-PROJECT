import React, {Component} from 'react'
import Logo from '../../../assets/Logo/Logo.png'
import classes from './SideDrawer.css'

class SideDrawer extends Component {
    render () {
        return (
            <div className={classes.SideDrawer}>
                <img src={Logo} alt="FolioExchangeLogo"/>
                <a href="#Home">Home</a>
                <a href="#BrowseEportfolio">BrowseEportfolio</a>
                <a href="#MyPage">MyPage</a>
                <a href="#About">About</a>
                <a href="#Settings">Settings</a>
            </div>

        );
    }
}

export default SideDrawer;