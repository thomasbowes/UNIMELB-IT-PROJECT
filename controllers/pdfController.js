const PDFDocument = require('pdfkit');



const createPDF = (req, res) => {
    
    const doc = new PDFDocument;
    doc.pipe(res);

    doc.font('Times-Roman')
        .fontSize(12)
        .text(`this is a test text`);
    
    res.writeHead(200, {
        //'Content-Length': doc.length,
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=test.pdf',});

    doc.end();
    /*
    res.status(200).json({
        status: "Success"
    });
    */

    //let buffers = [];
    //doc.on('data', buffers.push.bind(buffers));
    /*
    doc.on('end', () => {
        
        //let pdfData = Buffer.concat([str1, str2]);
        let pdfData = "first" + "second";
        console.log(pdfData);
        
        res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-disposition': 'attachment;filename=test.pdf',})
            .end(pdfData);
        

    });
    */
    
   
    
};
    
    
/*
    res.status(200).json({
        status: "Success"
    });
*/

module.exports.createPDF = createPDF;