
import React, {Component} from 'react';

import ProfilePicture from "profile-picture"
import "profile-picture/build/ProfilePicture.css"


//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class FilesUpload extends Component {

    state = {
        file: null,
        message: '',
        files: null
    }

    render() {
        return (
            <p> I am ImgUploader </p>
        )
    }
}

//bring in redux state
const mapStateToProps = state => {
    return {
        userAuthToken: state.auth.userAuthToken
    };
};

//bring in redux actions
const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FilesUpload);