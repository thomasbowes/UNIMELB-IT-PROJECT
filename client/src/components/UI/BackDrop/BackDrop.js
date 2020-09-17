import React, {Component} from 'react';
import classes from './BackDrop.css';

class Backdrop extends Component {
    render(){
        return (
            this.props.show ? <div className={classes.Backdrop} onClick={this.props.clicked}></div>: null
        );
    }
}

export default Backdrop;