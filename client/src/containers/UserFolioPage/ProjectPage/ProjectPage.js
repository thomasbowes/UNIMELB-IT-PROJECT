import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import AttachmentItem from '../../../components/ProfilePageFileTemplate/AttachmentItem/AttachmentItem';
import './ProjectPage.css'

import EditIcon from '../../../assets/EditIcons/edit.svg';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';
import {Link} from 'react-router-dom'
import FilesUpload from '../../../components/FilesUpload/FilesUpload';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import axios from "axios";
import crossIcon from '../../../assets/LoginPage-icons/cross.svg';
import EditForm from '../../../components/ProfilePageFileTemplate/EditForm/EditForm';

// Project Page, dynamically displays projects
class ProjectPage extends Component {
    
    state = {
        showPdf: false,
        files: [],
        projectBlock: {id: null}
    }


    componentDidMount() {
        const item_id = this.props.match.params.projectId;

        if(!item_id) return;

        const data = {
            item_id: item_id
        }

        // API Call to retrieve project data
        axios.post('/api/files/seeAll', data)
            .then(response => {
                this.setState({files: response.data.files});
            })
            .catch(error => {
                this.setState({files: []});
                console.log(error);
            });
    }

       
    // 
    changeTitleDes = (inputs) => {

        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        const headers = {
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }

        const data = {
            item_id: this.props.match.params.projectId,
            contents: inputs
        }
        
        axios.post('/api/itemblocks/update',data, headers)
            .then((res)=>{
                    this.setState({projectBlock: res.data.item});
                }
            )
            .catch((err)=>{
                console.log(err);
            })
    }

    // Delete an image attachment
    deleteImageByIndex = (index) => {
        const newImages = [...this.state.images];
        newImages.splice(index, 1);
        this.setState({images: newImages});
    }
    
    // does something
    doNothing = () => {

    }

    // return true if the visitor has the right to edit this userFolioPage
    checkHasRightToEdit = () => {
        const folioOwnerId = this.props.match.params.userId;
        const visitorToken = this.props.userAuthToken;

        // return true, if the visitor is the folioPage owner, or the visitor is an admin staff
        if (visitorToken !== null && folioOwnerId !== null && (folioOwnerId===visitorToken._id || this.props.userAuthToken.isAdmin)){
            return true;
        }
        return false;
    }

    // switches between edit mode to view mode
    changeEditable = () => {
        let newEditMode = 'view';
        if (this.props.match.params.editMode === 'edit'){
            newEditMode = 'view';
        }
        else{
            newEditMode = 'edit'
        }

        // Update url
        window.location.href = '/userfolio/' + 
                                this.props.match.params.userId + 
                                '/projects/' + 
                                this.props.match.params.projectId + 
                                '/' + 
                                newEditMode
    }

    // Check if in edit mode
    InEditMode = () => {
        return this.props.match.params.editMode === 'edit';
    }

    // Creates edit and cancel edits buttons
    editButtons = () => {
        if (this.InEditMode()){
            return <input className="project-page-container__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.changeEditable} />  
        }
        return <input className="project-page-container__edit" type="image" src={EditIcon} onClick={this.changeEditable} alt="edit"/>
    }

    // gets list of all image attachments
    getImages = (items) => {
        let imageList = [];
        for (let i=0; i<items.length; i++) {
            if (items[i].mimetype.slice(0, 5) === "image") {
                imageList.push(items[i]);
            }
        }
        return imageList;
    }

    // adds file to the list of attachments
    addFile = (file) => {
        let files = [...this.state.files];
        files.push(file);
        this.setState({files: files})

    }

    // Deletes an attachment by index
    deleteAttachmentHandler = (index) => {
        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        const headers = {
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }

        const data = {
            file_id: this.state.files[index]._id
        }

        // api call
        axios.post('/api/files/delete',data, headers)
            .then((res)=>{
                    let filesNew = [...this.state.files];
                    filesNew.splice(index, 1)
                    this.setState({files: filesNew});
                }
            )
            .catch((err)=>{
                console.log(err);
            })
        
    }

    // Convert image arrray into a format accepted by the gallery plugin
    galleryFormatConvertor = (items) => {
        let convertedList = [];
        for (let i=0; i<items.length; i++) {
            if (items[i].mimetype.slice(0, 5) === "image") {
                convertedList.push({
                    original: items[i].urlCloudinary,
                    thumbnail: items[i].urlCloudinary,
                    id: items[i]._id
                });
            }
        }
        return convertedList;
    }

    // delete the project based on project id
    deleteProjectHandler = (e) => {

        e.preventDefault();
        const { href } = e.target.parentElement

        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        const headers = {
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }

        const data = {
            item_id: this.props.match.params.projectId,
        }

        //api call
        axios.post('/api/itemblocks/delete',data, headers)
            .then((res)=>{
                }
            )
            .catch((err)=>{
                console.log(err);
            })
        
            setTimeout(() => {
                window.location.href = '/userfolio/' + this.props.match.params.userId;
            }, 700);

    }


    //get the data right after the user access his/her project page
    componentWillMount() {

        //set user id for query data
        const data = {
            item_id: this.props.match.params.projectId
        }

        //get itemBlocks
        axios.post('/api/itemblocks/see', data)
            .then(res => {
                if(this.isEmpty(res.data.itemblock)) this.props.history.push({pathname: '/notfound'});
                this.setState({projectBlock: res.data.itemblock});
            })
            .catch(error => {
                this.props.history.push({pathname: '/notfound'});
            });
    }

    // checks if object is empty
    isEmpty = (value) => {
        return Boolean(value && typeof value === 'object') && !Object.keys(value).length;
    }


    render() {

        // Generates list of non image attachments
        const showNonImageAttachments = this.state.files.map((item, index) => {
            
            if (item.mimetype.slice(0, 5) !== "image") {
                return <AttachmentItem
                            fileName=""
                            key={item._id}
                            name={item.title}
                            size={item.size}
                            url={item.urlCloudinary}
                            editable={this.InEditMode()}
                            hasThumbnail={false}
                            deleteAttachmentHandler={this.deleteAttachmentHandler}
                            index={index}/>
            } else {
                return null;
            }
        });

        // generates list of image attachments
        const showImageAttachments = this.state.files.map((item, index) => {
            
            if (item.mimetype.slice(0, 5) === "image") {
                return <AttachmentItem
                            fileName=""
                            key={item._id}
                            name={item.title}
                            size={item.size}
                            url={item.urlCloudinary}
                            editable={this.InEditMode()}
                            hasThumbnail={true}
                            deleteAttachmentHandler={this.deleteAttachmentHandler}
                            index={index}/>
            } else {
                return null;
            }
        });
                       
        return (
            <div className="project-page-container">

                {/* GO back to main page button */}
                <div style={{margin: "1rem 0"}}>
                    <Link to={"/userfolio/" + this.props.match.params.userId} >
                        <button className="project-page__go-back"> {"<"} Back to main portfolio </button>
                    </Link>
                </div>

                {this.InEditMode() && this.checkHasRightToEdit()? 

                    null
                :<h1 className="project-page-container__title">{this.state.projectBlock.title}</h1>}
                
                {/* Show image carousel */}
                {this.InEditMode()? null:   
                <Aux>
                    <div className="ImageGallery">   
                        {this.getImages(this.state.files).length > 0? 
                            <ImageGallery items={this.galleryFormatConvertor(this.getImages(this.state.files))} 
                                showThumbnails={false}
                                autoPlay={true}/>
                        :null}
                    </div> 
                </Aux>}

                {/* Generate edit form */}            
                {this.InEditMode() && this.checkHasRightToEdit()? 
                    <EditForm 
                        values={this.state.projectBlock} 
                        changeEditable = {this.changeEditable} 
                        changeValues={this.changeTitleDes}
                        fields={["title", "description"]}
                        fieldName={["Project Title", "Description"]}
                        inputTypes={["input", "large input"]}
                        isDeletable={true}
                        deleteItem={this.deleteProjectHandler}/>
                    :<Aux>
                        <p style={{fontSize: "1.2rem"}}>{this.state.projectBlock.description}</p>
                    </Aux>
                }

                {/* Show the delete item words in edit mode */}
                {this.InEditMode() && this.checkHasRightToEdit() && (this.state.files.length - this.getImages(this.state.files).length) > 0? 
                <div className="project-attachment-info">
                    <h3>Delete an attachment</h3>
                </div>:null}
                 
                {showNonImageAttachments}
                
                {this.InEditMode() && this.checkHasRightToEdit() && this.getImages(this.state.files).length > 0? 
                <div className="project-attachment-info">
                    <h3>Delete an image from carousel</h3>
                </div>:null}
                
                {/* Show image carasol if not in edit mode */}
                {this.InEditMode() && this.checkHasRightToEdit()? 
                showImageAttachments : null}

                {/* Show the uploading window if in the edit mode */}
                {this.InEditMode() && this.checkHasRightToEdit()? 
                <div className="project-attachment-info">
                    <h3>Drag and drop images or files below. Images will be added to a viewer and attachments at bottom of page.</h3>
                </div> : null}    

                {this.InEditMode() && this.checkHasRightToEdit()?
                    <FilesUpload
                        itemBlock_id= {this.props.match.params.projectId}
                        type='File'
                        maxFiles = {10}
                        accept = '*'
                        fileRejectMessage = 'Image, audio and video files only'
                        returnResult = {this.addFile}/>
                :null}

                {/* Generates edit buttons */}
                {this.checkHasRightToEdit()? this.editButtons()
                : null}

                {/* GO back to main page button */}
                <div style={{margin: "1rem 0"}}>
                    <Link to={"/userfolio/" + this.props.match.params.userId}>
                        <button className="project-page__go-back"> {"<"} Back to main portfolio </button>
                    </Link>
                </div>

            </div>
        )
    }
}

//bring in redux state
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        LoginMessage: state.auth.message,
        userAuthToken: state.auth.userAuthToken
    };
};


//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch( actionCreators.auth(email, password)),
        onLogout: () => dispatch(actionCreators.authLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);