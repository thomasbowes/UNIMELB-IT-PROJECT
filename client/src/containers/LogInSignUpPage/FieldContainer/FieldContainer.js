import React, {Component} from 'react';

import classes from './FieldContainer.module.css';

class FieldContainer extends Component {
    errorInformHandler = () => {
        if (this.props.isError != null) {
            return true;
        } else {
            return false;
        }
    }


    render(){

        let iconClass = [classes["field-container__icon"]];
        let inputClass = [classes["field-container__input-field"]]

        if (this.errorInformHandler()) {
            iconClass.push(classes.Red);
            inputClass.push(classes.Red);
        }

        
        return (
            <div className={classes["field-container"]}>
                <img className={iconClass.join(" ")} src={this.props.image} alt=""></img>
                <input className={inputClass.join(" ")} 
                    type={this.props.inputType} 
                    placeholder={this.props.placeholder} 
                    name={this.props.placeholder}
                    onChange={this.props.recordInputValHandler}
                />
            </div>
        );
    }
}

export default FieldContainer;