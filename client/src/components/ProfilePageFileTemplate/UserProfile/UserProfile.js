import React, {Component} from 'react';
import './UserProfile.css';

import eggImage from '../../../assets/ProfilePageDocuments/egg.jpg'
import EditInfoForm from '../EditInfoForm/EditInfoForm';


class UserProfile extends Component{

    state = {
        name : "Mr. Eggy Egglington",
        highLevelDes : "An eggcellent student at Eggy Institute of Technology",
        description : "A dedicated eggspert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work.",
        
        editable: false,

        nameEditing: false,
        highLevelDesEditing: false,
        descriptionEditing: false
        
    }

    changeName = (newName) =>{
        this.setState({name: newName, nameEditing: false})
    }

    changeHighLevelDes = (newName) =>{
        this.setState({highLevelDes: newName, highLevelDesEditing: false})
    }

    changeDescription = (newName) =>{
        this.setState({description: newName, descriptionEditing: false})
    }

    changeEditable = () => {
        const oldEditable = this.state.editable
        this.setState({editable: !oldEditable, nameEditing: false, highLevelDesEditing: false, descriptionEditing: false})
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
                        {this.state.editable? <button onClick={() => this.setState({nameEditing: true}) } >edit</button>:null}
                        {this.state.editable && this.state.nameEditing? 
                            <EditInfoForm saveChange={this.changeName} oldValue={this.state.name}/>: null}
                    </div>
                    <div className="UserInfo">
                        <h2>{this.state.highLevelDes}</h2> 
                        {this.state.editable? <button onClick={() => this.setState({highLevelDesEditing: true}) } >edit</button>:null}
                        {this.state.editable && this.state.highLevelDesEditing? 
                            <EditInfoForm saveChange={this.changeHighLevelDes} oldValue={this.state.highLevelDes}/>: null}
                    </div>
                    <div className="Objective">
                        <p>{this.state.description}</p> 
                        {this.state.editable? <button onClick={() => this.setState({descriptionEditing: true}) } >edit</button>:null}
                        {this.state.editable && this.state.descriptionEditing? 
                            <EditInfoForm saveChange={this.changeDescription} oldValue={this.state.description}/>: null}
                    </div>
                </div>
                {this.state.editable? <button onClick={this.changeEditable}>Done!</button>
                                     :<button onClick={this.changeEditable} >Edit my profile</button>}
            </div>
        );

    }
}

export default UserProfile;