import React, {Component} from 'react';
import './LoginWindow.css';
import {Link} from 'react-router-dom';

//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';



class LoginWindow extends Component {
    render(){
        return (
            <div className="LoginWindow">
                <h3>Please Log In Your Account</h3>
                <input type='text' placeholder='User Name'/>
                <input type= 'password' placeholder='Password'/>
                <button>Log In</button>
                <Link to={'/signup'}><button>Sign Up</button></Link>
                <button onClick={this.props.wantLogIn}>Look Around Without Logging In</button>
                
            </div>
        );
    }
}


//bring in redux state
const mapStateToProps = state => {
    return {
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        //onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ))

    };
};





export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow);