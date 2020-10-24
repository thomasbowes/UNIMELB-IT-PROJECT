import React, {Component} from 'react';

import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

//input accept type: ex: "image/*,audio/*,video/*"
//input maxFiles
//disabled Boolean


//import relevent redux things
import { connect } from 'react-redux';

class FilesUpload extends Component {

    state = {
        file: null,
        message: '',
    }

    //prepare for upload
    getUploadParams = ({ file, meta }) => {

        const body = new FormData();
        body.append('file', file);
        body.append('itemBlock_id', this.props.itemBlock_id);
        body.append('type', this.props.type);

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

    //handle submit button: delete all the contents inside the drop zone
    handleSubmit = (files, allFiles) => {
        //console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

     //handle error status: mainly print out message
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
                let resObj = JSON.parse(xhr.response);
                this.props.addFile(resObj.item);
            }
        }

    }

    render() {
        return (
            <React.Fragment>
                
                {this.state.message?<p>{this.state.message}</p>: null}
                <Dropzone
                    getUploadParams={this.getUploadParams}
                    onChangeStatus={this.handleChangeStatus}
                    onSubmit={this.handleSubmit}
                    maxFiles = {this.props.maxFiles}
                    submitButtonContent = "finished"
                    maxSizeBytes = {10000000}
                    canCancel={false}
                    //accept="image/*,audio/*,video/*"
                    accept={this.props.accept}
                    inputContent={(files, extra) => (extra.reject ? this.props.fileRejectMessage : 'Files upload: Drag or Click')}
                    disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
                    //disabled={this.props.disabled}
                    inputWithFilesContent={files => `${this.props.maxFiles - files.length} more files allowed`}
                    styles={{
                        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                        dropzone: { width: "95%", height: "20rem", overflowX: "auto", overflowY: "auto"},
                        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                        contentWithFiles: {color: "red"}
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