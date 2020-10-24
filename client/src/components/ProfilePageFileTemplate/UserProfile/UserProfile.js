import React, {Component} from 'react';
import './UserProfile.css';

import EditIcon from '../../../assets/EditIcons/edit.svg';
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
                        <img className="UserPicture"src={this.props.values.urlProfile} alt='egg' />
                    </div>

                    {this.state.editable && this.props.hasEditingRight? 
                        <EditForm values={this.props.values} 
                            fields={["name", "title", "email", "location", "phone", "website", "aboutMe"]} 
                            inputTypes={["input", "input", "input", "input", "input", "input", "large input"]} 
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
                                {this.props.values.email && this.props.values.email.length >0 ? <p>Email: {this.props.values.email}</p>: null}
                                {this.props.values.location && this.props.values.location.length >0 ? <p>Location: {this.props.values.location}</p>: null}
                                {this.props.values.phone && this.props.values.phone.length >0 ? <p>Phone Number: {this.props.values.phone}</p>: null}
                                {this.props.values.website && this.props.values.website.length >0 ? <p>Website: {this.props.values.website}</p>: null}
                                {this.props.values.aboutMe && this.props.values.aboutMe.length >0 ? <p>{this.props.values.aboutMe}</p>: null}
                                
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