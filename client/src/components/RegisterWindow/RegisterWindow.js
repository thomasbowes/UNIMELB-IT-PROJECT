import React, {Component} from 'react';
import classes from '../LoginWindow/LoginWindow.css';
import axios from 'axios';

class LoginWindow extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        emailCheck: false
    }


    postDataHandler = () =>{
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:5000/api/users/register', data)
            .then(response => {
                console.log(response);
            });

    }


    render(){
        return (
            <div className={classes.LoginWindow}>
                <p>Please enter your information</p>
                <p>{this.state.username} </p>
                <p>{this.state.password} </p>
                <p>{this.state.email} </p>

                <input type='text' placeholder='User Name' onChange={(event) => this.setState({username: event.target.value})} />
                <input type='text' placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} />
                <input type= 'password' placeholder='Password' onChange={(event) => this.setState({password: event.target.value})} />
                <button>Check Email</button>
                <button onClick={this.postDataHandler}>Register</button>

            </div>
        );
    }
}

export default LoginWindow;