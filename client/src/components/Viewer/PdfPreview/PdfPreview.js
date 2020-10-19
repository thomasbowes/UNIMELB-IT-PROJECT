import React, {useState} from 'react';

import './PdfPreview.css'

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PdfPreview = (props) => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
            <div className="PdfPreview" onClick={props.clicked}>
                <a href="#preview">
                    <Document className="Pdf"
                        file={props.file}
                        onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={1} 
                        />
                        <p>{numPages} pages in total.</p>
                    </Document>
                </a>
            </div>

    );
}

export default PdfPreview;