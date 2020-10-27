import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import AttachmentItem from '../../../components/ProfilePageFileTemplate/AttachmentItem/AttachmentItem';
import './ProjectPage.css'

import EditIcon from '../../../assets/EditIcons/edit.svg';
import CancelIcon from '../../../assets/EditIcons/cancel.svg';
import {Link} from 'react-router-dom'

import FilesUpload from '../../../components/FilesUpload/FilesUpload';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import axios from "axios";

import crossIcon from '../../../assets/LoginPage-icons/cross.svg';

import EditForm from '../../../components/ProfilePageFileTemplate/EditForm/EditForm';


class ProjectPage extends Component {
    
    state = {
        showPdf: false,
        files: [],
        editMode: false,
        projectBlock: {}
    }


    componentDidMount() {
        //const item_id = this.props.itemBlock_id;5f81bdf6db99e33e48002c54

        const item_id = this.props.match.params.projectId;

        if(!item_id) return;

        //set item id for query data
        const data = {
            item_id: item_id
        }

        //get all files by given item_id
        axios.post('/api/files/seeAll', data)
            .then(response => {
                //console.log(response.data.files);
                this.setState({files: response.data.files});
 
            })
            .catch(error => {
                this.setState({files: []});
                console.log(error);
            });
    }

       

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

    deleteImageByIndex = (index) => {
        const newImages = [...this.state.images];
        newImages.splice(index, 1);
        this.setState({images: newImages});
    }



    editingImages = () => {
        return this.state.images.map((image, index) => {
            return <Aux>
                        <img src={crossIcon} alt="delete" onClick={() => this.deleteImageByIndex(index)}/>
                        <img src={image.original} alt={"image:"+image.id} />
                    </Aux>
        })
    }

    

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
        // otherwise return false
    }

    changeEditable = () => {
        const newEditMode = ! this.state.editMode
        this.setState({editMode: newEditMode})
    }

    editButtons = () => {
        if (this.state.editMode){
            return <input className="project-page-container__cancel" type="image" src={CancelIcon} alt="edit" onClick={this.changeEditable} />  
        }
        return <input className="project-page-container__edit" type="image" src={EditIcon} onClick={this.changeEditable} alt="edit"/>
    }

    // Renders all the attachment blocks that are not images when in view mode
    // Renders all the attachments that are not images than all the images when in edit mode
    
    getImages = (items) => {
        let imageList = [];
        for (let i=0; i<items.length; i++) {
            if (items[i].mimetype.slice(0, 5) === "image") {
                imageList.push(items[i]);
            }
        }
        return imageList;
    }

    addFile = (file) => {
        let files = [...this.state.files];
        files.push(file);
        this.setState({files: files})

    }

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
    deleteProjectHandler = () => {

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

        axios.post('/api/itemblocks/delete',data, headers)
            .then((res)=>{
                    return;
                }
            )
            .catch((err)=>{
                console.log(err);
            })

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
                console.log(res.data.itemblock);

                if(this.isEmpty(res.data.itemblock)) this.props.history.push({pathname: '/notfound'});
                this.setState({projectBlock: res.data.itemblock});
            })
            .catch(error => {
                //this.setState({projectBlock: {}});
                //console.log(error);
                this.props.history.push({pathname: '/notfound'});
            });
    }

    isEmpty = (value) => {
        return Boolean(value && typeof value === 'object') && !Object.keys(value).length;
    }


    render() {
        const showNonImageAttachments = this.state.files.map((item, index) => {
            
            if (item.mimetype.slice(0, 5) !== "image") {
                return <AttachmentItem
                    fileName=""
                    key={item._id}
                    name={item.title}
                    size={item.size}
                    url={item.urlCloudinary}
                    editable={this.state.editMode}
                    hasThumbnail={false}
                    deleteAttachmentHandler={this.deleteAttachmentHandler}
                    index={index}/>
            } else {
                return null;
            }
        });

        const showImageAttachments = this.state.files.map((item, index) => {
            
            if (item.mimetype.slice(0, 5) === "image") {
                return <AttachmentItem
                    fileName=""
                    key={item._id}
                    name={item.title}
                    size={item.size}
                    url={item.urlCloudinary}
                    editable={this.state.editMode}
                    hasThumbnail={true}
                    deleteAttachmentHandler={this.deleteAttachmentHandler}
                    index={index}/>
            } else {
                return null;
            }
        });
                       
        return (
            <div className="project-page-container">
                <div style={{margin: "1rem 0"}}>
                    <Link to={"/userfolio/" + this.props.match.params.userId} >
                        <button className="project-page__go-back"> {"<"} Back to main portfolio </button>
                    </Link>
                </div>
                {this.state.editMode && this.checkHasRightToEdit()? 
                    <h1 className="project-page-container__title">Edit Mode</h1>
                :<h1 className="project-page-container__title">{this.state.projectBlock.title}</h1>}
                
                {this.state.editMode? null:   
                <Aux>
                    <div className="ImageGallery">   
                        {this.getImages(this.state.files).length > 0? 
                            <ImageGallery items={this.galleryFormatConvertor(this.getImages(this.state.files))} 
                                showThumbnails={false}
                                autoPlay={true}/>
                        :null}
                    </div> 
                </Aux>}

                {this.checkHasRightToEdit() && this.state.editMode?
                    <Link to={"/userfolio/" + this.props.match.params.userId }>
                        <button onClick={this.deleteProjectHandler}>Delete this project</button>
                    </Link>
                :   null }

                {this.state.editMode && this.checkHasRightToEdit()? 
                    <EditForm values={this.state.projectBlock} 
                        changeEditable = {this.changeEditable} 
                        changeValues={this.changeTitleDes}
                        fields={["title", "description"]}
                        inputTypes={["input", "large input"]}/>
                    :<Aux>
                        <p style={{fontSize: "1.2rem"}}>{this.state.projectBlock.description}</p>
                    </Aux>
                }
                {this.state.editMode && this.checkHasRightToEdit() && (this.state.files.length - this.getImages(this.state.files).length) > 0? 
                <div className="project-attachment-info">
                    <h3>Delete an attachment</h3>
                </div>:null}
                
                {showNonImageAttachments}
                
                {this.state.editMode && this.checkHasRightToEdit() && this.getImages(this.state.files).length > 0? 
                <div className="project-attachment-info">
                    <h3>Delete an image from carousel</h3>
                </div>:null}

                {this.state.editMode && this.checkHasRightToEdit()? 
                showImageAttachments:null}

                {this.state.editMode && this.checkHasRightToEdit()? 
                <div className="project-attachment-info">
                    <h3>Drag and drop images or files below. Images will be added to a viewer and attachments at bottom of page.</h3>
                </div>:null}    

                {this.state.editMode && this.checkHasRightToEdit()?
                <FilesUpload
                    itemBlock_id= {this.props.match.params.projectId}
                    type='File'
                    maxFiles = {10}
                    accept = '*'
                    fileRejectMessage = 'Image, audio and video files only'
                    returnResult = {this.addFile}
                />:null}
                   
                {this.checkHasRightToEdit() && this.state.editMode?
                    <Link to={"/userfolio/" + this.props.match.params.userId}>
                        <button onClick={this.deleteProjectHandler}>Delete this project</button>
                    </Link>
                :   null }
                
                {this.checkHasRightToEdit()? this.editButtons()
                : null}
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