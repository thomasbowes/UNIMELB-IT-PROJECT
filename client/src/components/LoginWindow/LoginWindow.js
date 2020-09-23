import React, {Component} from 'react';
import './LoginWindow.css';
import {Link} from 'react-router-dom';

class LoginWindow extends Component {
    render(){
        return (
            <div className="LoginWindow">
                <p>Please Log In Your Account</p>
                <input type='text' placeholder='User Name'/>
                <input type= 'password' placeholder='Password'/>
                <button>Log In</button>
                <Link to={'/signup'}><button>Sign Up</button></Link>
                <button onClick={this.props.wantLogIn}>Look Around Without Logging In</button>
                
            </div>
        );
    }
}

export default LoginWindow;