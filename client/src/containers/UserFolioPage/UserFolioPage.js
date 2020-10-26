import React, {Component} from 'react';
import './UserFolioPage.css'
import {Link} from "react-router-dom"


import ProjectOverviewBlock from '../../components/ProfilePageFileTemplate/ProjectOverviewBlock/ProjectOverviewBlock';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';
import JobHistory from '../../components/ProfilePageFileTemplate/JobHistory/JobHistory';
import AddIcon from '../../assets/EditIcons/add.svg';

import google1 from '../../assets/ProfilePageDocuments/google.png';

import "react-image-gallery/styles/css/image-gallery.css";
import UserProfile from '../../components/ProfilePageFileTemplate/UserProfile/UserProfile'

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import axios from "axios";


class UserFolioPage extends Component {

    state = {
        itemBlocks_Job: [],
        itemBlocks_Education: [],
        itemBlocks_Project: [],
        profileBlocks: {},
    }

    randomId = () => {
        let r = Math.random().toString(36).substring(7);
        return r; 
    }

    createDefaultProject = () => {
        return {
            title: "Default Name",
            description: "Default description",
            urlThumbnail: google1,
            public_id: this.randomId()
        }
    }

    //get the data right after the user access his/her folio page
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
                console.log(response.data.profile);
                this.setState({profileBlocks: response.data.profile});
            })
            .catch(error => {
                this.setState({profileBlocks: []});
                console.log(error);
            });

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

        axios.post('/api/itemblocks/create',data, headers)
            .then((res)=>{
                    let newProjects = [...this.state.itemBlocks_Project];
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

    // return teh add project button
    addProjectButton = () => {
        if (this.state.itemBlocks_Project.length >= 10){
            return <button className="education-history__add-new" onClick={this.addProjectHandler} disabled="true">No more projects can be added, project Limit Reached</button>
        }
        return <button className="education-history__add-new" onClick={this.addProjectHandler}><img src={AddIcon} alt="add-item"/> Add a new Project: {(this.state.itemBlocks_Project.length).toString() + '/10'}</button>
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

    render() {
        const pdfRoute = "/api/users/createPDF/";
          return (
            <div className="UserFolioPage">
                {this.checkHasRightToEdit()?
                    <Link to= {pdfRoute + this.props.match.params.userId} target="_blank">
                        <button>Convert this myFolioPage to pdf</button>
                    </Link>
                :   null}
                <button>Share this userFolioPage</button>

                <UserProfile 
                    itemBlock_id='5f81bdf6db99e33e48002c54' 
                    hasEditingRight={this.checkHasRightToEdit()}
                    changeProfileValues={this.changeProfileValues} 
                    values={this.state.profileBlocks}
                    changeProfilePic={this.changeProfilePic}/>

                
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
                <div> Projects </div>
                {!this.checkHasRightToEdit() && this.state.itemBlocks_Project.length === 0?
                    null
                :   this.projectOverviewBlock()
                }

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