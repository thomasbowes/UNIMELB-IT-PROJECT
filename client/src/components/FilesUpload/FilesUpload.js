import React, {Component} from 'react';
import axios from 'axios';

import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

//import relevent redux things
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class FilesUpload extends Component {

    state = {
        file: null,
        filename: '',
        uploadedFile: '',
        message: '',
        loading: false,
        uploadPercentage: 0
    }

    //read the file from user's computer
    readFileHandler = event => {
        event.preventDefault();
        //init current state
        this.setState({message: '', uploadPercentage: 0});
        //if the file pointer point to null return
        if(!event.target.files[0]) return;

        //get the file path and name and store into state
        this.setState({file: event.target.files[0]});
        this.setState({filename: event.target.files[0].name});
    };


    //post the file to backend by axios
    postFileHandler = async (event) => {

        if(!this.state.file) return;
        event.preventDefault();

        //create a container for the file
        const formData = new FormData();
        formData.append('file', this.state.file);

        //construct and add auth token to header
        let authToken;
        if(!this.props.userAuthToken) authToken = '';
        else authToken = this.props.userAuthToken.token;

        //set the loading to true
        this.setState({loading: true});

        try {
            //post the file
            await axios.post('http://localhost:5000/api/portfolio/upload', formData,  {
                //config the http request header with content-type and Authorization header
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': authToken
                },
                //store progression percentage to state //for future use
                onUploadProgress: progressEvent => {

                    this.setState({uploadPercentage:
                            parseInt(
                                Math.round((progressEvent.loaded * 100) / progressEvent.total))});
                }
            })
                .then( (response) => {
                    this.setState({message: response.data.status});

                })
                .catch((error) => {
                        this.setState({message: error.response.data});
                    });

            //remove file details
            this.setState({file: null, filename: ''});

            //const { fileName, filePath } = res.data;

            //setUploadedFile({ fileName, filePath });

        } catch (err) {
            this.setState({message: err.response.data.status});
        }
        this.setState({loading: false});
    };

    render(){
        let result;

        if(this.state.loading){
            result = (
                <div className="LoginWindow">
                    <LoadingAnimation />
                    <p>Please Upload Your Files</p>
                    {this.state.message}
                    <form>
                        <div>
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                disabled
                            />
                            <label>
                                {this.state.filename}
                            </label>
                        </div>

                        <input
                            type='submit'
                            value='Upload'
                            disabled
                        />
                    </form>
                </div>
                );

        }else{

            result = (
                <div className="LoginWindow">
                    <p>Please Upload Your Files</p>
                    {this.state.message}
                    <form onSubmit={this.postFileHandler}>
                        <div>
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={(event) => this.readFileHandler(event)}
                            />
                            <label>
                                {this.state.filename}
                            </label>
                        </div>

                        <input
                            type='submit'
                            value='Upload'
                        />
                    </form>
                </div>
            );
        }
        return result;
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