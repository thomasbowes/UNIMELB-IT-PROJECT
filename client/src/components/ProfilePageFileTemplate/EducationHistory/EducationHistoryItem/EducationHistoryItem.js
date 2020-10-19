import React, {Component} from 'react';
import './EducationHistoryItem.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'
import EditForm from '../../EditForm/EditForm';

class EducationalHistoryItem extends Component {
    state = {
        itemEditable: false,

        schoolEditable: false,
        durationEditable: false,
        descriptionEditable: false,

    }

    componentDidUpdate = () => {
        if (! this.props.editable && this.state.itemEditable){
            this.setState({itemEditable: false})
        }
    } 


    itemEditableHandler = () => {
        this.setState({itemEditable: !this.state.itemEditable, 
                        schoolEditable: false,
                        durationEditable: false,
                        descriptionEditable: false})
    }

    checkItemEditable = () => {
        return this.props.editable && this.state.itemEditable;
    }

    changeItemHandler = (input) =>{
        this.props.changeItemHandler(this.props.id, input)
    }

    itemDeleteHandler = () => {
        this.props.hisItemRemoveHandler(this.props.id);
    }


    render(){
        return (
            <Aux>
                <div className="education-history-item">
                    <div className="education-history__pic">
                        <a href="#image">
                            <img src={this.props.item[3]} alt="education-history"/>
                        </a>
                        {/* {this.state.itemEditable? <button>Edit Image</button>:null} */}
                    </div>
                    <div className="education-history__info">
                        {!this.state.itemEditable? 
                            <Aux>
                                <div className="overview__title">
                                    <a href="#title">
                                        <h1>{this.props.item[0]}</h1>
                                    </a>

                                    <h1>{this.props.item[1]}</h1>
                                </div>

                                <div className="overview__description">
                                    {this.props.item[2]}
                                </div>
                            </Aux>
                        :
                            <div>
                                <EditForm values={this.props.item.slice(0, 3)} fields={["name", "duration", "description"]} 
                                    changeEditable = {this.itemEditableHandler} changeValues = {this.changeItemHandler}
                                    inputTypes={["input", "input", "large input"]}/>
                            </div>
                        }
                    </div>
                </div>



                {this.props.editable? 
                    <Aux>
                        <button onClick={this.itemEditableHandler}>Edit this item</button> 
                        <button onClick={this.itemDeleteHandler}>Delete this item</button>
                    </Aux> 
                    :null}
                <div className="horizontal-divider"></div> 
            </Aux>
        );
    }
}

export default EducationalHistoryItem