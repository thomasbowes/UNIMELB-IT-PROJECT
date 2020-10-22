import React, {Component} from 'react';
import './UserFolioPage.css'


import ProfileBlockWithImage from '../../components/ProfilePageFileTemplate/ProjectBlockWithImage/ProfileBlockWithImage';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';
import JobHistory from '../../components/ProfilePageFileTemplate/JobHistory/JobHistory';

import google1 from '../../assets/ProfilePageDocuments/google.png';
import google2 from '../../assets/ProfilePageDocuments/google2.jpg';

import "react-image-gallery/styles/css/image-gallery.css";
import UserProfile from '../../components/ProfilePageFileTemplate/UserProfile/UserProfile'

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import axios from "axios";



const text = "The egg is the organic vessel containing the zygote in which an embryo develops until it can survive on its own, at which point the animal hatches. An egg results from fertilization of an egg cell. Most arthropods, vertebrates (excluding live-bearing mammals), and mollusks lay eggs, although some, such as scorpions, do not. Reptile eggs, bird eggs, and monotreme eggs are laid out of water and are surrounded by a protective shell, either flexible or inflexible. Eggs laid on land or in nests are usually kept within a warm and favorable temperature range while the embryo grows. When the embryo is adequately developed it hatches, i.e., breaks out of the egg's shell. Some embryos have a temporary egg tooth they use to crack, pip, or break the eggshell or covering."
const school1 = "Eggy Junior High"
const school2 = "University of Eggplication"
const school3 = "Institute of Making Benedict Egg"
const des = "A dedicated eggspert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work."
const name = "Mr. Eggy Egglington"
const highLevelDes = "An eggcellent student at Eggy Institute of Technology"

class UserFolioPage extends Component {
    state = {
        itemBlocks_Job: [],
        itemBlocks_Education: [],
        itemBlocks_Project: [],
        profileBlocks: [],
        profileValues: [name, highLevelDes, des],
        eduHis: [[school1, "2022-2024", text+text, google1], [school2, "2024-2027", text, google1],[school3, "2027-2???", text, google1]],
        jobHis: [["job1", "2022-2024", text+text, google1], ["Job2", "2024-2027", text, google1],["job3", "2027-2???", text, google1]]
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
            user_id: user_id
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

                //--------------------------------------------------------------------------------------------------------------------remove -----------------
                console.log(response.data.itemblocks);
                console.log("JOB--", this.state.itemBlocks_Job);
                console.log("Education--", this.state.itemBlocks_Education);
                console.log("project--", this.state.itemBlocks_Project);

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
        for (i=0; i<this.state.eduHis.length; i++){
            newItem.push([...this.state.eduHis[i]])
        }
        return newItem;
    }

    eduChangeHisItemHandler = (id, input) => {
        const newItem = this.eduHisCopy();
        newItem[id] = input
        newItem[id].push(google1)
        this.setState({eduHis: newItem})

    }

    eduItemRemoveHandler = (hisItemIndex) => {
        const newItem = this.eduHisCopy();       
        newItem.splice(hisItemIndex, 1);
        this.setState({eduHis: newItem});
    }

    eduAddNewItemHandler = () => {

        const newItem = this.eduHisCopy();

        newItem.push(["Default School", "Default Durations", "Default Description", google1])

        this.setState({eduHis: newItem})

    }

    jobHisCopy = () => {
        const newItem = []
        let i = 0
        for (i=0; i<this.state.jobHis.length; i++){
            newItem.push([...this.state.jobHis[i]])
        }
        return newItem;
    }

    jobChangeHisItemHandler = (id, input) => {
        const newItem = this.jobHisCopy();
        newItem[id] = input
        newItem[id].push(google1)
        this.setState({jobHis: newItem})

    }

    jobItemRemoveHandler = (hisItemIndex) => {
        const newItem = this.jobHisCopy();       
        newItem.splice(hisItemIndex, 1);
        this.setState({jobHis: newItem});
    }

    jobAddNewItemHandler = () => {

        const newItem = this.jobHisCopy();

        newItem.push(["Default School", "Default Durations", "Default Description", google1])

        this.setState({jobHis: newItem})

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
        this.setState({profileValues: values})
    }

    render() {
          return (
            <div className="UserFolioPage">

                <UserProfile itemBlock_id='5f81bdf6db99e33e48002c54' hasEditingRight={this.checkHasRightToEdit()}
                    changeProfileValues={this.changeProfileValues} values={this.state.profileValues}/>


                <EducationHistory
                        contents = {this.state.eduHis}
                        changeItemHandler = {this.eduChangeHisItemHandler}
                        hisItemRemoveHandler = {this.eduItemRemoveHandler}
                        hisAddNewItemHandler = {this.eduAddNewItemHandler}
                        hasEditingRight = {this.checkHasRightToEdit()}/>
       
                <JobHistory
                                        
                        contents = {this.state.jobHis}

                        changeItemHandler = {this.jobChangeHisItemHandler}
                        hisItemRemoveHandler = {this.jobItemRemoveHandler}
                        hisAddNewItemHandler = {this.jobAddNewItemHandler}                
                        hasEditingRight = {this.checkHasRightToEdit()}/>



                <ProfileBlockWithImage image={google2} text={text+text+text} title="Founded Eooggle" />
                <ProfileBlockWithImage image={google1} text={text} title="Founded Eggipedia" />
                
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