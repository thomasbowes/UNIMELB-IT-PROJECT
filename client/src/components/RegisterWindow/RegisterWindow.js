import React, {Component} from 'react';
import '../LoginWindow/LoginWindow.css';
import axios from 'axios';

class LoginWindow extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        emailCheck: false,
        message: ''
    }


    postDataHandler = (event) =>{
        event.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:5000/api/users/register', data)
            .then(response => {
                this.setState({message: response.data.status});
            });

    }


    render(){
        return (
            <div className="LoginWindow">
                <p>Please enter your information</p>
                <p>{this.state.message} </p>

                <input type='text' placeholder='User Name' onChange={(event) => this.setState({username: event.target.value})} />
                <input type='text' placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} />
                <input type= 'password' placeholder='Password' onChange={(event) => this.setState({password: event.target.value})} />
                <button onClick={this.postDataHandler}>Register</button>

            </div>
        );
    }
}

export default LoginWindow;