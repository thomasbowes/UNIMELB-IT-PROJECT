import React, {Component} from 'react';
import './EducationHistory.css'
import '../../../containers/UserFolioPage/profileShared.css';
import './EducationHistoryItem/EducationHistoryItem'
import EducationalHistoryItem from './EducationHistoryItem/EducationHistoryItem';
import EditIcon from '../../../assets/EditIcons/edit.svg';
import AddIcon from '../../../assets/EditIcons/add.svg';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';

import {connect} from "react-redux";
import axios from "axios";

// Generates education history section of the profile page
class EducationHistory extends Component {

    state = {editable: false}

    // Switches the section between edit and view mode
    editableHandler = () =>{
        let oldEditable = this.state.editable 
        this.setState({editable: !oldEditable})
    }

    // Updates the state and the database to any modification that occur
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
        delete input_copy.public_id;

        const data = {
            item_id: input_copy._id,
            contents: input_copy
        }

        // API call to backend
        axios.post('/api/itemblocks/update',data, headers)
            .then((res)=>{
                    this.props.changeItemHandler(id, res.data.item);
                }
            )
            .catch((err)=>{
                console.log(err);
            })
    }

    // Updates the state and the database to any deletions that occur
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

        // API call to backend
        axios.post('/api/itemblocks/delete',data, headers)
            .then((res)=>{
                    this.props.hisItemRemoveHandler(hisItemIndex);
                }
            )
            .catch((err)=>{
                console.log(err);
            })
    }

    // Creates an empty new subitem
    addNewItemHander = () => {

        // Makes sure that item limits are not exceeded
        const limitNumBlocks = 10;
        if(this.props.contents.length >= limitNumBlocks) return;

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
                type: 'Education',
                title: 'New Education Block'
            }
        }

        // API call to back end
        axios.post('/api/itemblocks/create',data, headers)
            .then((res)=>{
                this.props.hisAddNewItemHandler(res.data.item);
                }
            )
            .catch((err)=>{
                console.log(err);
        })


    }

    // if the content is being edited, return the cancel button. Otherwise return the edit button
    editButton = () => {
        if (this.state.editable){
            return <input className="profile-item__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.editableHandler} />  
        }
        return <input className="profile-item__edit" type="image" src={EditIcon} onClick={this.editableHandler} alt="edit"/>
    }

    // Update profile image of a education item
    changeEduItemProfileImg = (img, index) => {
        this.props.changeEduItemProfileImg(img, index);
    }
    
    // Button that adds new items
    addNewItemButton = () => {
        if (this.props.contents.length >= 10){
            return <button className="profile-item__add-new" disabled={true}><img src={AddIcon} alt="add-item"/> Opps, item limit reached</button>
        }
        return <button className="profile-item__add-new" onClick={this.addNewItemHander}><img src={AddIcon} alt="add-item"/> Add a new Item</button>
    }


    render (){

        // Generates all the education history items
        const allItemsArray = this.props.contents.map((item, index) => {
            return <EducationalHistoryItem 
                        item = {item}
                        editable={this.state.editable}
                        key={index}
                        id = {index}
                        changeItemHandler={this.changeItemHandler}
                        hisItemRemoveHandler = {this.hisItemRemoveHandler}
                        isLastItem={this.props.contents.length === index+1}
                        changeEduItemProfileImg={this.changeEduItemProfileImg}
                    />
        })

        return(
            <section className="profile-item">
                <h1 id="heading">Education History</h1>
                {this.props.hasEditingRight? this.editButton() : null}
                
                <div className="profile-items">
                    {allItemsArray}
                </div>

                {this.state.editable && this.props.hasEditingRight? 
                        <div>
                            <hr style={{margin: "0"}}/>
                            {this.addNewItemButton()}
                        </div>
                :null}
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