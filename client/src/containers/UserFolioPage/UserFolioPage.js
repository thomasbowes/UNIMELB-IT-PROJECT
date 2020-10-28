import React, {Component} from 'react';
import './UserFolioPage.css'
import {Link} from "react-router-dom"


import ProjectOverviewBlock from '../../components/ProfilePageFileTemplate/ProjectOverviewBlock/ProjectOverviewBlock';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';
import JobHistory from '../../components/ProfilePageFileTemplate/JobHistory/JobHistory';
import AddIcon from '../../assets/EditIcons/add.svg';
import crossIcon from '../../assets/LoginPage-icons/cross.svg';
import pdfIcon from '../../assets/Homepage-icons/pdf-icon.svg';
import ShareIcon from '../../assets/Homepage-icons/share-icon.svg';

import Aux from '../../hoc/Auxiliary/Auxiliary'

import "react-image-gallery/styles/css/image-gallery.css";
import UserProfile from '../../components/ProfilePageFileTemplate/UserProfile/UserProfile'

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import axios from "axios";

import EmailShareButton from '../../components/SocialMediaShareButtons/EmailShareButton/EmailShareButton';
import FacebookShareButton from '../../components/SocialMediaShareButtons/FacebookShareButton/FacebookShareButton';
import TwitterShareButton from '../../components/SocialMediaShareButtons/TwitterShareButton/TwitterShareButton';
import LinkedInShareButton from '../../components/SocialMediaShareButtons/LinkedInShareButton/LinkedInShareButton';


class UserFolioPage extends Component {

    state = {
        itemBlocks_Job: [],
        itemBlocks_Education: [],
        itemBlocks_Project: [],
        profileBlocks: {},
        shareModalOpen: false
    }

    
    componentDidMount() {
        const data = {
            user_id: this.props.match.params.userId
        }

       //get itemBlocks
        axios.post('/api/itemblocks/seeall', data)
            .then(response => {

                const itemBlocks_Job = response.data.itemblocks.flatMap((item) => item.type === 'Job' ? item : []);
                const itemBlocks_Education = response.data.itemblocks.flatMap((item) => item.type === 'Education' ? item: []);
                const itemBlocks_Project = response.data.itemblocks.flatMap((item) => item.type === 'Project' ? item : []);

                this.setState({itemBlocks_Job: itemBlocks_Job});
                this.setState({itemBlocks_Education: itemBlocks_Education});
                this.setState({itemBlocks_Project: itemBlocks_Project});

            })
            .catch(error => {
                this.setState({itemBlocks: []});
                console.log(error);
            });

       //get user profileBlock
        axios.post('/api/profileblocks/see', data)
            .then(response => {

                if(this.isEmpty(response.data.profile)) this.props.history.push({pathname: '/notfound'});
                this.setState({profileBlocks: response.data.profile});

            })
            .catch(error => {
                console.log(error);
                this.setState({profileBlocks: []});
                this.props.history.push({pathname: '/notfound'});
            });

    }

    isEmpty = (value) => {
        return Boolean(value && typeof value === 'object') && !Object.keys(value).length;
    }


    eduHisCopy = () => {
        const newItem = []
        let i = 0
        for (i=0; i<this.state.itemBlocks_Education.length; i++){
            newItem.push({...this.state.itemBlocks_Education[i]})
        }
        return newItem;
    }

    eduChangeHisItemHandler = (id, input) => {
        const newItem = this.eduHisCopy();
        newItem[id] = input
        this.setState({itemBlocks_Education: newItem})
        

    }

    eduItemRemoveHandler = (hisItemIndex) => {
        const newItem = this.eduHisCopy();       
        newItem.splice(hisItemIndex, 1);
        this.setState({itemBlocks_Education: newItem});
    }


    eduAddNewItemHandler = (newHisItem) => {

        const newItem = this.eduHisCopy();

        if (newItem.length >= 10){
            return;
        }
        newItem.push(newHisItem);

        this.setState({itemBlocks_Education: newItem})

    }

    jobHisCopy = () => {
        const newItem = []
        let i = 0
        for (i=0; i<this.state.itemBlocks_Job.length; i++){
            newItem.push({...this.state.itemBlocks_Job[i]})
        }
        return newItem;
    }

    jobChangeHisItemHandler = (id, input) => {
        const newItem = this.jobHisCopy();
        newItem[id] = input
        this.setState({itemBlocks_Job: newItem})
        

    }

    jobItemRemoveHandler = (hisItemIndex) => {
        const newItem = this.jobHisCopy();       
        newItem.splice(hisItemIndex, 1);
        this.setState({itemBlocks_Job: newItem});
    }


    jobAddNewItemHandler = (newJobItem) => {
        if (newItem.length >= 10){
            return;
        }
        const newItem = this.jobHisCopy();

        newItem.push(newJobItem);

        this.setState({itemBlocks_Job: newItem})

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

    changeProfileValues = (values) => {
        this.setState({profileBlocks: values})
    }

    projectOverviewBlock = () => {
        return this.state.itemBlocks_Project.map((item, index) => {
            return <ProjectOverviewBlock 
            item={item} 
            index={index} 
            key={item._id}
            hasEditingRight={this.checkHasRightToEdit()}
            />
        })
    }

    addProjectHandler = () => {

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
                type: 'Project',
                title: 'New Project Block'
            }
        }

        let newProjects = [...this.state.itemBlocks_Project];
        if (newProjects >= 10){
            return;
        }

        axios.post('/api/itemblocks/create',data, headers)
            .then((res)=>{
                    newProjects.push(res.data.item);
                    this.setState({itemBlocks_Project: newProjects});
                }
            )
            .catch((err)=>{
                console.log(err);
            })
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

    // return the add project button
    addProjectButton = () => {
        if (this.state.itemBlocks_Project.length >= 10){
            return <div>
                        <button className="profile-item__add-new" onClick={this.addProjectHandler} disabled="true">No more projects can be added, project Limit Reached</button>
                    </div>
        }
        return <div styles={{display: "flex", alignItems: "center"}}>
                    <button className="profile-item__add-new" onClick={this.addProjectHandler}><img src={AddIcon} alt="add-item"/> Add a new Project: {(this.state.itemBlocks_Project.length).toString() + '/10'}</button>
                </div>
    }

    // change the profile image
    changeProfilePic = (img) => {
        let newProfile = {...this.state.profileBlocks}
        newProfile.urlProfile = img
        this.setState({profileBlocks: newProfile}) 
    }

    // change the image for a job history item
    changeJobItemProfileImg = (img, index) => {
        let newJobs = this.jobHisCopy();
        newJobs[index].urlThumbnail = img;

        this.setState({itemBlocks_Job: newJobs});
    }

    // change the image for a edu history item
    changeEduItemProfileImg = (img, index) => {
        let newEdus = this.eduHisCopy();
        newEdus[index].urlThumbnail = img;

        this.setState({itemBlocks_Education: newEdus});
    }

    toggleShareWindow = () => {
        this.setState({shareModalOpen: !this.state.shareModalOpen});
    }
    
    //share-window__close-button
    generateShareWindow = (url) => {
        const pdfRoute = "/api/users/createPDF/";
        if (this.state.shareModalOpen){
            return(
                <div className="share-background" onClick={this.toggleShareWindow}>
                    <div className="share-window">
                        <div className="share-container">
                            <div className="share-window__color-bar"></div>
                            <h1 style={{flex: "1", margin: "0", paddingTop: "2rem"}}>Share Profile</h1>

                            <Link className="share-window__pdf-button" to= {pdfRoute + this.props.match.params.userId} target="_blank">
                                <img src={pdfIcon} alt="" style={{height: "2.5rem", width: "2.5rem"}}/>Generate Profile PDF
                            </Link>
                            <div className="share-window__share-buttons">
                                <FacebookShareButton profileLink={url} fromOwner={this.checkHasRightToEdit()}/>
                                <TwitterShareButton profileLink={url} fromOwner={this.checkHasRightToEdit()}/>
                                <LinkedInShareButton profileLink={url} fromOwner={this.checkHasRightToEdit()}/>
                                <EmailShareButton profileLink={url} fromOwner={this.checkHasRightToEdit()}/>
                            </div>
                            <div className="share-window__url">
                                <h2 style={{textAlign: "center", width: "90%", margin: "0 auto"}}>or share profile link</h2>
                                <p style={{wordWrap: "break-word", color: "black", textAlign: "center", fontSize: "2rem", borderStyle: "solid", borderWidth: "1px", padding: "1rem", backgroundColor: "rgba(0,0,0,0.1)"}}>{url}</p>
                            </div>
                            
                            <img className="share-window__close-button" src={crossIcon} alt=""  onClick={this.toggleShareWindow}/>
                            
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    editButton = () => {
        return (
        <a className="share-window__open" onClick={this.toggleShareWindow}>
            Share <img src={ShareIcon} alt=""/>
        </a>
        );
    }

    render() {
        
        return (
            <div className="UserFolioPage">

                {/*Share Buttons window*/}              
                {this.generateShareWindow(window.location.href)} 


                {/* Generates User Profile Blocks */}
                <UserProfile 
                    hasEditingRight={this.checkHasRightToEdit()}
                    changeProfileValues={this.changeProfileValues} 
                    values={this.state.profileBlocks}
                    changeProfilePic={this.changeProfilePic} 
                    shareButton={this.editButton}/>

                {/* Only show education block if there are items or the page is owned by observer */}
                {!this.checkHasRightToEdit() && this.state.itemBlocks_Education.length === 0?
                    null
                :   <EducationHistory
                        contents = {this.state.itemBlocks_Education}
                        changeItemHandler = {this.eduChangeHisItemHandler}
                        hisItemRemoveHandler = {this.eduItemRemoveHandler}
                        hisAddNewItemHandler = {this.eduAddNewItemHandler}
                        hasEditingRight = {this.checkHasRightToEdit()}
                        changeEduItemProfileImg={this.changeEduItemProfileImg}/>

                }

                {/* Only show Job block if there are items or the page is owned by observer */}
                {!this.checkHasRightToEdit() && this.state.itemBlocks_Job.length === 0?
                    null
                :   <JobHistory               
                        contents = {this.state.itemBlocks_Job}
                        changeItemHandler = {this.jobChangeHisItemHandler}
                        hisItemRemoveHandler = {this.jobItemRemoveHandler}
                        hisAddNewItemHandler = {this.jobAddNewItemHandler}                
                        hasEditingRight = {this.checkHasRightToEdit()}
                        changeJobItemProfileImg={this.changeJobItemProfileImg}/>
                }

                {/* Add Projects and Projects Header */}
                {!this.checkHasRightToEdit() && this.state.itemBlocks_Project.length === 0?
                    null
                :<Aux>
                    <h2 className="user-folio-page__subheading"> My Personal Projects </h2>
                    {this.projectOverviewBlock()}
                </Aux>}

                {/* Add Add project button if the owner is viewing their own page */}    
                {this.checkHasRightToEdit()?
                    this.addProjectButton()
                :   null
                }    
                
            </div>
        
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserFolioPage);
