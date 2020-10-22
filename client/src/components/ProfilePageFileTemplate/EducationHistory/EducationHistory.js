import React, {Component} from 'react';
import './EducationHistory.css'
import './EducationHistoryItem/EducationHistoryItem'
import EducationalHistoryItem from './EducationHistoryItem/EducationHistoryItem';
import EditIcon from '../../../assets/EditIcons/edit.svg';
import AddIcon from '../../../assets/EditIcons/add.svg';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';

import {connect} from "react-redux";
import axios from "axios";

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

        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        const headers = {
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }

        const data = {
            contents: {
                type: 'Default',
                title: 'default'
            }
        }

        axios.post('/api/itemblocks/create',data, headers)
            .then((res)=>{
                console.log(res.data);
                }
            )
            .catch((err)=>{
                console.log(err)
        })


    }

    // if the content is being edited, return the cross button. Otherwise return the pencil button
    editButton = () => {
        if (this.state.editable){
            return <input className="education-history__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.editableHandler} />  
        }
        return <input className="education-history__edit" type="image" src={EditIcon} onClick={this.editableHandler} alt="edit"/>
    }


    render (){

        const allItemsArray = this.props.contents.map((item, index) => {
            return <EducationalHistoryItem 
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
            <section className="education-history">
                <h1 id="heading">Education History</h1>
                {this.props.hasEditingRight? 
                    this.editButton()
                :   null
                }
                <div className="education-history-items">
                    {allItemsArray}
                </div>
                {this.state.editable && this.props.hasEditingRight? <div>
                            <hr style={{margin: "0"}}/>
                            <button className="education-history__add-new" onClick={this.addNewItemHander}><img src={AddIcon} alt="add-item"/> Add a new Item</button>
                        </div>:null}
            </section>

        );
    }
}


//bring in redux state
const mapStateToProps = state => {
    return {
        userAuthToken: state.auth.userAuthToken
    };
};

//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EducationHistory);