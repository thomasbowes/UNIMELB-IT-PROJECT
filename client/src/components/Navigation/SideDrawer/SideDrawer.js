import React, {Component} from 'react'
import Logo from '../../../assets/Logo/Logo.png'
import './SideDrawer.css'
//import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

class SideDrawer extends Component {
    render () {

        let attachedClasses = ["SideDrawer", "Close"];
        if (this.props.open){
            attachedClasses = ["SideDrawer", "Open"];
        }

        return (
            <div className={attachedClasses.join(' ')}>
                {/* <DrawerToggle /> */}
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