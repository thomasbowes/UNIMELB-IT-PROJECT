import React, {Component} from 'react';
import './UserProfile.css';

import EditIcon from '../../../assets/EditIcons/edit.svg';
import eggImage from '../../../assets/ProfilePageDocuments/egg.jpg'
import EditForm from '../EditForm/EditForm';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const des = "A dedicated eggspert in the field of eggnomics, pushing egg-legislation to be beneficial for your average egg. With my extensive egg-u-cation i bring a dynamic off eggspertise to wherever i work."
const name = "Mr. Eggy Egglington"
const highLevelDes = "An eggcellent student at Eggy Institute of Technology"

class UserProfile extends Component{

    state = {
        values: [name, highLevelDes, des],

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

    changeValues = (inputs) => {
        this.setState({values: inputs})
    }

    

    render(){
        return (
            <Aux>
                <div className="User-info">
                    <div className="UserPictureHolder">
                        <img className="UserPicture"src={eggImage} alt='egg' />
                    </div>

                    {this.state.editable && this.props.hasEditingRight? 
                        <EditForm values={this.state.values} fields={["Name", "High Level Description", "Description"]} inputTypes={["input", "input", "large input"]} changeValues={this.changeValues} changeEditable={this.changeEditable}/>
                        :
                        <div className="UserInfoHolder">
                            <div className="UserInfo">
                                <h1>{this.state.values[0]}</h1>
                            </div>
                            <div className="UserInfo">
                                <h2>{this.state.values[1]}</h2> 
                            </div>
                            <div className="Objective">
                                <p>{this.state.values[2]}</p> 
                            </div>
                        </div>}
                    
                    {(this.state.editable) || (!this.props.hasEditingRight) ? null
                                        :<input className="User-info__edit" type="image" src={EditIcon} alt="edit" onClick={this.changeEditable} />}
                </div>
            </Aux>
        );

    }
}

export default UserProfile;