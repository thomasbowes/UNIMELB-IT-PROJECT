import React, {Component} from 'react';
import './UserProfile.css';

import EditIcon from '../../../assets/EditIcons/edit.svg';
import EditForm from '../EditForm/EditForm';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import ShowMoreText from 'react-show-more-text';

//redux
import { connect } from 'react-redux';
import axios from "axios";
import FilesUpload from '../../FilesUpload/FilesUpload';

class UserProfile extends Component{

    state = {
        profileEditable: false,
        aboutEditable: false,
        nameEditing: false,
        highLevelDesEditing: false,
        descriptionEditing: false
        
    }

    changeProfileEditable = () => {
        const oldEditable = this.state.profileEditable
        this.setState({profileEditable: !oldEditable, nameEditing: false, highLevelDesEditing: false, descriptionEditing: false})
    }

    changeAboutEditable = () => {
        const oldEditable = this.state.aboutEditable
        this.setState({aboutEditable: !oldEditable, nameEditing: false, highLevelDesEditing: false, descriptionEditing: false})
    }

    changeProfilePic = (img) => {
        this.props.changeProfilePic(img);
    }

    changeValues = (inputs) => {


        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        const headers = {
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }

        const input_copy = {...inputs};

        delete input_copy.urlProfile;

        const data = {
            profile_id: input_copy._id,
            contents: input_copy
        }

        axios.post('/api/profileblocks/update',data, headers)
            .then((res)=>{
                this.props.changeProfileValues(res.data.profile);
                }
            )
            .catch((err)=>{
                console.log(err);
            })
    }

    render(){
        return (
            <Aux>
                {/* Renders the main profile block with image, name and basic info */}
                <div className="User-info">
                    <div className="UserPicture">
                        <img src={this.props.values.urlProfile} alt='profile' />
                    </div>

                    {/* Checks if block is in edit mode or view mode*/}
                    {this.state.profileEditable && this.props.hasEditingRight? 
                        <div className="UserInfoHolder-centered">
                            <EditForm values={this.props.values} 
                                fields={["name", "title", "email", "location", "phone", "website"]} 
                                inputTypes={["input", "input", "input", "input", "input", "input"]} 
                                fieldName={["Name", "Title", "E-mail Address", "Set Location" , "Contact Phone Number", "Personal Website"]}
                                isDeletable={false}
                                changeValues={this.changeValues} 
                                changeEditable={this.changeProfileEditable}/>

                            <p>Upload Profile Picture Below. Note: File uploads cannot be undone.</p>    
                            <FilesUpload
                                type='User'
                                maxFiles = {1}
                                accept = 'image/*'
                                fileRejectMessage = 'Image only'
                                returnResult = {this.changeProfilePic}
                            />
                        </div>
                        :
                        <div className="UserInfoHolder">
                            
                            <div className="UserInfo">
                                <h1>{this.props.values.name}</h1>
                                <h2>{this.props.values.title}</h2>
                                {this.props.values.location && this.props.values.location.length >0 ? <p>{this.props.values.location}</p>: null} 
                            </div>
                            
                            <div className="user-info-contact">
                                {(this.props.values.email && this.props.values.email.length >0) ||
                                (this.props.values.phone && this.props.values.phone.length >0) ||
                                (this.props.values.website && this.props.values.website.length >0)? <h3>Contact Info</h3>
                                :null}
                                {this.props.values.email && this.props.values.email.length >0 ? <p>{this.props.values.email}</p>: null}
                                {this.props.values.phone && this.props.values.phone.length >0 ? <p>{this.props.values.phone}</p>: null}
                                {this.props.values.website && this.props.values.website.length >0 ? <p>{this.props.values.website}</p>: null}
                                
                            </div>
                            {/* Switches Block to edit mode */}
                            {this.state.profileEditable || (!this.props.hasEditingRight) ? null
                                            :<Aux>
                                                <input className="User-info__edit" type="image" src={EditIcon} alt="edit" onClick={this.changeProfileEditable} />    
                                            </Aux>}
                            {this.props.shareButton()}
                        </div>}
                    
                </div>
                


                {/* Renders the about description. If no description it only shows for the profile owner. */}
                {this.props.values.aboutMe || this.props.hasEditingRight ? <div className="profile-item">
                            
                                
                                
                                
                                {!this.state.aboutEditable?
                                <Aux>
                                    <h1 id="heading_no-bottom-margin">About Me</h1>
                                
                                    <div className="profile-item__main-text-nowrap">  
                                        <ShowMoreText
                                            lines={6}
                                            more='Show more'
                                            less='Show less'
                                            anchorClass=''
                                            onClick={this.executeOnClick}
                                            expanded={false}
                                            style={{color: "red"}}>
                                                <div className="profile-item__main-text"> 
                                                    {this.props.values.aboutMe} 
                                                </div>
                                        </ShowMoreText> 
                                    </div>
                                </Aux>
                                :<Aux>
                                    <EditForm values={this.props.values} 
                                        fields={["aboutMe"]} 
                                        fieldName={["About Me"]}                                        
                                        inputTypes={["large input"]} 
                                        isDeletable={false}
                                        changeValues={this.changeValues} 
                                        changeEditable={this.changeAboutEditable}/>
                                </Aux>}
                            
                            {this.state.aboutEditable || (!this.props.hasEditingRight) ? null
                                :<input className="User-info__edit" type="image" src={EditIcon} alt="edit" onClick={this.changeAboutEditable} />}
                        </div>
                        :null}
            </Aux>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);