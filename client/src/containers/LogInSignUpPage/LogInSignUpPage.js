import React, {Component} from 'react'
import bazinga from '../../assets/Pictures/bazinga.jpg'
import './LogInSignUpPage.css'
import LoginWindow from '../../components/LoginWindow/LoginWindow'
import FieldContainer from './FieldContainer/FieldContainer'
import crossIcon from '../../assets/LoginPage-icons/cross.svg';
import emailIcon from '../../assets/LoginPage-icons/email.svg';
import keyIcon from '../../assets/LoginPage-icons/key.svg';
import personIcon from '../../assets/LoginPage-icons/person.svg';
import { text } from 'body-parser'

class LogInPage extends Component{
    state = {
        wantToLogIn: true
    }

    changeWantLogInHandler = () =>{
        const login = this.state.wantToLogIn;
        this.setState({
            wantToLogIn: !login
        });
    }

    render() {
        const textInput = "text";
        const passwordInput = "password";

        return(
            // <div className={"LogInPage"}>
            //     { this.state.wantToLogIn ? 
            //         <LoginWindow wantLogIn={this.changeWantLogInHandler}/> : 
            //         <div>
            //             <h1>Just kidding~ You need to log in first~~~</h1>
            //             <img className={"Bazinga"} alt='' src={bazinga} />
            //             <button onClick={this.changeWantLogInHandler}> Go back to log in </button>
            //         </div> 
            //     }
            // </div>

            <div className="LoginSignUpPage">
                <div className="modal__color-bar"></div>
                <div className="login-signup"> 
                    <a className="login-signup__close" href="#">
                        <img src="images/cross.svg" alt="" />
                    </a>
                    <div className="login-signup__form">
                        <h1>Log In</h1>
                        <FieldContainer image={emailIcon} placeholder="Email" inputType={textInput}/>

                        <FieldContainer image={keyIcon} placeholder="Password" inputType={passwordInput}/>
        
                        <button type="button">Log In</button>
                        <button type="button">Log In with google</button>
                        <button type="button">Log Inwith facebook</button>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="login-signup__form">
                        <h1>Sign Up</h1>

                        <FieldContainer image={personIcon} placeholder="First Name" inputType={textInput}/>

                        <FieldContainer image={personIcon} placeholder="Last Name" inputType={textInput}/>

                        <FieldContainer image={emailIcon} placeholder="Email" inputType={textInput}/>

                        <FieldContainer image={keyIcon} placeholder="Password" inputType={passwordInput}/>
        
                        <FieldContainer image={keyIcon} placeholder="Confirm Password" inputType={passwordInput}/>
        
        
        
                        <p>By creating an account you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.</p>
                        <button type="button">Sign up</button>
                        <button type="button">Sign up with google</button>
                        <button type="button">Sign up with facebook</button>
                    </div>
                </div>   
            </div>

        )
    }
}

export default LogInPage;