import React from 'react';
import './DrawerToggle.css'

const drawerToggle = (props) => (
    <div className="DrawerToggle" onClick={props.clicked}>
        <div className={"bar1"}></div>
        <div className={"bar1"}></div>
        <div className={"bar1"}></div>
    </div>
);


export default drawerToggle;