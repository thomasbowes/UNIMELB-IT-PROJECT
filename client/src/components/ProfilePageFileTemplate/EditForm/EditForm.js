import React, {Component} from 'react';
import './EditForm.css';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';

const regInput = "input";
const largeInput = "large input";

class EditForm extends Component{

    

    state = {
        inputs: this.props.values,
        fields: this.props.fields,
        inputTypes: this.props.inputTypes,
        oldValues: this.props.values
    }

    shouldComponentUpdate() {
        return this.state.value === this.state.oldValues;
      }


    inputChangeHandler = (event, index) => {
        if (index ===0) {
            console.log(event);
        }
        const newValue = event.target.value;
        const newInputs = [...this.state.inputs];

        newInputs[index] = newValue
        this.setState({inputs: newInputs});
    }

    //input has to be handled differently for large input
    largeInputChangeHandler = (event, index) => {
        
        console.log(event);
        
        const newValue = event.currentTarget.textContent;
        const newInputs = [...this.state.inputs];

        newInputs[index] = newValue
        this.setState({inputs: newInputs});
    }
    


    render(){
        return(
            <div className="edit-form__container">
                {this.state.inputs.map((value, index) => {
                    if (this.state.inputTypes[index] === regInput) {
                        return  (
                            <form key={index} className="edit-form__single-form-entry">
                                <p className="single-form-entry__desc">Set {this.state.fields[index]}:</p>
                                <input className="single-form-entry__regInput" type="text" defaultValue={value} onChange={(event) => this.inputChangeHandler(event, index)}></input>
                            </form>
                            )
                    } else if (this.state.inputTypes[index] === largeInput) {
                        return  (
                            <form key={index} className="edit-form__single-form-entry">
                                <p className="single-form-entry__desc">Set {this.state.fields[index]}:</p>
                                <span className="single-form-entry__textarea" role="textbox" onInput={(event) => this.largeInputChangeHandler(event, index)} contentEditable={true}>{value}</span> 
                                <input className="single-form-entry__largeInput" style={{display: "none"}} type="text" defaultValue={value} onChange={(event) => this.inputChangeHandler(event, index)}></input>
                            </form>
                            )
                    } else {
                        return <p>Error</p>
                    }
                    
                })}
                <hr className="edit-form-horizontal-line"></hr>
                <div className="edit-form__button-selection">
                    {this.props.isDeletable === true ? <button className="edit-form__cancel-button" onClick={this.props.deleteItem}>Delete</button> : <div></div>}
                    <button className="edit-form__save-button" onClick={() => {this.props.changeEditable(); this.props.changeValues(this.state.inputs)}}>Save Changes</button>
                </div>
                <input className="edit-form__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.props.changeEditable} />
            </div>
        );
    }
}

export default EditForm;