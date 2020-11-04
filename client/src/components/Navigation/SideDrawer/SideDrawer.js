import React, {Component} from 'react'
import Logo from '../../../assets/Homepage-icons/folioexchange-logo.svg';
import './SideDrawer.css'
import NavBarItems from '../NavBar/NavBarItems/NavBarItems'
import {Link} from 'react-router-dom'

// Generates the side navigation sheet
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
                <NavBarItems click={this.props.clickItem} loginSignUpclicked = {this.props.loginSignUpclicked} closeBackDrop={this.props.clickItem}/>
            </div>

        );
    }
}

export default SideDrawer;