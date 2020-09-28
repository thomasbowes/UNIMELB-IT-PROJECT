import React, {Component} from 'react';

class FieldContainer extends Component {
    render(){
        return (
            <div className="field-container">
                <img className="field-container__icon" src="images/email.svg" alt=""></img>
                <input className="field-container__input-field" type="text" placeholder="Email" name="email" />
            </div>
        );
    }
}

export default FieldContainer;