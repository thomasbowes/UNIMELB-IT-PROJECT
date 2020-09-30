import React, {Component} from 'react'
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

    state = {
        email: '',
        password: '',
        registerUsername: '',
        registerEmail: '',
        registerPassword: '',
        registerMessage: ''

    }

    loginSubmitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.email, this.state.password);
    }

    registerSubmitHandler = (event) =>{
        event.preventDefault();
        const data = {
            username: this.state.registerUsername,
            email: this.state.registerEmail,
            password: this.state.registerPassword
        };

        axios.post('http://localhost:5000/api/users/register', data)
            .then(response => {
                this.setState({registerMessage: response.data.status});
            });
    }

    //recordInputValHandler = (event) => {this.setState({[event.target.id]: event.target.value})}
    //recordInputValHandler = (input, event) => {this.setState({[input.target.id]: event.target.value})}
    //<FieldContainer image={personIcon} placeholder="Last Name" inputType={textInput}/>
    //<FieldContainer image={keyIcon} placeholder="Confirm Password" inputType={passwordInput}/>

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
                            <p>{this.props.message}</p>

                            <FieldContainer image={emailIcon} placeholder="Email" inputType={textInput} inputValue={this.state.email} recordInputValHandler = {(event) => {this.setState({email: event.target.value})}} />

                            <FieldContainer image={keyIcon} placeholder="Password" inputType={passwordInput}  inputValue={this.state.password} recordInputValHandler = {(event) => {this.setState({password: event.target.value})}} />
            
                            <button type="button" onClick={this.loginSubmitHandler}>Log In</button>
                            <button type="button">Log In with google</button>
                            <button type="button">Log Inwith facebook</button>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="login-signup__form">
                            <h1>Sign Up</h1>
                            <p>{this.state.registerMessage}</p>

                            <FieldContainer image={personIcon} placeholder="User Name" inputType={textInput} inputValue={this.state.registerUsername} recordInputValHandler = {(event) => {this.setState({registerUsername: event.target.value})}} />



                            <FieldContainer image={emailIcon} placeholder="Email" inputType={textInput} inputValue={this.state.registerEmail} recordInputValHandler = {(event) => {this.setState({registerEmail: event.target.value})}} />

                            <FieldContainer image={keyIcon} placeholder="Password" inputType={passwordInput} inputValue={this.state.registerPassword} recordInputValHandler = {(event) => {this.setState({registerPassword: event.target.value})}} />
            

            
            
            
                            <p>By creating an account you agree to our <a href="#Terms">Terms & Conditions</a> and <a href="#Policy">Privacy Policy</a>.</p>
                            <button type="button" onClick={this.registerSubmitHandler} >Sign up</button>
                            <button type="button">Sign up with google</button>
                            <button type="button">Sign up with facebook</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);