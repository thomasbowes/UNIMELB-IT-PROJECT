import React, {Component} from 'react'
import validator from 'validator';
import './LogInSignUpPage.css'
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
        registerMessage: null,
        registerPasswordMessage: null,
        registerEmailMessage: null,
        registerFirstNameMessage: null,
        registerLastNameMessage: null,
        registerErrorList: []


    }

    loginSubmitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.loginEmail.input, this.state.loginPassword.input);
    }


    registerSubmitHandler = (event) =>{

        const MIN_PASS_LENGTH = 8;

        event.preventDefault();

        // Resets all error messages (if thereis any)
        this.setState({registerFirstNameMessage: null});
        this.setState({registerLastNameMessage: null});
        this.setState({registerEmailMessage: null});
        this.setState({registerPasswordMessage: null});

        console.log(this.state.registerPassword2);

        // Generates message and records all form sections that are broken
        if (!this.verifyState(this.state.registerPassword) ||
        !this.verifyState(this.state.registerPassword2) || 
        this.state.registerPassword.input.length < MIN_PASS_LENGTH || 
        this.state.registerPassword2.input.length < MIN_PASS_LENGTH) {
            this.setState({registerPasswordMessage: "Ensure that both passwords match and are longer than 8 characters"});
            this.setState({registerErrorList: this.state.registerErrorList.concat(["password"])});
        }

        if (!this.verifyState(this.state.registerEmail)) {
            this.setState({registerEmailMessage: "Please enter a valid email"});
            this.setState({registerErrorList: this.state.registerErrorList.concat(["email"])});
        }

        if (!this.verifyState(this.state.registerFirstname)) {
            this.setState({registerFirstNameMessage: "Please enter a valid name"});
            this.setState({registerErrorList: this.state.registerErrorList.concat(["firstname"])});
        }
        if (!this.verifyState(this.state.registerLastname)) {
            this.setState({registerLastNameMessage: "Please enter a valid name"});
            this.setState({registerErrorList: this.state.registerErrorList.concat(["lastname"])});
        }

        if( !this.verifyState(this.state.registerFirstname) ||
            !this.verifyState(this.state.registerLastname) ||
            !this.verifyState(this.state.registerEmail) ||
            !this.verifyState(this.state.registerPassword) ||
            !this.verifyState(this.state.registerPassword2) || 
            this.state.registerPassword.input.length < MIN_PASS_LENGTH || 
            this.state.registerPassword2.input.length < MIN_PASS_LENGTH){
                
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

        axios.post('/api/users/register', data)
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

        if(newState.type === 'email') this.verifyEmailHandler(newState);
        else if(newState.type === 'password') this.verifyPasswordHandler(newState);
        else if(newState.type === 'confirmPassword') this.verifyConfirmPasswordHandler(newState);
        else this.verifyStringHandler(newState);
        this.setState({[property]: newState});
    }

    // Generates html for error message
    errorPrintHandler = (prop) => {
        if (prop !== "") {
            return <p className="LoginSignupPage__error">{prop}</p>
        } else {
            return null;
        }
    }
    
    
    //save for SSO link target="_blank" rel="noopener noreferrer"
    render() {
        const textInput = "text";
        const passwordInput = "password";
        
        return(
            <div className="LoginSignUpPage">
                <div className="modal">
                    <div className="modal__color-bar"></div>
                    <div className="login-signup"> 
                        <a className="login-signup__close" href="#login-signup__close" onClick={this.props.close}>
                            <img src={crossIcon} alt="" />
                        </a>
                        <div className="login-signup__form">
                            <h1>Log In</h1>
                            {this.errorPrintHandler(this.props.LoginMessage)}

                            <FieldContainer 
                            image={emailIcon} 
                            placeholder="Email" 
                            inputType={textInput} 
                            inputVerify = {this.state.loginEmail.verify} 
                            recordInputValHandler = {(event) => this.setStateHandler(event, "loginEmail")} 
                            isError={this.props.LoginMessage}
                            />

                            <FieldContainer 
                            image={keyIcon} 
                            placeholder="Password" 
                            inputType={passwordInput} 
                            inputVerify = {this.state.loginPassword.verify} 
                            recordInputValHandler = {(event) => this.setStateHandler(event, "loginPassword")} 
                            isError={this.props.LoginMessage}
                            />
            
                            <button type="button" onClick={this.loginSubmitHandler}>Log In</button>


                            <a href="/api/users/oauth/google">
                                <button type="button" className="google-login-button">Log In with google</button>
                            </a>

                            <a href="/api/users/oauth/facebook">
                                <button type="button" className="facebook-login-button">Log In with facebook</button>
                            </a>

                        </div>
                        <div className="vertical-line"></div>
                        <div className="login-signup__form">
                            <h1>Sign Up</h1>
                            {this.errorPrintHandler(this.state.registerMessage)}
                            
                            {this.errorPrintHandler(this.state.registerFirstNameMessage)}
                            <FieldContainer 
                                image={personIcon} 
                                placeholder="First Name" 
                                inputType={textInput} 
                                inputVerify = {this.state.registerFirstname.verify} 
                                recordInputValHandler = {(event) => this.setStateHandler(event, "registerFirstname")} 
                                isError={this.state.registerFirstNameMessage}
                            />

                            {this.errorPrintHandler(this.state.registerLastNameMessage)}
                            <FieldContainer 
                                image={personIcon} 
                                placeholder="Last Name" 
                                inputType={textInput} 
                                inputVerify = {this.state.registerLastname.verify} 
                                recordInputValHandler = {(event) => this.setStateHandler(event, "registerLastname")} 
                                isError={this.state.registerLastNameMessage}
                            />

                            {this.errorPrintHandler(this.state.registerEmailMessage)}
                            <FieldContainer 
                                image={emailIcon} 
                                placeholder="Email" 
                                inputType={textInput} 
                                inputVerify = {this.state.registerEmail.verify} 
                                recordInputValHandler = {(event) => this.setStateHandler(event, "registerEmail")} 
                                isError={this.state.registerEmailMessage}
                            />
                            
                            {this.errorPrintHandler(this.state.registerPasswordMessage)}
                            <FieldContainer 
                                image={keyIcon} 
                                placeholder="Password" 
                                inputType={passwordInput} 
                                inputVerify = {this.state.registerPassword.verify} 
                                recordInputValHandler = {(event) => this.setStateHandler(event, "registerPassword")} 
                                isError={this.state.registerPasswordMessage}
                            />

                            <FieldContainer 
                                image={keyIcon} 
                                placeholder="Confirm Password" 
                                inputType={passwordInput} 
                                inputVerify = {this.state.registerPassword2.verify} 
                                recordInputValHandler = {(event) => this.setStateHandler(event, "registerPassword2")} 
                                isError={this.state.registerPasswordMessage}
                            />

                            <p>By creating an account you agree to our <a href="#Terms">Terms & Conditions</a> and <a href="#Policy">Privacy Policy</a>.</p>
                            <button type="button" onClick={this.registerSubmitHandler} >Sign up</button>

                        </div>
                    </div>   
                </div>
                {this.props.userAuthToken? setTimeout(() => {this.props.close()}, 1000):null}
            </div>
        )
    }
}

//bring in redux state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        LoginMessage: state.auth.message,
        userAuthToken: state.auth.userAuthToken
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