import React, {Component} from 'react';
import './BackDrop.css';

class Backdrop extends Component {
    render(){
        return (
            this.props.show ? <div className="Backdrop" onClick={this.props.clicked}></div>: null
        );
    }
}

export default Backdrop;