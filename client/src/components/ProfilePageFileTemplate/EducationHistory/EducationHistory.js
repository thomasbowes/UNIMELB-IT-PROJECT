import React, {Component} from 'react';
import './EducationHistory.css'
import './EducationHistoryItem/EducationHistoryItem'
import EducationalHistoryItem from './EducationHistoryItem/EducationHistoryItem';

class EducationHistory extends Component {

    state = {editable: false}

    editableHandler = () =>{
        let oldEditable = this.state.editable 
        this.setState({editable: !oldEditable})
    }

    changeItemHandler = (itemType, id, input) => {
        this.props.changeItemHandler(itemType, id, input);
    }

    hisItemRemoveHandler = (hisItemIndex) => {
        this.props.hisItemRemoveHandler(hisItemIndex);
    }

    addNewItemHander = () => {
        this.props.hisAddNewItemHandler();
    }


    render (){

        const allItemsArray = this.props.ids.map((id, index) => {
            return <EducationalHistoryItem 
                    school={this.props.schools[index]} 
                    description={this.props.descriptions[index]} 
                    image={this.props.images[index]}
                    duration={this.props.durations[index]}
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
                                    : <button onClick={this.editableHandler}>Edit</button>}
                <div className="education-history-items">
                    {allItemsArray}
                </div>
                {this.state.editable? <button onClick={this.addNewItemHander}>Add a new Item</button>:null}
            </section>

        );
    }
}

export default EducationHistory; 