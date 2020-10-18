import React, {Component} from 'react';
import './EditForm.css';

const regInput = "input";
const largeInput = "large input";

class EditForm extends Component{

    

    state = {
        inputs: this.props.values,
        fields: this.props.fields,
        inputTypes: this.props.inputTypes,
    }


    inputChangeHandler = (event, index) => {
        const newValue = event.target.value;
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
                            <form className="Edit-Form__single-form-entry">
                                <p className="single-form-entry__desc">Set {this.state.fields[index]}:</p>
                                <input className="single-form-entry__regInput" type="text" defaultValue={value} onChange={(event) => this.inputChangeHandler(event, index)}></input>
                            </form>
                            )
                    } else if (this.state.inputTypes[index] === largeInput) {
                        return  (
                            <form className="Edit-Form__single-form-entry">
                                <p className="single-form-entry__desc">Set {this.state.fields[index]}:</p>
                                <span className="textarea" role="textbox" contentEditable></span> 
                                <input className="single-form-entry__largeInput" style={{display: "none"}} type="text" defaultValue={value} onChange={(event) => this.inputChangeHandler(event, index)}></input>
                            </form>
                            )
                    } else {
                        return <p>Error</p>
                    }
                    
                })}
                <hr></hr>
                <div className="edit-form__button-selection">
                    <button className="Edit-Form__cancel-button" onClick={this.props.changeEditable}>Cancel</button>
                    <button className="Edit-Form__save-button" onClick={() => {this.props.changeEditable(); this.props.changeValues(this.state.inputs)}}>Save Changes</button>
                </div>
            </div>
            // <form>
            //     <input type="text" defaultValue={this.props.oldValue} onChange={this.inputChangeHandler} />
            //     <button type="button" onClick={() => this.props.saveChange(this.state.input)}>save</button>
            // </form>
        );
    }
}

export default EditForm;