import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import './ProjectPage.css'

import eggPdf from '../../../assets/ProfilePageDocuments/eggPdf.pdf';
import PdfViewer from '../../../components/Viewer/PdfViewer/PdfViewer';
import PdfPreview from '../../../components/Viewer/PdfPreview/PdfPreview';
import BackDrop from '../../../components/UI/BackDrop/BackDrop'
import FilesUpload from '../../../components/FilesUpload/FilesUpload';
import ImgUpload from '../../../components/FilesUpload/ImgUpload';

import eggImg1 from '../../../assets/ProfilePageDocuments/egg1.jpg'
import eggImg2 from '../../../assets/ProfilePageDocuments/egg2.jpg'
import eggImg3 from '../../../assets/ProfilePageDocuments/egg3.jpg'
import eggImg4 from '../../../assets/ProfilePageDocuments/egg4.jpg'
import eggImg5 from '../../../assets/ProfilePageDocuments/egg5.jpg'
import axios from "axios";


class ProjectPage extends Component {
    state = {
        showPdf: false,
        files: []
    }

    showPdfToggle = () => {
        const newShowPdf = !this.state.showPdf;
        this.setState({showPdf: newShowPdf})
    }

    componentDidMount() {
        const item_id = this.props.itemBlock_id;

        console.log(item_id);

        if(!item_id) return;

        //set item id for query data
        const data = {
            item_id: item_id
        }

        //get all files by given item_id
        axios.post('/api/files/seeAll', data)
            .then(response => {
                console.log(response.data);
                this.setState({files: response.data});
            })
            .catch(error => {
                this.setState({files: []});
                console.log(error);
            });


        console.log(this.state.files);
    }

    render(){
        const images = [
            {
                original: eggImg1,
                thumbnail: eggImg1,
            },
            {
                original: eggImg2,
                thumbnail: eggImg2,
            },
            {
                original: eggImg3,
                thumbnail: eggImg3,
            },
            {
                original: eggImg4,
                thumbnail: eggImg4,
            },
            {
                original: eggImg5,
                thumbnail: eggImg5,
            }
        ];
        return (
            <div className="ProjectPage">

                <h1>Items in my projeggct</h1>

                <div className="ImageGallery">   
                    <ImageGallery items={images} 
                        showThumbnails={false}
                        autoPlay={true}
                    />
                </div> 
            
                <div className="test">
                    <PdfPreview file={eggPdf} clicked={this.showPdfToggle}/>
                </div>
    
                {this.state.showPdf? <BackDrop clicked={this.showPdfToggle} show={this.state.showPdf}/>:null}
                {this.state.showPdf? <PdfViewer file={eggPdf} />:null}

                <FilesUpload
                    itemBlock_id='5f81bdf6db99e33e48002c54'
                    type='File'
                    maxFiles = {10}
                    //accept="image/*,audio/*,video/*"
                    accept = 'image/*,audio/*,video/*'
                    //disabled={false}
                    fileRejectMessage = 'Image, audio and video files only'
                />
            </div>
        )
    }
}

export default ProjectPage;