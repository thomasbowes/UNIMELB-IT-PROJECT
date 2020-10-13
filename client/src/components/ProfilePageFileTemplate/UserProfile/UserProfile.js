import React, {Component} from 'react';
import './UserProfile.css';

import eggImage from '../../../assets/ProfilePageDocuments/egg.jpg'
import EditInfoForm from '../EditInfoForm/EditInfoForm';


class UserProfile extends Component{

    state = {
        name : "Mr. Eggy Egglington",
        highLevelDes : "An eggcellent student at Eggy Institute of Technology",
        description : "A dedicated eggspert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work.",
        
        nameEditing: false
        
    }

    changeName = (newName) =>{
        this.setState({name: newName, nameEditing: false})
    }
    

    render(){
        return (
            <div className="User-info">
                <div className="UserPictureHolder">
                    <img className="UserPicture"src={eggImage} alt='egg' />
                </div>

                <div className="UserInfoHolder">
                    <div className="UserInfo">
                        <h1>{this.state.name}</h1>
                        <button onClick={() => this.setState({nameEditing: true}) } >edit</button>
                        {this.state.nameEditing? <EditInfoForm saveChange={this.changeName} />: null}
                    </div>
                    <div className="UserInfo">
                        <h2>{this.state.highLevelDes}</h2> 
                    </div>
                    <div className="Objective">
                        <p>{this.state.description}</p> 
                    </div>
                </div>
            </div>
        );

    }
}

export default UserProfile;