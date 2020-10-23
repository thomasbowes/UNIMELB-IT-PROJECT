import React, {Component} from 'react';
import './UserProfile.css';

import EditIcon from '../../../assets/EditIcons/edit.svg';
import eggImage from '../../../assets/ProfilePageDocuments/egg.jpg'
import EditForm from '../EditForm/EditForm';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

class UserProfile extends Component{

    state = {
        editable: false,

        nameEditing: false,
        highLevelDesEditing: false,
        descriptionEditing: false
        
    }

    changeEditable = () => {
        const oldEditable = this.state.editable
        this.setState({editable: !oldEditable, nameEditing: false, highLevelDesEditing: false, descriptionEditing: false})
    }

    changeValues = (inputs) => {
        this.props.changeProfileValues(inputs);



    }

    

    render(){
        return (
            <Aux>
                <div className="User-info">
                    <div className="UserPictureHolder">
                        <img className="UserPicture"src={eggImage} alt='egg' />
                    </div>

                    {this.state.editable && this.props.hasEditingRight? 
                        <EditForm values={this.props.values} 
                            fields={["name", "title", "aboutMe"]} 
                            inputTypes={["input", "input", "large input"]} 
                            isDeletable={false}
                            changeValues={this.changeValues} 
                            changeEditable={this.changeEditable}/>
                        :
                        <div className="UserInfoHolder">
                            <div className="UserInfo">
                                <h1>{this.props.values.name}</h1>
                            </div>
                            <div className="UserInfo">
                                <h2>{this.props.values.title}</h2> 
                            </div>
                            <div className="Objective">
                                <p>{this.props.values.aboutMe}</p> 
                            </div>
                        </div>}
                    
                    {this.state.editable || (!this.props.hasEditingRight) ? null
                                        :<input className="User-info__edit" type="image" src={EditIcon} alt="edit" onClick={this.changeEditable} />}
                </div>
            </Aux>
        );

    }
}

export default UserProfile;