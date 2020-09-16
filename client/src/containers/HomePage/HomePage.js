import React, {Component} from 'react';
import LoginWindow from '../../components/LoginWindow/LoginWindow'
import RegisterWindow from '../../components/RegisterWindow/RegisterWindow'
import bazinga from '../../assets/bazinga.jpg'
import classes from './HomePage.css'


class HomePage extends Component {
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
        console.log(this.state.wantToLogIn);
        return (
            <div className={classes.HomePage}>
                { this.state.wantToLogIn ? 
                    <LoginWindow wantLogIn={this.changeWantLogInHandler}/> : 
                    <div>
                        <h1>Just kidding~ You need to log in first~~~</h1>
                        <img className={classes.Bazinga} alt='' src={bazinga} />
                        <button onClick={this.changeWantLogInHandler}> Go back to log in </button>
                    </div> 
                }
                <RegisterWindow />

            </div>
        )
    }
}

export default HomePage;