import React, {Component} from 'react';
import './UserFolioPage.css'


import ProfileBlockWithImage from '../../components/ProfilePageFileTemplate/ProjectBlockWithImage/ProfileBlockWithImage';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';
import JobHistory from '../../components/ProfilePageFileTemplate/JobHistory/JobHistory';

import google1 from '../../assets/ProfilePageDocuments/google.png';

import "react-image-gallery/styles/css/image-gallery.css";
import UserProfile from '../../components/ProfilePageFileTemplate/UserProfile/UserProfile'
import eggImage from '../../assets/ProfilePageDocuments/egg.jpg'

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import axios from "axios";



const text = "The egg is the organic vessel containing the zygote in which an embryo develops until it can survive on its own, at which point the animal hatches. An egg results from fertilization of an egg cell. Most arthropods, vertebrates (excluding live-bearing mammals), and mollusks lay eggs, although some, such as scorpions, do not. Reptile eggs, bird eggs, and monotreme eggs are laid out of water and are surrounded by a protective shell, either flexible or inflexible. Eggs laid on land or in nests are usually kept within a warm and favorable temperature range while the embryo grows. When the embryo is adequately developed it hatches, i.e., breaks out of the egg's shell. Some embryos have a temporary egg tooth they use to crack, pip, or break the eggshell or covering."
const des = "A dedicated eggspert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work."
const name = "Mr. Eggy Egglington"
const highLevelDes = "An eggcellent student at Eggy Institute of Technology"

class UserFolioPage extends Component {

    state = {
        itemBlocks_Job: [{
            startDate: "2018",
            endDate: "present",
            organisation: "google",
            title: "founder and ceo",
            description: text+text,
            thumbnail: google1
        },
        {
            startDate: "2013",
            endDate: "2018",
            organisation: "maccas",
            title: "Chief burger flipper",
            description: text+text,
            thumbnail: google1
        },
        {
            startDate: "2012",
            endDate: "2012",
            organisation: "kfc",
            title: "Chief chicken flipper",
            description: text+text,
            thumbnail: google1
        }],
        itemBlocks_Education: [{
            startDate: "present",
            endDate: "2018",
            organisation: "monash",
            title: "bachelor founder and ceo",
            description: text+text,
            thumbnail: google1
        },
        {
            startDate: "2018",
            endDate: "2012",
            organisation: "rmit",
            title: " bachelor Chief burger flipper",
            description: text+text,
            thumbnail: google1
        },
        {
            startDate: "2012",
            endDate: "2012",
            organisation: "mit",
            title: "bachelor Chief chicken flipper",
            description: text+text,
            thumbnail: google1
        }],
        itemBlocks_Project: [
            {
                title: "Founded Eooggle",
                description: text,
                urlThumbnail: google1,
                public_id: "anfdoano"
            },
            {
                title: "Founded Eggipedia",
                description: text+text,
                urlThumbnail: google1,
                public_id: "wqt349873"
            }
        ],
        profileBlocks: {
            name: name,
            title: highLevelDes,
            aboutMe: des,
            email: "eggy@gmail.com",
            location: "eggTown",
            phone: "egegegegegegge",
            website: "eggy.com.au",
            urlProfile: eggImage

        },
        profileValues: [name, highLevelDes, des]
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
        let user_id;

        //check if redux userAuthToken exit, if not check if userAuthToken is in local storage
       if(this.props.userAuthToken){
           user_id = this.props.userAuthToken._id;

       }else{
           const userAuthToken = JSON.parse(localStorage.getItem('userAuthToken'));
           if(!userAuthToken){
               this.setState({itemBlocks: []});
               return;
           }
           else{
               user_id = userAuthToken._id;
           }
       }

       //set user id for query data
        const data = {
            user_id: this.props.match.params.userId
        }

    //    //get itemBlocks
    //     axios.post('/api/itemblocks/seeall', data)
    //         .then(response => {

    //             const itemBlocks_Job = response.data.itemblocks.flatMap((item) => item.type === 'Job' ? item : []);
    //             const itemBlocks_Education = response.data.itemblocks.flatMap((item) => item.type === 'Education' ? item: []);
    //             const itemBlocks_Project = response.data.itemblocks.flatMap((item) => item.type === 'Project' ? item : []);

    //             this.setState({itemBlocks_Job: itemBlocks_Job});
    //             this.setState({itemBlocks_Education: itemBlocks_Education});
    //             this.setState({itemBlocks_Project: itemBlocks_Project});

    //             //--------------------------------------------------------------------------------------------------------------------remove -----------------
    //             console.log(response.data.itemblocks);
    //             console.log("JOB--", this.state.itemBlocks_Job);
    //             console.log("Education--", this.state.itemBlocks_Education);
    //             console.log("project--", this.state.itemBlocks_Project);

    //         })
    //         .catch(error => {
    //             this.setState({itemBlocks: []});
    //             console.log(error);
    //         });

    //    //get user profileBlock
    //     axios.post('/api/profileblocks/see', data)
    //         .then(response => {
    //             console.log(response.data.profile);
    //             this.setState({profileBlocks: response.data.profile});
    //         })
    //         .catch(error => {
    //             this.setState({profileBlocks: []});
    //             console.log(error);
    //         });

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

    eduAddNewItemHandler = () => {

        const newItem = this.eduHisCopy();

        newItem.push({
            startDate: "",
            endDate: "",
            organisation: "",
            title: "DefaultTitle",
            description: "",
            thumbnail: ""
        });

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

    jobAddNewItemHandler = () => {

        const newItem = this.jobHisCopy();

        newItem.push({
            startDate: "startdate",
            endDate: "enddate",
            organisation: "insert company",
            title: "insert role",
            description: "describe",
            thumbnail: ""
        });

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

    profileBlocks = () => {
        return this.state.itemBlocks_Project.map((item, index) => {
            return <ProfileBlockWithImage item={item} index={index} key={item.public_id}/>
        })
    }

    addProjectHandler = () => {
        let newProjects = [...this.state.itemBlocks_Project]
        newProjects.push(this.createDefaultProject());
        this.setState({itemBlocks_Project: newProjects})
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
            return <button onClick={this.addProjectHandler} disabled="true">Reach the maximum 10 projects</button>
        }
        return <button onClick={this.addProjectHandler}>Add new project: {(this.state.itemBlocks_Project.length+1).toString() + '/10'}</button>
    }

    render() {
          return (
            <div className="UserFolioPage">

                <UserProfile itemBlock_id='5f81bdf6db99e33e48002c54' hasEditingRight={this.checkHasRightToEdit()}
                    changeProfileValues={this.changeProfileValues} values={this.state.profileBlocks}/>
                {this.checkHasRightToEdit()?
                    <button>Convert this myFolioPage to pdf</button>
                :   null}
                <button>Share this userFolioPage</button>
                
                {!this.checkHasRightToEdit() && this.state.itemBlocks_Education.length === 0?
                    null
                :   <EducationHistory
                    contents = {this.state.itemBlocks_Education}
                    changeItemHandler = {this.eduChangeHisItemHandler}
                    hisItemRemoveHandler = {this.eduItemRemoveHandler}
                    hisAddNewItemHandler = {this.eduAddNewItemHandler}
                    hasEditingRight = {this.checkHasRightToEdit()}/>

                }

                {!this.checkHasRightToEdit() && this.state.itemBlocks_Job.length === 0?
                    null
                :   <JobHistory               
                    contents = {this.state.itemBlocks_Job}
                    changeItemHandler = {this.jobChangeHisItemHandler}
                    hisItemRemoveHandler = {this.jobItemRemoveHandler}
                    hisAddNewItemHandler = {this.jobAddNewItemHandler}                
                    hasEditingRight = {this.checkHasRightToEdit()}/>
                }

                {!this.checkHasRightToEdit() && this.state.itemBlocks_Project.length === 0?
                    null
                :   this.profileBlocks()
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