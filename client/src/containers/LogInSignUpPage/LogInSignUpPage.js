import React, {Component} from 'react'
import validator from 'validator';
import './LogInSignUpPage.css'
import {Link} from "react-router-dom"
import FieldContainer from './FieldContainer/FieldContainer'
import crossIcon from '../../assets/LoginPage-icons/cross.svg';
import emailIcon from '../../assets/LoginPage-icons/email.svg';
import keyIcon from '../../assets/LoginPage-icons/key.svg';
import personIcon from '../../assets/LoginPage-icons/person.svg';


//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import axios from "axios";

class LogInPage extends Component{

    //registerPassword2 = Confirm Password
    state = {
        loginEmail: {
            input: '',
            type: 'email',
            verify: ''
        },
        loginPassword: {
            input: '',
            type: 'string',
            verify: ''
        },
        registerFirstname: {
            input: '',
            type: 'string',
            verify: ''
        },
        registerLastname: {
            input: '',
            type: 'string',
            verify: ''
        },
        registerEmail: {
            input: '',
            type: 'email',
            verify: ''
        },
        registerPassword: {
            input: '',
            type: 'password',
            equalTo: 'registerPassword2',
            verify: ''
        },
        registerPassword2: {
            input: '',
            type: 'confirmPassword',
            equalTo: 'registerPassword',
            verify: ''
        },
        registerMessage: ''

    }

    loginSubmitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.loginEmail.input, this.state.loginPassword.input);
    }


    registerSubmitHandler = (event) =>{

        event.preventDefault();

        if( !this.verifyState(this.state.registerFirstname) ||
            !this.verifyState(this.state.registerLastname) ||
            !this.verifyState(this.state.registerEmail) ||
            !this.verifyState(this.state.registerPassword) ||
            !this.verifyState(this.state.registerPassword2)){

            this.setState({registerMessage: "Please verify the Sign up form"});
            return;
        }

        event.preventDefault();
        const data = {
            firstname: this.state.registerFirstname.input,
            lastname: this.state.registerLastname.input,
            email: this.state.registerEmail.input,
            password: this.state.registerPassword.input
        };

        axios.post('http://localhost:5000/api/users/register', data)
            .then(response => {
                this.setState({registerMessage: response.data.status});
            })
            .catch(error => {
                this.setState({registerMessage: error.response.data.status});
            });
    }


    verifyState = (state) => {
        if(state.verify === '' || !state.verify) return false;
        else return true
    }

    verifyEmailHandler = (state) => {
        state.verify = this.isEmail(state);
    }

    verifyStringHandler = (state) => {
        state.verify = this.isEmpty(state);
    }

    verifyPasswordHandler = (state) => {
        if( !this.isEmpty(state)) state.verify = false;
        else state.verify = true;

        //check confirm password
        let newConfirmPW = {...this.state[state.equalTo]};
        if( !this.isEmpty(newConfirmPW) || !validator.equals(newConfirmPW.input, state.input) ) newConfirmPW.verify = false;
        else newConfirmPW.verify = true;
        this.setState({[state.equalTo]: newConfirmPW});
    }

    verifyConfirmPasswordHandler = (state) => {
        if( !this.isEmpty(state) || !this.isEqual(state, state.equalTo)) state.verify = false;
        else state.verify = true;
    }

    isEmail = (state) => {
        return validator.isEmail(state.input);
    }

    isEmpty = (state) => {
        return !validator.isEmpty(state.input);
    }

    isEqual = (state, equalTo) =>{
        return validator.equals(state.input, this.state[equalTo].input);
    }

    setStateHandler = (event, property) => {
        let newState = {...this.state[property]};
        newState.input = event.target.value;

        if(newState.type == 'email') this.verifyEmailHandler(newState);
        else if(newState.type == 'password') this.verifyPasswordHandler(newState);
        else if(newState.type == 'confirmPassword') this.verifyConfirmPasswordHandler(newState);
        else this.verifyStringHandler(newState);
        this.setState({[property]: newState});
    }

    render() {
        const textInput = "text";
        const passwordInput = "password";

        return(
            <div className="LoginSignUpPage">
                <div className="modal">
                    <div className="modal__color-bar"></div>
                    <div className="login-signup"> 
                        <a className="login-signup__close" href="#login-signup__close" onClick={this.props.clickCross}>
                            <img src={crossIcon} alt="" />
                        </a>
                        <div className="login-signup__form">
                            <h1>Log In</h1>
                            <p>{this.props.LoginMessage}</p>

                            <FieldContainer image={emailIcon} placeholder="Email" inputType={textInput} inputVerify = {this.state.loginEmail.verify} recordInputValHandler = {(event) => this.setStateHandler(event, "loginEmail")} />

                            <FieldContainer image={keyIcon} placeholder="Password" inputType={passwordInput} inputVerify = {this.state.loginPassword.verify} recordInputValHandler = {(event) => this.setStateHandler(event, "loginPassword")} />
            
                            <button type="button" onClick={this.loginSubmitHandler}>Log In</button>
                            <button type="button">Log In with google</button>
                            <button type="button">Log Inwith facebook</button>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="login-signup__form">
                            <h1>Sign Up</h1>
                            <p>{this.state.registerMessage}</p>

                            <FieldContainer image={personIcon} placeholder="First Name" inputType={textInput} inputVerify = {this.state.registerFirstname.verify} recordInputValHandler = {(event) => this.setStateHandler(event, "registerFirstname")} />

                            <FieldContainer image={personIcon} placeholder="Last Name" inputType={textInput} inputVerify = {this.state.registerLastname.verify} recordInputValHandler = {(event) => this.setStateHandler(event, "registerLastname")} />

                            <FieldContainer image={emailIcon} placeholder="Email" inputType={textInput} inputVerify = {this.state.registerEmail.verify} recordInputValHandler = {(event) => this.setStateHandler(event, "registerEmail")} />

                            <FieldContainer image={keyIcon} placeholder="Password" inputType={passwordInput} inputVerify = {this.state.registerPassword.verify} recordInputValHandler = {(event) => this.setStateHandler(event, "registerPassword")} />

                            <FieldContainer image={keyIcon} placeholder="Confirm Password" inputType={passwordInput} inputVerify = {this.state.registerPassword2.verify} recordInputValHandler = {(event) => this.setStateHandler(event, "registerPassword2")} />

                            <p>By creating an account you agree to our <a href="#Terms">Terms & Conditions</a> and <a href="#Policy">Privacy Policy</a>.</p>
                            <button type="button" onClick={this.registerSubmitHandler} >Sign up</button>
                            <button type="button" >Sign up with google</button>

                            <a target="_blank" href="http://localhost:5000/api/users/oauth/facebook">
                                <button type="button"  >Sign up with facebook</button>
                            </a>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}

//bring in redux state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        LoginMessage: state.auth.message
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch( actionCreators.auth(email, password)),
        onLogout: () => dispatch(actionCreators.authLogout())

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);