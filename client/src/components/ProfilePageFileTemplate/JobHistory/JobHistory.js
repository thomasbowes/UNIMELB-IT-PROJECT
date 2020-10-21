import React, {Component} from 'react';
import './JobHistory.css'
import './JobHistoryItem/JobHistoryItem'
import JobHistoryItem from './JobHistoryItem/JobHistoryItem';
import EditIcon from '../../../assets/EditIcons/edit.svg';
import AddIcon from '../../../assets/EditIcons/add.svg';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';

class JobHistory extends Component {

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
            return <JobHistoryItem 
                    item = {item}
                    editable={this.state.editable}
                    key={index}
                    id = {index}
                    changeItemHandler={this.changeItemHandler}
                    hisItemRemoveHandler = {this.hisItemRemoveHandler}
                    isLastItem={this.props.contents.length === index+1}
                    />
        })

        return(
            <section className="job-history">
                <h1 id="heading">Job History</h1>
                {this.state.editable? <input className="education-history__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.editableHandler} />  
                                    : <input className="education-history__edit" type="image" src={EditIcon} onClick={this.editableHandler} alt="edit"/>}
                <div className="job-history-items">
                    {allItemsArray}
                </div>
                {this.state.editable? <div>
                            <hr style={{margin: "0"}}/>
                            <button className="education-history__add-new" onClick={this.addNewItemHander}><img src={AddIcon} alt="add-item"/> Add a new Item</button>
                        </div>:null}
            </section>

        );
    }
}

export default JobHistory; 