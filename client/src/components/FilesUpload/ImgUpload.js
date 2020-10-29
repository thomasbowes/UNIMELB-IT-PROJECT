/*
import React, {Component} from 'react';

import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader'
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
        files: null
    }

    getUploadParams = ({ file }) => {
        const body = new FormData();
        body.append('file', file);
        body.append('user_id', '123');
        body.append('itemBlock_id', '123');
        body.append('type', '123');

        let authToken;
        if (!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        return {
            url: '/api/portfolio/upload', body,
            headers: {
                'Authorization': "Bearer " + authToken
            }
        }
    }


    handleChangeStatus = ({ meta, xhr }, status, files) => {

        if(status === 'preparing'){
            this.setState({message: ''});
            this.setState({files: files});
        }

        if (status === 'error_upload') {
            if (xhr) {
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        let resObj = JSON.parse(xhr.response);
                        this.setState({message: resObj.message});
                    }
                }
            }
        }
        else if(status === 'done')
        {
            if (xhr.readyState === 4) {
                //console.log(xhr.response);
            }
        }

    }

    onFormSubmit = () => {

        //if(!this.state.file) return;
        this.state.files.map(f => f.restart());
    }



    render() {
        return (
            <React.Fragment>
                <p>{this.state.message}</p>
                <Dropzone
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangeStatus}
                    onSubmit={this.handleSubmit}
                    maxFiles = {1}
                    submitButtonContent = "finished"
                    SubmitButtonComponent = {null}
                    autoUpload = {false}
                    maxSizeBytes = {10000000}
                    canCancel={false}
                    canRestart = {false}
                    accept="image/*"
                    inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                    styles={{
                        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                        dropzone: { width: 800, height: 500 },
                        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                    }}
                />
                <button type="button" onClick={this.onFormSubmit}>Submit</button>
            </React.Fragment>
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

 */