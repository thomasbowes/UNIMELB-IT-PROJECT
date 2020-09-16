import React from 'react';
import classes from './DrawerToggle.css'

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onclick="myFunction(this)">
        <div className={classes.bar1}></div>
        <div className={classes.bar1}></div>
        <div className={classes.bar1}></div>
    </div>
);


export default drawerToggle;