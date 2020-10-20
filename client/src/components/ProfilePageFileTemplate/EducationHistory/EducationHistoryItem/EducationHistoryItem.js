import React, {Component} from 'react';
import './EducationHistoryItem.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'
import EditForm from '../../EditForm/EditForm';
import EditIcon from '../../../../assets/EditIcons/edit.svg';


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
        this.setState({itemEditable: false});
        this.props.hisItemRemoveHandler(this.props.id);
    }


    render(){
        let overviewOffset = ["overview__title"]; //classes

        if (this.props.editable) {
            overviewOffset.push("education-history__tab-off-set");
        }

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
                                <div className={overviewOffset.join(" ")}>
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
                                <EditForm 
                                    values={this.props.item.slice(0, 3)} 
                                    fields={["name", "duration", "description"]} 
                                    changeEditable = {this.itemEditableHandler} 
                                    changeValues = {this.changeItemHandler}
                                    inputTypes={["input", "input", "large input"]}
                                    isDeletable={true}
                                    deleteItem={this.itemDeleteHandler}
                                    />
                            </div>
                        }
                    </div>

                    {this.props.editable && !this.state.itemEditable? 
                    <Aux>
                        <input className="education-history-item_edit" type="image" src={EditIcon} onClick={this.itemEditableHandler} alt="edit"/>
                        
                    </Aux> 
                    :null}
                    
                </div>               
                {!this.props.isLastItem? <div className="horizontal-divider"></div>: <div style={{minHeight: "1rem"}}></div>} 
            </Aux>
        );
    }
}

export default EducationalHistoryItem