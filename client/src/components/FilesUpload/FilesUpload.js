import React, {Component} from 'react';
import axios from 'axios';

class FilesUpload extends Component {

    state = {
        file: null,
        filename: '',
        uploadedFile: '',
        message: '',
        loading: false,
        uploadPercentage: 0
    }

    readFileHandler = event => {
        event.preventDefault();
        this.setState({uploadPercentage: 0});
        //console.log(event.target.files[0]);
        if(!event.target.files[0]) return;

        this.setState({file: event.target.files[0]});
        this.setState({filename: event.target.files[0].name});
    };


    postFileHandler = async (event) => {

        if(!this.state.file) return;
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);

        try {
            const res = await axios.post('http://localhost:5000/api/portfolio/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {

                    this.setState({uploadPercentage:
                            parseInt(
                                Math.round((progressEvent.loaded * 100) / progressEvent.total))});
                }
            });

            //const { fileName, filePath } = res.data;

            //setUploadedFile({ fileName, filePath });

            this.setState({message: 'File Uploaded: ' + this.state.filename});

        } catch (err) {
            if (err.response.status === 500) {
                this.setState({message: 'There was a problem with the server'});
            } else {
                this.setState({message: err.response.data.msg});
            }
        }
    };


    render(){
        return (
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
}

export default FilesUpload;