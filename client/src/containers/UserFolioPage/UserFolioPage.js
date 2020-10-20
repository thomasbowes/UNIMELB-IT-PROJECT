import React, {Component} from 'react';
import './UserFolioPage.css'


import ProfileBlockWithImage from '../../components/ProfilePageFileTemplate/ProjectBlockWithImage/ProfileBlockWithImage';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';

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

class UserFolioPage extends Component {
    state = {
        educationHistory: {
            ids: [0,1,2],
            schools: ["Eggy Junior High", "University of Eggplication", "Institute of Making Benedict Egg"],
            descriptions:[text+text, text, text], 
            images: [google1, google1, google2],
            durations:["2022-2024", "2024-2027", "2027-2???"]
        },
        itemBlocks: [],
        profileBlocks: [],
        eduHis: [[school1, "2022-2024", text+text, google1], [school2, "2024-2027", text, google1],[school3, "2027-2???", text, google1]],
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
                console.log(response.data);
                this.setState({itemBlocks: response.data});
            })
            .catch(error => {
                this.setState({itemBlocks: []});
                console.log(error);
            });

       //get user profileBlock
        axios.post('/api/profileblocks/see', data)
            .then(response => {
                console.log(response);
                this.setState({profileBlocks: response.data});
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

    changeHisItemHandler = (id, input) => {
        const newItem = this.eduHisCopy();
        newItem[id] = input
        newItem[id].push(google1)

        this.setState({eduHis: newItem})

    }

    hisItemRemoveHandler = (hisItemIndex) => {
        const newItem = this.eduHisCopy();
        
        newItem.splice(hisItemIndex, 1);

        this.setState({eduHis: newItem});
    }

    hisAddNewItemHandler = () => {

        const newItem = this.eduHisCopy();

        newItem.push(["Default School", "Default Durations", "Default Description", google1])

        this.setState({eduHis: newItem})

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

    render() {
          return (
            <div className="UserFolioPage">

                <UserProfile itemBlock_id='5f81bdf6db99e33e48002c54' hasEditingRight={this.checkHasRightToEdit()}/>

                <h2>My eggucation history</h2>

                <EducationHistory
                        contents = {this.state.eduHis}

                        changeItemHandler = {this.changeHisItemHandler}
                        hisItemRemoveHandler = {this.hisItemRemoveHandler}
                        hisAddNewItemHandler = {this.hisAddNewItemHandler}/>

                <h2>My projeggcts</h2>

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