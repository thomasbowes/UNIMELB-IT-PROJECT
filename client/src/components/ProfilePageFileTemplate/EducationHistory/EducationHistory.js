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

class EducationHistory extends Component {

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
                    //console.log(res.data.item);
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
                type: 'Education',
                title: 'New Education Block'
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
            return <input className="profile-item__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.editableHandler} />  
        }
        return <input className="profile-item__edit" type="image" src={EditIcon} onClick={this.editableHandler} alt="edit"/>
    }

    changeEduItemProfileImg = (img, index) => {
        this.props.changeEduItemProfileImg(img, index);
    }

    addNewItemButton = () => {
        if (this.props.contents.length >= 10){
            return <button className="profile-item__add-new" disabled={true}><img src={AddIcon} alt="add-item"/> Opps, item limit reached</button>
        }
        return <button className="profile-item__add-new" onClick={this.addNewItemHander}><img src={AddIcon} alt="add-item"/> Add a new Item</button>
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
                    changeEduItemProfileImg={this.changeEduItemProfileImg}
                    />
        })

        return(
            <section className="profile-item">
                <h1 id="heading">Education History</h1>
                {this.props.hasEditingRight? 
                    this.editButton()
                :   null
                }
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