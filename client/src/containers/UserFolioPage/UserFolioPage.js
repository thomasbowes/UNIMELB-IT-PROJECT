import React, {Component, useState} from 'react';
import FilesUpload from '../../components/FilesUpload/FilesUpload';
import eggImage from '../../assets/ProfilePageDocuments/egg.jpg'
import './UserFolioPage.css'
import eggPdf from '../../assets/ProfilePageDocuments/eggPdf.pdf';

import { Document, Page } from 'react-pdf';

class UserFolioPage extends Component {

    // pdfView = () => {
    //     const [numPages, setNumPages] = useState(null);
    //     const [pageNumber, setPageNumber] = useState(1);

    //     return (
    //         <div>
    //             <Document
    //                 file={eggPdf}
    //                 onLoadSuccess={({ numPages }) => {
    //                     setNumPages(numPages);
    //                 }}
    //             >
    //                 <Page pageNumber={pageNumber} />
    //             </Document>
    //             <p>Page {pageNumber} of {numPages}</p>
    //         </div>
    //     );
    // }

    render(){
        // const pdfViwer = this.pdfView();

        return(
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

                {/* {pdfViwer} */}

                <FilesUpload />
            </div>
        );
    }
}

export default UserFolioPage;