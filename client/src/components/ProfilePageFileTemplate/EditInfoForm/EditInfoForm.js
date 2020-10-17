import React, {Component} from 'react';

class EditInfoForm extends Component{
    state = {
        input: this.props.oldValue
    }

    inputChangeHandler = (event) => {
        this.setState({input: event.target.value});
    }
    

    render(){
        return(
            <form>
                <input type="text" defaultValue={this.props.oldValue} onChange={this.inputChangeHandler} />
                <button type="button" onClick={() => this.props.saveChange(this.state.input)}>save</button>
            </form>
        );
    }
}

export default EditInfoForm;