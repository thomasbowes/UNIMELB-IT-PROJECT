import React, {Component} from 'react';
import './FieldContainer.css';

class FieldContainer extends Component {
    render(){
        return (
            <div className="field-container">
                <img className="field-container__icon" src={this.props.image} alt=""></img>
                <input className="field-container__input-field" 
                    type={this.props.inputType} 
                    placeholder={this.props.placeholder} 
                    name={this.props.placeholder}
                    inputValue={this.props.inputValue}
                    onChange={this.props.recordInputValHandler}
                />
            </div>
        );
    }
}

export default FieldContainer;