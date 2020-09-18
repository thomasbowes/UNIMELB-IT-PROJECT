import React, {Component} from 'react';
import classes from './NavBar.css';
import Logo from '../../../assets/Logo/Logo.png';
import NavBarItems from '../NavBar/NavBarItems/NavBarItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

class NavBar extends Component {
    render(){
        return (
            <div className='NavBar'>
                <div>
                    <img src={Logo} alt='' />
                    <DrawerToggle clicked={this.props.sideDrawerClicked}/>
                </div>
                
                <NavBarItems />

            </div>
        );
    }
}

export default NavBar;