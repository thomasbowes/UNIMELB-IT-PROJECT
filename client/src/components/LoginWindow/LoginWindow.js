import React, {Component} from 'react';
import './LoginWindow.css';
import {Link} from 'react-router-dom';

//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';



class LoginWindow extends Component {

    state = {
        email: '',
        password: '',
        message: ''
    }


    loginSubmitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.email, this.state.password);
    }

    render(){
            if(this.props.loading){
                return (
                    <div className="LoginWindow">
                        <h3>Please Log In Your Account</h3>
                        <p>{this.props.message} </p>
                        <input type='text' placeholder='Email' disabled onChange={(event) => this.setState({email: event.target.value})} />
                        <input type= 'password' placeholder='Password' disabled onChange={(event) => this.setState({password: event.target.value})} />
                        <button onClick={this.loginSubmitHandler}>Log In</button>
                        <Link to={'/signup'}><button>Sign Up</button></Link>
                        <button onClick={this.props.wantLogIn}>Look Around Without Logging In</button>
                    </div>
                );
            }else{
                return (
                    <div className="LoginWindow">
                        <h3>Please Log In Your Account</h3>
                        <p>{this.props.message} </p>
                        <input type='text' placeholder='Email' onChange={(event) => this.setState({email: event.target.value})} />
                        <input type= 'password' placeholder='Password' onChange={(event) => this.setState({password: event.target.value})} />
                        <button onClick={this.loginSubmitHandler}>Log In</button>
                        <Link to={'/signup'}><button>Sign Up</button></Link>
                        <button onClick={this.props.onLogout}>Log Out</button>
                        <button onClick={this.props.wantLogIn}>Look Around Without Logging In</button>
                    </div>
                );
            };
    }
}


//bring in redux state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        message: state.auth.message
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch( actionCreators.auth(email, password)),
        onLogout: () => dispatch(actionCreators.authLogout())

    };
};





export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow);