import React, {Component} from 'react';
import './UserProfile.css';

import eggImage from '../../../assets/ProfilePageDocuments/egg.jpg'
import EditInfoForm from '../EditInfoForm/EditInfoForm';


class UserProfile extends Component{


    render(){
        let name = "Mr. Eggy Egglington";
        let highLevelDes = "An eggcellent student at Eggy Institute of Technology";
        let description = "A dedicated eggspert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work."
        
        return (
            <div className="User-info">
                <div className="UserPictureHolder">
                    <img className="UserPicture"src={eggImage} alt='egg' />
                </div>

                <div className="UserInfoHolder">
                    <div className="UserInfo">
                        <h1>{name}</h1>
                        <button>edit</button>
                        <EditInfoForm />
                    </div>
                    <div className="UserInfo">
                        <h2>{highLevelDes}</h2> 
                    </div>
                    <div className="Objective">
                        <p>{description}</p> 
                    </div>
                </div>
            </div>
        );

    }
}

export default UserProfile;