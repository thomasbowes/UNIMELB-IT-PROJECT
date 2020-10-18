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


class ProjectPage extends Component {
    state = {showPdf: false}

    showPdfToggle = () => {
        const newShowPdf = !this.state.showPdf;
        this.setState({showPdf: newShowPdf})
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
                    accept = ''
                    disabled={false}
                />
            </div>
        )
    }
}

export default ProjectPage;