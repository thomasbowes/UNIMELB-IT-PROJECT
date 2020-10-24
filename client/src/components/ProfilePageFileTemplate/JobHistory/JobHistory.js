import React, {Component} from 'react';
import './JobHistory.css'
import './JobHistoryItem/JobHistoryItem'
import JobHistoryItem from './JobHistoryItem/JobHistoryItem';
import EditIcon from '../../../assets/EditIcons/edit.svg';
import AddIcon from '../../../assets/EditIcons/add.svg';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';

import {connect} from "react-redux";
import axios from "axios";

class JobHistory extends Component {

    state = {editable: false}

    editableHandler = () =>{
        let oldEditable = this.state.editable 
        this.setState({editable: !oldEditable})
    }

    changeItemHandler = (id, input) => {

        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        const headers = {
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }

        const input_copy = {...input};

        delete input_copy.urlThumbnail;

        const data = {
            item_id: input_copy._id,
            contents: input_copy
        }

        axios.post('/api/itemblocks/update',data, headers)
            .then((res)=>{
                    this.props.changeItemHandler(id, res.data.item);
                }
            )
            .catch((err)=>{
                console.log(err);
            })
    }

    hisItemRemoveHandler = (hisItemIndex) => {

        const target = this.props.contents[hisItemIndex];

        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        const headers = {
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }

        const data = {
            item_id: target._id,
        }

        axios.post('/api/itemblocks/delete',data, headers)
            .then((res)=>{
                    this.props.hisItemRemoveHandler(hisItemIndex);
                }
            )
            .catch((err)=>{
                console.log(err);
            })
    }

    addNewItemHander = () => {
        // this.props.hisAddNewItemHandler();

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
                type: 'Job',
                title: 'New Job Block'
            }
        }

        axios.post('/api/itemblocks/create',data, headers)
            .then((res)=>{
                this.props.hisAddNewItemHandler(res.data.item);
                }
            )
            .catch((err)=>{
                console.log(err);
        })


    }

    // if the content is being edited, return the cross button. Otherwise return the pencil button
    editButton = () => {
        if (this.state.editable){
            return <input className="education-history__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.editableHandler} />  
        }
        return <input className="education-history__edit" type="image" src={EditIcon} onClick={this.editableHandler} alt="edit"/>
    }

    changeJobItemProfileImg = (img, index) => {
        this.props.changeJobItemProfileImg(img, index);
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
                    changeJobItemProfileImg={this.changeJobItemProfileImg}
                    />
        })

        return(
            <section className="job-history">
                <h1 id="heading">Job History</h1>
                {this.props.hasEditingRight? 
                    this.editButton()
                :   null
                }
                <div className="job-history-items">
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

export default connect(mapStateToProps, mapDispatchToProps)(JobHistory);