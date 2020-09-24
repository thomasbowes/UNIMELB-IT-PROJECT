import React, {Component} from 'react'
import bazinga from '../../assets/Pictures/bazinga.jpg'
import './LogInPage.css'
import LoginWindow from '../../components/LoginWindow/LoginWindow'

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
        return(
            <div className={"LogInPage"}>
                { this.state.wantToLogIn ? 
                    <LoginWindow wantLogIn={this.changeWantLogInHandler}/> : 
                    <div>
                        <h1>Just kidding~ You need to log in first~~~</h1>
                        <img className={"Bazinga"} alt='' src={bazinga} />
                        <button onClick={this.changeWantLogInHandler}> Go back to log in </button>
                    </div> 
                }
            </div>

        )
    }
}

export default LogInPage;