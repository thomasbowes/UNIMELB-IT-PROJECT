import React, {Component} from 'react';
import './JobHistoryItem.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'
import EditForm from '../../EditForm/EditForm';
import EditIcon from '../../../../assets/EditIcons/edit.svg';
import FilesUpload from '../../../FilesUpload/FilesUpload';
import ShowMoreText from 'react-show-more-text';


class JobHistoryItem extends Component {
    state = {
        itemEditable: false,
        jobEditable: false,
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
                        jobEditable: false,
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

    changeJobItemProfileImg = (img) => {
        this.props.changeJobItemProfileImg(img, this.props.id);
    }



    render(){
        let overviewOffset = ["overview__title"]; //classes

        if (this.props.editable) {
            overviewOffset.push("education-history__tab-off-set");
        }

        return (
            <Aux>
                <div className="job-history-item">
                    <div className="education-history__pic">
                        <a href="#image">
                            <img src={this.props.item["urlThumbnail"]} alt="job-history"/>
                        </a>
                        {/* {this.state.itemEditable? <button>Edit Image</button>:null} */}
                    </div>
                    <div className="education-history__info">
                        {!this.state.itemEditable? 
                            <Aux>
                                <div className={overviewOffset.join(" ")}>
                                    <a href="#title">
                                        <h1>{this.props.item["organisation"] + ": " + this.props.item["title"]}</h1>
                                    </a>

                                    <h1>{this.props.item["startDate"]} - {this.props.item["endDate"]}</h1>
                                </div>

                                <div className="overview__description">
                                    <ShowMoreText
                                        /* Default options */
                                        lines={3}
                                        more='Show more'
                                        less='Show less'
                                        anchorClass=''
                                        onClick={this.executeOnClick}
                                        expanded={false}
                                        
                                    >
                                        {this.props.item["description"]}
                                    </ShowMoreText> 
                                </div>
                            </Aux>
                        :
                            <div>
                                <EditForm 
                                    values={this.props.item} 
                                    fields={["title", "organisation", "startDate", "endDate", "description"]} 
                                    changeEditable = {this.itemEditableHandler} 
                                    changeValues = {this.changeItemHandler}
                                    inputTypes={["input", "input", "time period input", "time period input", "large input"]}
                                    isDeletable={true}
                                    deleteItem={this.itemDeleteHandler}
                                    />
                                <FilesUpload
                                    type='ItemBlock'
                                    maxFiles = {1}
                                    itemBlock_id= {this.props.item._id}
                                    accept = 'image/*'
                                    fileRejectMessage = 'Image only'
                                    returnResult = {this.changeJobItemProfileImg}
                                />
                            </div>
                        }
                    </div>

                    {this.props.editable && !this.state.itemEditable? 
                    <Aux>
                        <input className="job-history-item_edit" type="image" src={EditIcon} onClick={this.itemEditableHandler} alt="edit"/>
                        
                    </Aux> 
                    :null}
                    
                </div>               
                {!this.props.isLastItem? <div className="horizontal-divider"></div>: <div style={{minHeight: "1rem"}}></div>} 
            </Aux>
        );
    }
}

export default JobHistoryItem; 