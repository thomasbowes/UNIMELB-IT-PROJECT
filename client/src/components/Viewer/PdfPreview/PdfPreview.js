import React, {useState} from 'react';

import './PdfPreview.css'

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
            <div className="PdfPreview">
                <a href="#">
                    <Document className="Pdf"
                        file={props.file}
                        onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={1} 
                        />
                    </Document>
                </a>
            </div>

    );
}

export default PdfViewer;