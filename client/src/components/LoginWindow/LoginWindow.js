import React, {Component} from 'react';
import classes from './LoginWindow.css';

class LoginWindow extends Component {
    render(){
        return (
            <div className={classes.LoginWindow}>
                <p>Please Log In Your Account</p>
                <input type='text' placeholder='User Name'/>
                <input type= 'password' placeholder='Password'/>
                <button>Log In</button>
                <button onClick={this.props.wantLogIn}>Look Around Without Logging In</button>
                
            </div>
        );
    }
}

export default LoginWindow;