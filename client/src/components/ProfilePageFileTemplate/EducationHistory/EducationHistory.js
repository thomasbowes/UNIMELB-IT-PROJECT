import React, {Component} from 'react';
import './EducationHistory.css'
import './EducationHistoryItem/EducationHistoryItem'
import EducationalHistoryItem from './EducationHistoryItem/EducationHistoryItem';
import EditIcon from '../../../assets/EditIcons/edit.svg';
class EducationHistory extends Component {

    state = {editable: false}

    editableHandler = () =>{
        let oldEditable = this.state.editable 
        this.setState({editable: !oldEditable})
    }

    changeItemHandler = (id, input) => {
        this.props.changeItemHandler(id, input);
    }

    hisItemRemoveHandler = (hisItemIndex) => {
        this.props.hisItemRemoveHandler(hisItemIndex);
    }

    addNewItemHander = () => {
        this.props.hisAddNewItemHandler();
    }


    render (){

        const allItemsArray = this.props.contents.map((item, index) => {
            return <EducationalHistoryItem 
                    item = {item}
                    editable={this.state.editable}

                    key={index}
                    id = {index}
                    changeItemHandler={this.changeItemHandler}
                    hisItemRemoveHandler = {this.hisItemRemoveHandler}/>
        })

        return(
            <section className="education-history">
                <h1 id="heading">Education History</h1>
                {this.state.editable? <button onClick={this.editableHandler}>Done</button> 
                                    : <input className="education-history__edit" type="image" src={EditIcon} onClick={this.editableHandler} alt="edit"/>}
                <div className="education-history-items">
                    {allItemsArray}
                </div>
                {this.state.editable? <button onClick={this.addNewItemHander}>Add a new Item</button>:null}
            </section>

        );
    }
}

export default EducationHistory; 