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
    }

    getUploadParams = ({ file, meta }) => {

        const body = new FormData();
        body.append('file', file);
        body.append('user_id', '123');
        body.append('project_id', '123');
        body.append('itemBlock_id', '123');
        body.append('type', '123');

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

    handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

     handleChangeStatus = ({ meta, xhr }, status) => {
        if(status === 'preparing'){
            this.setState({message: ''});
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

    preview = ({ meta, fileWithMeta, xhr }) => {
        let resObj = '';
        if (xhr) {
            if (xhr) {
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        resObj = JSON.parse(xhr.response);
                    }
                }
            }
        }

        const { name, percent, status } = meta
        return (
            <div>
              <span style={{ alignSelf: 'flex-start', margin: '10px 3%', fontFamily: 'Helvetica' }}>
                {name}, {Math.round(percent)}%, {resObj}, <button type="button" onClick={() => fileWithMeta.remove()}>X</button>
              </span>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <p>{this.state.message}</p>
                <Dropzone
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangeStatus}
                    onSubmit={this.handleSubmit}
                    maxFiles = {5}
                    submitButtonContent = "finished"
                    maxSizeBytes = {10000000}
                    canCancel={false}
                    accept="image/*,audio/*,video/*"
                    inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
                    disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
                    inputWithFilesContent={files => `${5 - files.length} more files allowed`}
                    styles={{
                        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                        dropzone: { width: 800, height: 500 },
                        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                    }}
                />
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