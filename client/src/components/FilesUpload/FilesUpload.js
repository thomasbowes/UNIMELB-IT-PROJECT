import React, {Component} from 'react';

import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

//input accept type: ex: "image/*,audio/*,video/*"
//input maxFiles
//disabled Boolean




//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class FilesUpload extends Component {

    state = {
        file: null,
        message: '',
    }

    getUploadParams = ({ file, meta }) => {

        const body = new FormData()
        body.append('file', file)

        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        return {
            url: 'http://localhost:5000/api/portfolio/upload', body,
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }
    }

    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }

    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    render() {
        return (
            <Dropzone
                getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangeStatus}
                onSubmit={this.handleSubmit}
                maxFiles = {1}
                disabled = {false}
                submitButtonContent = "Close"
                maxSizeBytes = {10000000}
                canCancel={false}
                accept="image/*,audio/*,video/*"
                inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                styles={{
                    dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                    dropzone: { width: 500, height: 200 },
                    inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                }}
            />
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