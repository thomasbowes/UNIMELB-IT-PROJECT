import React, {Component} from 'react';
import './EducationHistoryItem.css';
import '../../../../containers/UserFolioPage/profileShared.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'
import EditForm from '../../EditForm/EditForm';
import EditIcon from '../../../../assets/EditIcons/edit.svg';
import FilesUpload from '../../../FilesUpload/FilesUpload';
import ShowMoreText from 'react-show-more-text';

// Generates education history item
class EducationalHistoryItem extends Component {

    state = {
        itemEditable: false,
        schoolEditable: false,
        durationEditable: false,
        descriptionEditable: false,
    }

    // determines whether item is editable
    componentDidUpdate = () => {
        if (!this.props.editable && this.state.itemEditable){
            this.setState({itemEditable: false})
        }
    } 

    // Switches edit mode
    itemEditableHandler = () => {
        this.setState({itemEditable: !this.state.itemEditable, 
                        schoolEditable: false,
                        durationEditable: false,
                        descriptionEditable: false})
    }

    // Checks if in edit mode
    checkItemEditable = () => {
        return this.props.editable && this.state.itemEditable;
    }

    // Change item info
    changeItemHandler = (input) =>{
        this.props.changeItemHandler(this.props.id, input)
    }

    // Delete itme
    itemDeleteHandler = () => {
        this.setState({itemEditable: false});
        this.props.hisItemRemoveHandler(this.props.id);
    }

    // change item image
    changeEduItemProfileImg = (img) => {
        this.props.changeEduItemProfileImg(img, this.props.id);
    }



    render(){

        // offsets item if in edit mode
        let overviewOffset = ["profile-sub-item__title"];
        if (this.props.editable) {
            overviewOffset.push("profile-sub-item__tab-off-set");
        }

        return (
            <Aux>
                <div className="profile-sub-item">
                    <div className="profile-sub-item__pic">
                        <img src={this.props.item.urlThumbnail} alt="education-history"/>
                    </div>

                    <div className="profile-item__info">
                        {!this.state.itemEditable? 
                            <Aux>
                                <div className={overviewOffset.join(" ")}>
                                    <h1>{this.props.item["organisation"] + ": " + this.props.item["title"]}</h1>

                                    <h1>{this.props.item["startDate"]} - {this.props.item["endDate"]}</h1>
                                </div>
                                
                                <div className="profile-sub-item__description">
                                    <ShowMoreText
                                        lines={3}
                                        more='Show more'
                                        less='Show less'
                                        anchorClass=''
                                        onClick={this.executeOnClick}
                                        expanded={false}>
                                            
                                        <div className="profile-sub-item__description">   
                                            {this.props.item["description"]}
                                        </div> 

                                    </ShowMoreText>    
                                </div>
                            </Aux>
                            :
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <EditForm 
                                    values={this.props.item} 
                                    fields={["title", "organisation", "startDate", "endDate", "description"]} 
                                    fieldName={["Qualification Name", "Organisation", "Start Date", "End Date", "Education Description"]}
                                    changeEditable = {this.itemEditableHandler} 
                                    changeValues = {this.changeItemHandler}
                                    inputTypes={["input", "input", "time period input", "time period input", "large input"]}
                                    isDeletable={true}
                                    deleteItem={this.itemDeleteHandler}
                                    />

                                <p>Upload Thumbnail Below. Note: File uploads cannot be undone.</p>

                                <FilesUpload
                                    type='ItemBlock'
                                    maxFiles = {1}
                                    itemBlock_id= {this.props.item._id}
                                    accept = 'image/*'
                                    fileRejectMessage = 'Image only'
                                    returnResult = {this.changeEduItemProfileImg}
                                />
                            </div>
                        }
                    </div>

                    {this.props.editable && !this.state.itemEditable? 
                    <Aux>
                        <input className="profile-sub-item_edit" type="image" src={EditIcon} onClick={this.itemEditableHandler} alt="edit"/>
                    </Aux> 
                    :null}
                </div>               
                {!this.props.isLastItem? <div className="horizontal-divider"></div>: <div style={{minHeight: "1rem"}}></div>} 
            </Aux>
        );
    }
}

export default EducationalHistoryItem