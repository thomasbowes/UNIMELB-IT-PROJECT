import React, {Component} from 'react';
import './UserFolioPage.css'

import ProfileBlockWithImage from '../../components/ProfilePageFileTemplate/ProjectBlockWithImage/ProfileBlockWithImage';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';
import JobHistory from '../../components/ProfilePageFileTemplate/JobHistory/JobHistory';

import google1 from '../../assets/ProfilePageDocuments/google.png';
import google2 from '../../assets/ProfilePageDocuments/google2.jpg';

import "react-image-gallery/styles/css/image-gallery.css";
import UserProfile from '../../components/ProfilePageFileTemplate/UserProfile/UserProfile'



const text = "The egg is the organic vessel containing the zygote in which an embryo develops until it can survive on its own, at which point the animal hatches. An egg results from fertilization of an egg cell. Most arthropods, vertebrates (excluding live-bearing mammals), and mollusks lay eggs, although some, such as scorpions, do not. Reptile eggs, bird eggs, and monotreme eggs are laid out of water and are surrounded by a protective shell, either flexible or inflexible. Eggs laid on land or in nests are usually kept within a warm and favorable temperature range while the embryo grows. When the embryo is adequately developed it hatches, i.e., breaks out of the egg's shell. Some embryos have a temporary egg tooth they use to crack, pip, or break the eggshell or covering."
const school1 = "Eggy Junior High"
const school2 = "University of Eggplication"
const school3 = "Institute of Making Benedict Egg"

class UserFolioPage extends Component {
    state = {
        eduHis: [[school1, "2022-2024", text+text, google1], [school2, "2024-2027", text, google1],[school3, "2027-2???", text, google1]],
        jobHis: [["job1", "2022-2024", text+text, google1], ["Job2", "2024-2027", text, google1],["job3", "2027-2???", text, google1]]
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



    
    render() {
          return (
            <div className="UserFolioPage">

                <UserProfile />


                <EducationHistory
                        contents = {this.state.eduHis}

                        changeItemHandler = {this.eduChangeHisItemHandler}
                        hisItemRemoveHandler = {this.eduItemRemoveHandler}
                        hisAddNewItemHandler = {this.eduAddNewItemHandler}/>
       
                <JobHistory
                                        
                        contents = {this.state.jobHis}

                        changeItemHandler = {this.jobChangeHisItemHandler}
                        hisItemRemoveHandler = {this.jobItemRemoveHandler}
                        hisAddNewItemHandler = {this.jobAddNewItemHandler}/>


                <ProfileBlockWithImage image={google2} text={text+text+text} title="Founded Eooggle" />
                <ProfileBlockWithImage image={google1} text={text} title="Founded Eggipedia" />
                
            </div>
        
        );
    }
}


export default UserFolioPage;