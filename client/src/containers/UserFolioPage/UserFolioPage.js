import React, {Component, useState} from 'react';
import FilesUpload from '../../components/FilesUpload/FilesUpload';
import eggImage from '../../assets/ProfilePageDocuments/egg.jpg'
import './UserFolioPage.css'
import eggPdf from '../../assets/ProfilePageDocuments/eggPdf.pdf';
import PdfViwer from '../../components/Viewer/PdfViewer/PdfViewer';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import eggImg1 from '../../assets/ProfilePageDocuments/egg1.jpg'
import eggImg2 from '../../assets/ProfilePageDocuments/egg2.jpg'
import eggImg3 from '../../assets/ProfilePageDocuments/egg3.jpg'
import eggImg4 from '../../assets/ProfilePageDocuments/egg4.jpg'
import eggImg5 from '../../assets/ProfilePageDocuments/egg5.jpg'


class UserFolioPage extends Component {
    render() {
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
            <div className="UserFolioPage">
                <div className="User">
                    <div className="UserPictureHolder">
                        <img className="UserPicture"src={eggImage} alt='egg' />
                    </div>
    
                    <div className="UserInfoHolder">
                        <div className="UserInfo">
                            <p><b>Name: </b> Mr. Eggy</p>
                        </div>
                        <div className="UserInfo">
                            <p><b>Birthday: </b> 2023.9.30</p>
                        </div>
                        <div className="UserInfo">
                            <p><b>Education: </b> Eggy Institute of Technology</p>
                        </div>
                        <div className="UserInfo">
                            <p><b>Past experience: </b> Boiled.</p>
                        </div>
                    </div>
                </div>
    
                <PdfViwer file={eggPdf} />
    
                <FilesUpload />

                <h1>My image folio</h1>
                <ImageGallery items={images} />
            </div>
    
        );
    }
}


export default UserFolioPage;