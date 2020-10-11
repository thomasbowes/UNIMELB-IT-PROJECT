import React, {Component} from 'react';
import './UserFolioPage.css'

import ProfileBlockWithImage from '../../components/ProfilePageFileTemplate/ProjectBlockWithImage/ProfileBlockWithImage';
import ProfileBlockNoImage from '../../components/ProfilePageFileTemplate/ProfileBlockNoImage/ProfileBlockNoImage';
import ProfileBlockTwoProject from '../../components/ProfilePageFileTemplate/ProfileBlockTwoProject/ProfileBlockTwoProject';
import EducationHistory from '../../components/ProfilePageFileTemplate/EducationHistory/EducationHistory';

import google1 from '../../assets/ProfilePageDocuments/google.png';
import google2 from '../../assets/ProfilePageDocuments/google2.jpg';
import eggImage from '../../assets/ProfilePageDocuments/egg.jpg'

import "react-image-gallery/styles/css/image-gallery.css";


class UserFolioPage extends Component {

    render() {

          const text = "The egg is the organic vessel containing the zygote in which an embryo develops until it can survive on its own, at which point the animal hatches. An egg results from fertilization of an egg cell. Most arthropods, vertebrates (excluding live-bearing mammals), and mollusks lay eggs, although some, such as scorpions, do not. Reptile eggs, bird eggs, and monotreme eggs are laid out of water and are surrounded by a protective shell, either flexible or inflexible. Eggs laid on land or in nests are usually kept within a warm and favorable temperature range while the embryo grows. When the embryo is adequately developed it hatches, i.e., breaks out of the egg's shell. Some embryos have a temporary egg tooth they use to crack, pip, or break the eggshell or covering."
          return (
            <div className="UserFolioPage">
                <div className="User-info">
                    <div className="UserPictureHolder">
                        <img className="UserPicture"src={eggImage} alt='egg' />
                    </div>
    
                    <div className="UserInfoHolder">
                        <div className="UserInfo">
                            <h1>Mr. Eggy Egglington</h1>
                        </div>
                        <div className="UserInfo">
                            <h2>An eggcellent student at Eggy Institute of Technology</h2> 
                        </div>
                        <div className="Objective">
                            <p>A dedicated expert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work. {text}</p> 
                        </div>
                    </div>
                </div>

                <h2>My eggucation history</h2>

                <EducationHistory
                        schools={["Eggy Junior High", "University of Eggplication", "Institute of Making Benedict Egg"]} 
                        descriptions={[text, text, text]} 
                        images={[google1, google1, google2]}
                        durations={["2022-2024", "2024-2027", "2027-2???"]} />

                <h2>My projeggcts</h2>

                <ProfileBlockWithImage image={google2} text={text} title="Founded Eooggle" />
                <ProfileBlockNoImage text={text} title="Founded Eooggle" />
                <ProfileBlockTwoProject texts={[text, text]} titles={["Founded Eooggle", "Founded Eggipedia"]} />
                
            </div>
        
        );
    }
}


export default UserFolioPage;