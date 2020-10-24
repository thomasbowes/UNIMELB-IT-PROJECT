const PDFDocument = require('pdfkit');



const createPDF = (req, res) => {
    
    
    res.writeHead(200, {
        //'Content-Length': doc.length,
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=test.pdf',});

    const doc = new PDFDocument();
    doc.pipe(res);
    
    doc.font('Times-Roman')
        .fontSize(12)
        .text(`this is a test text`);
    
    
    doc.end();
    
};
    
    


module.exports.createPDF = createPDF;