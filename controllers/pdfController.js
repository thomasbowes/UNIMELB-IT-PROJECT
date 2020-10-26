const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const ProfileBlock = mongoose.model('ProfileBlock');
const ItemBlock = mongoose.model('ItemBlock');

//From user schema: firstname, lastname (both required)
//From ProfileBlock schema: title, aboutMe, website, phone, location, name (preferred), email (preferred)
//From ItemBlock schema: three different types
                        //For each type: title, description, startdate, enddate, organisation

const searchUserById = (userId) => {
    if(userId){
        const searchPromise = User.findById(userId, 'firstname lastname').exec();
        return searchPromise;
    }

};

const searchProfileBlock = (userId) => {
    if(userId){
        const searchProfilePromise = ProfileBlock.findOne( {user_id: userId}, 
                                    'title aboutMe website phone location name email').exec();
        return searchProfilePromise;
    }
};

const searchItemBlock = (userId) => {
    if(userId){
        const searchItemPromise = ItemBlock.find( {user_id: userId}, 
                                    'type title description startDate endDate organisation date')
                                    .sort( {date: 'asc'} )
                                    .exec();
        return searchItemPromise;
    }
};

// Print out one category of itemBlock on the pdf
const printItemBlock = (docArray, docPdf) => {
    docPdf.rect(docPdf.x, docPdf.y, 50, 3).fill('#003366');
    docPdf.fontSize(10).moveDown();

    docPdf.fontSize(20)
        .fill('#000000')
        .text(docArray[0].type, 220);
    docPdf.fontSize(12).moveDown();
    docArray.forEach( oneDoc => {
        // Assumption: the user will fill in at least the title field (required)
        if(oneDoc['organisation']){
            docPdf.fontSize(16)
                .text(oneDoc['organisation'], {
                    width: 350,
                    align: 'justify'
                });
        }

        if(!oneDoc['organisation'] && oneDoc['title']){
            docPdf.fontSize(16)
                .text(oneDoc['title'], {
                    width: 350,
                    align: 'justify'
                });
        }
        else if(oneDoc['organisation'] && oneDoc['title']) {
            docPdf.fontSize(14)
                .text(oneDoc['title'], {
                    width: 350,
                    align: 'justify'
                });
        }

        if(oneDoc['startDate'] || oneDoc['endDate']){
            let dateToPrint;
            if(oneDoc['startDate'] && oneDoc['endDate']){
                dateToPrint = oneDoc['startDate'] + ' - ' + oneDoc['endDate'];
            }
            else {
                if(oneDoc['startDate']){
                    dateToPrint = oneDoc['startDate'];
                }
                else if(oneDoc['endDate']){
                    dateToPrint = oneDoc['endDate'];
                }
            }
            docPdf.fontSize(12)
                .text(dateToPrint);
        }
        if(oneDoc['description']){
            docPdf.fontSize(12).moveDown();
            docPdf.fontSize(12)
                .text(oneDoc['description'], {
                    width: 350,
                    align: 'justify'
                })
                .moveDown(2);
        }
    });

    docPdf.fontSize(12).moveDown();
};


// Create the PDF 
const createPDF = async (req, res) => {
    const userId = req.params.userId;
    let userPreferName = "";
    let contactInfo;


    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=test.pdf'});

    const doc = new PDFDocument({bufferPages: true});
    doc.pipe(res);


    // The first Promise (User)
    try{
        const userDoc = await searchUserById(userId);
        const normalUserDoc = userDoc.toObject();
        // Combine the firstname and lastname together to display
        const fullName = normalUserDoc['firstname'] + ' ' + normalUserDoc['lastname'];
        userPreferName = fullName;
    } catch (err) {
        console.log("Error in finding User's data: " + err);
    }
    

    //const tempText = '--  Diligent and hardworking student with a passion in chemistry as well as computer science.  Attended the University of Melbourne and obtained excellent academic outcome (H1).  Ready to become a Master of Engineering (Software) student at the University of Melbourne.';
    // The second Promise (Profile Block) 
    try {
        const profileDoc = await searchProfileBlock(userId);
        const normalProfileDoc = profileDoc.toObject();
        console.log(JSON.stringify(normalProfileDoc));
        contactInfo = normalProfileDoc;

        // Check if the user has preferred name
        if(normalProfileDoc['name'] !== userPreferName){
            userPreferName = normalProfileDoc['name'];
        }
        doc.font('Times-Roman')
                .fontSize(30)
                .fill('#000000')
                .text(userPreferName, 220, 60);
        
        // Print title and aboutMe
        doc.fontSize(13)
            .text(normalProfileDoc['title'], {
                width: 350,
                align: 'justify'
            });
        doc.moveDown(2);
        doc.fontSize(20)
            .text("About Me");
        doc.fontSize(12)
            .text(normalProfileDoc['aboutMe'], {
                width: 350,
                align: 'justify'
            })
            .moveDown(3);
    } catch (err) {
        console.log("The Profile Block is not present, or, Error in finding Profile Block: " + err);
    }

    // The third Promise (the ItemBlock) title, description, startdate, enddate, organisation
    try{
        const itemDocArray = await searchItemBlock(userId);
        let eduDoc = [];
        let jobDoc = [];
        let projectDoc = [];
        // Categorise the itemBlocks based on their type 
        itemDocArray.forEach(oneDoc => {
            oneDoc.toObject();
            if(oneDoc['type'] === 'Education'){
                eduDoc.push(oneDoc);
            }
            else if(oneDoc['type'] === 'Job'){
                jobDoc.push(oneDoc);
            }
            else if(oneDoc['type'] === 'Project'){
                projectDoc.push(oneDoc);
            }
        });

        // If a category is not empty, print it out
        if(eduDoc.length !== 0){
            printItemBlock(eduDoc, doc);
        }

        if(jobDoc.length !== 0){
            printItemBlock(jobDoc, doc);
        }

        if(projectDoc.length !== 0){
            printItemBlock(projectDoc, doc);
        }

    } catch (err) {
        console.log("No Item Block is present, or, Error in finding Item Block: " + err);
    }
    

    // Draw the blue rectangle on each page when everything is done
    try {
        const pageRange = doc.bufferedPageRange();
        numPage = pageRange.count;
        let i;
        for(i = 0; i < numPage; i++){
            doc.switchToPage(i);
            doc.rect(0, 0, 200, 2000).fill('#003366');
        }
    } catch (err) {
        console.log("Error occured when trying to draw blue rectangles: " + err);
    }


     // Print the contact information at last
     try{
        if(contactInfo){
            // Print the contact information
            doc.switchToPage(0);
            doc.font('Times-Roman')
                .fontSize(20)
                .fill('#FFFFFF')
                .text("Contact", 10, 60);
            doc.moveDown(2);
            Object.keys(contactInfo).forEach(oneKey => {
                if(oneKey !== 'title' && oneKey !== 'aboutMe' && oneKey !== 'name' && oneKey !=='_id'){
                    doc.font('Times-Roman')
                        .fontSize(12)
                        .fill('#FFFFFF')
                        .text(contactInfo[oneKey], {
                            width:150
                        });
                    doc.moveDown();
                }
            });
        }

        doc.end();

    } catch (err) {
        console.log('Error in printing out the contact information: ' + err);
        doc.end();
    }

};

module.exports.createPDF = createPDF;