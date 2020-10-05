import React, {Component} from 'react';
import './RegisterNotificationPage.css';

class RegisterNotificationPage extends Component {
    render() {
        return (
            <div className="product-promo">
                <div className="product-promo__slogan">
                    <h1 style={{color:"white"}}>Thank you for signing up!</h1>
                    <h3 style={{color:"white"}}>You could now login and upload your ePortFolio!</h3>
                </div>
            </div>
        );
    }
}

export default RegisterNotificationPage;