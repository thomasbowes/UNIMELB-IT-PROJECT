import React, {Component} from 'react';
import LoginWindow from '../../components/LoginWindow/LoginWindow'
import RegisterWindow from '../../components/RegisterWindow/RegisterWindow'
import FilesUpload from '../../components/FilesUpload/FilesUpload'
import './HomePage.css'
import happyAnimal from '../../assets/Pictures/happyAnimal.jpg'


class HomePage extends Component {


    render() {
        return (
            <div className={"HomePage"}>
                <h1>Welcome to folio exchange! We've been waiting for you</h1>
                <img src={happyAnimal} alt='' className='HappyAnimal'/>
            </div>
        )
    }
}

export default HomePage;