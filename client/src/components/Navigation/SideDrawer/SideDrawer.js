import React, {Component} from 'react'
import Logo from '../../../assets/Homepage-icons/folioexchange-logo.svg';
import './SideDrawer.css'
//import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import NavBarItems from '../NavBar/NavBarItems/NavBarItems'
import {Link} from 'react-router-dom'

class SideDrawer extends Component {
    render () {

        let attachedClasses = ["SideDrawer", "Close"];
        if (this.props.open){
            attachedClasses = ["SideDrawer", "Open"];
        }

        return (
            <div className={attachedClasses.join(' ')}>
                <Link to="/home">
                    <img src={Logo} alt="FolioExchangeLogo" onClick={this.props.clickItem}/>
                </Link>
                {/* <a href="#Home">Home</a>
                <a href="#BrowseEportfolio">BrowseEportfolio</a>
                <a href="#MyPage">MyPage</a>
                <a href="#About">About</a>
                <a href="#Settings">Settings</a> */}
                <NavBarItems click={this.props.clickItem} loginSignUpclicked = {this.props.loginSignUpclicked} sideDrawerClicked={this.props.clickItem}/>
            </div>

        );
    }
}

export default SideDrawer;