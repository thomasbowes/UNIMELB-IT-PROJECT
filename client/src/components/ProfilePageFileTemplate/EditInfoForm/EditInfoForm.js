import React, {Component} from 'react';

class EditInfoForm extends Component{
    state = {
        input: null
    }

    inputChangeHandler = (event) => {
        this.setState({input: event.target.value});
    }

    render(){
        return(
            <form>
                <input type="text" onChange={this.inputChangeHandler} />
                <button>save</button>
            </form>
        );
    }
}

export default EditInfoForm;