import React, {useState} from 'react';

import './PdfViewer.css'

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const lastPage = () => (pageNumber<=1? 1: (pageNumber-1));
    const nextPage = () => (pageNumber>=numPages? numPages: (pageNumber+1));

    return (
            <div className="PdfViewer">
                <h1>My PDF folio</h1>
                <Document className="Pdf"
                    file={props.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <div className="PageChanger">
                    <button onClick={() => setPageNumber(lastPage())}>Last Page</button>
                    <p>Page {pageNumber} of {numPages}</p>
                    <button onClick={() => setPageNumber(nextPage())}>Next Page</button>
                </div>
            </div>

    );
}

export default PdfViewer;