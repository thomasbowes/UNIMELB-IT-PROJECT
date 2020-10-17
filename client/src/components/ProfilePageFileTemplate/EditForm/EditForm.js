import React, {Component} from 'react';

class EditForm extends Component{
    state = {
        inputs: this.props.values,
        fields: this.props.fields,
    }


    inputChangeHandler = (event, index) => {
        const newValue = event.target.value;
        const newInputs = [...this.state.inputs];

        newInputs[index] = newValue
        this.setState({inputs: newInputs});
    }
    


    render(){
        return(
            <div>
                {this.state.inputs.map((value, index) => {
                    return  <form>
                                <p>Set {this.state.fields[index]}:</p>
                                <input type="text" defaultValue={value} onChange={(event) => this.inputChangeHandler(event, index)}></input>
                            </form>
                })}
                <button onClick={() => {this.props.changeEditable(); this.props.changeValues(this.state.inputs)}}>Save</button>
            </div>
            // <form>
            //     <input type="text" defaultValue={this.props.oldValue} onChange={this.inputChangeHandler} />
            //     <button type="button" onClick={() => this.props.saveChange(this.state.input)}>save</button>
            // </form>
        );
    }
}

export default EditForm;