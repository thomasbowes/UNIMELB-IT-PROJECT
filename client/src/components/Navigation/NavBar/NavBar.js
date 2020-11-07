import React, {Component} from 'react';
import './NavBar.css';
import Logo from '../../../assets/Homepage-icons/folioexchange-logo.svg';
import NavBarItems from '../NavBar/NavBarItems/NavBarItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import {Link} from "react-router-dom"


// Creates header that is displayed at top of the page
class NavBar extends Component {

    doNothing = () => {
    }

    render(){
        return (
            <header className="NavBar" >
                <div className="nav-bar__container">
                    <div className="main-nav__logo-hamburger">
                        <DrawerToggle clicked={this.props.sideDrawerClicked}/>
                        <Link to="/home" className="main-header__brand">
                            <img src={Logo} alt="folio.exchange- logo" style={{float: "left"}}/>
                        </Link>
                        <div className="main-header__spacer"></div>
                    </div>
                    <nav className="main-nav"> 
                        <NavBarItems click={this.doNothing} closeBackDrop={this.props.closeBackDrop} loginSignUpclicked={this.props.loginSignUpclicked}/>
                    </nav>
                </div>
            </header>
    
        );
    }
}

export default NavBar;