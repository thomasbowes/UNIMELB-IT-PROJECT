import React, {Component} from 'react';
import './EditForm.css';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';
import _ from 'lodash';

const regInput = "input";
const largeInput = "large input";
const timePeriodInput = "time period input";
const MAXYEAR = 2020;
const MINYEAR = 1950;


class EditForm extends Component{

    

    state = {
        inputs: this.props.values,
        fields: this.props.fields,
        inputTypes: this.props.inputTypes,
        oldValues: this.props.values,
    }

    // shouldComponentUpdate() {
    //     return this.state.inputs === this.state.oldValues;
    //   }


    inputChangeHandler = (event, value) => {
        // if (index ===0) {
        //     console.log(event);
        // }
        const newValue = event.target.value;
        const newInputs = {...this.state.inputs};

        newInputs[value] = newValue;
        this.setState({inputs: newInputs});
    }

    //input has to be handled differently for large input
    largeInputChangeHandler = (event, value) => {
        
        console.log(event);
        
        const newValue = event.currentTarget.textContent;
        const newInputs = {...this.state.inputs};

        newInputs[value] = newValue;
        this.setState({inputs: newInputs});
    }
    
    timePeriodInputChangeHandler = (event, value) => {
        const newValue =event.target.value;
        const newInputs = {...this.state.inputs};

        newInputs[value] = newValue;
        this.setState({inputs: newInputs});
    }
    
    render(){
        return(
            <div className="edit-form__container">
                {this.state.fields.map((value, index) => {
                    if (this.state.inputTypes[index] === regInput) {
                        return  (
                            <form key={index} className="edit-form__single-form-entry">
                                <p className="single-form-entry__desc">Set {this.state.fields[index]}:</p>
                                <input className="single-form-entry__regInput" type="text" defaultValue={this.state.inputs[value]} onChange={(event) => this.inputChangeHandler(event, value)}></input>
                            </form>
                            )
                    } else if (this.state.inputTypes[index] === largeInput) {
                        return  (
                            <form key={index} className="edit-form__single-form-entry">
                                <p className="single-form-entry__desc">Set {this.state.fields[index]}:</p>
                                <span className="single-form-entry__textarea" role="textbox" 
                                    onInput={(event) => this.largeInputChangeHandler(event, value)} 
                                    contentEditable={true}>{this.state.inputs[value]}
                                </span> 
                            </form>
                            )
                    } else if (this.state.inputTypes[index] === timePeriodInput) {
                        return  (
                            <form key={index} className="edit-form__single-form-entry">
                                <label for={this.state.fields[index]}>Set {this.state.fields[index]}:</label>
                                <select id={this.state.fields[index]} name={this.state.fields[index]} onChange={(event) => this.timePeriodInputChangeHandler(event, value)} value={this.state.inputs[value]} >
                                    <option value="">n/a</option>
                                    {this.state.fields[index] === "endDate"?<option value="present">present</option>:null}
                                    { _.range(MAXYEAR, MINYEAR-1).map(value => <option key={value} value={value}>{value}</option>) }
                                </select>

                                
                                
                            </form>
                            
                            )
                    }else {
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