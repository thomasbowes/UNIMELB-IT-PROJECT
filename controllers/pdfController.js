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
    
    docPdf.fontSize(20)
        .fill('#000000')
        .text(docArray[0].type, 220);
    docPdf.fontSize(12).moveDown();
    docArray.forEach( oneDoc => {
        if(oneDoc['organisation']){
            docPdf.fontSize(17)
                .text(oneDoc['organisation'], {
                    width: 350,
                    align: 'justify'
                });
            }
            if(oneDoc['title']){
                docPdf.fontSize(15)
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
}



const createPDF = async (req, res) => {
    const userId = req.params.userId;
    let userPreferName;
    let contactInfo = {};


    res.writeHead(200, {
        //'Content-Length': doc.length,
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=test.pdf'});

    // Pretended profile block
    /*
    const profileBlock = {
        website: "www.personalAccount.com.au",
        phone: "1234 567 8900",
        location: "Melbourne, Australia",
        name: "lalala",
        email: "tester123@gamil.com"
    };
    */
    const doc = new PDFDocument({bufferPages: true});
    doc.pipe(res);
    /*
    //Styling for the rectangle 
    doc.rect(0, 0, 200, 2000).fill('#003366');
    doc.font('Times-Roman')
        .fontSize(20)
        .fill('#FFFFFF')
        .text("Contact", 10, 60);
    
    doc.moveDown(2);
    Object.keys(profileBlock).forEach(oneKey => {    
        doc.font('Times-Roman')
            .fontSize(12)
            .fill('#FFFFFF')
            .text(profileBlock[oneKey], {
                width:150
            });
        doc.moveDown();
    });    
    */


    // The first Promise (User)
    try{
        const userDoc = await searchUserById(userId);
        const normalUserDoc = userDoc.toObject();
        // Combine the firstname and lastname together to display
        const fullName = normalUserDoc['firstname'] + ' ' + normalUserDoc['lastname'];
        doc.font('Times-Roman')
                .fontSize(30)
                .fill('#000000')
                .text(fullName, 220, 60);
    } catch (err) {
        console.log("Error in finding User's data: " + err);
    }
    

    //const tempText = '--  Diligent and hardworking student with a passion in chemistry as well as computer science.  Attended the University of Melbourne and obtained excellent academic outcome (H1).  Ready to become a Master of Engineering (Software) student at the University of Melbourne.';
    // The second Promise (Profile Block) 
    try {
        const profileDoc = await searchProfileBlock(userId);
        console.log(profileDoc);
        const normalProfileDoc = profileDoc.toObject();
        contactInfo = normalProfileDoc;
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
        
        /*
        // Print the contact information
        doc.font('Times-Roman')
            .fontSize(20)
            .fill('#FFFFFF')
            .text("Contact", 10, 60);
        doc.moveDown(2);
        Object.keys(normalProfileDoc).forEach(oneKey => {
            if(oneKey !== 'title' && oneKey !== 'aboutMe' && oneKey !== 'name' && oneKey !=='_id'){
                doc.font('Times-Roman')
                    .fontSize(12)
                    .fill('#FFFFFF')
                    .text(normalProfileDoc[oneKey], {
                        width:150
                    });
                doc.moveDown();
            }
        });
        */

    } catch (err) {
        console.log("The Profile Block is not present, or, Error in finding Profile Block: " + err);
    }

    // The third Promise (the ItemBlock) title, description, startdate, enddate, organisation
    try{
        const itemDocArray = await searchItemBlock(userId);
        //console.log(itemDocArray);
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

        }


        console.log("eduDoc: " + JSON.stringify(eduDoc));
        console.log("jobDoc: " + JSON.stringify(jobDoc));
        console.log("projectDoc: " + JSON.stringify(projectDoc));

        

        
        


        

    } catch (err) {
        console.log("No Item Block is present, or, Error in finding Item Block: " + err);
    }
    

    //Draw the blue rectangle on each page when everything is done
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

        doc.end();

    } catch (err) {
        console.log('Error in printing out the contact information: ' + err);
        doc.end();
    }
    /*
    // Display User information from User selection
    
    searchUserById(userId)
    .then(userDoc => {
        const normalUserDoc = userDoc.toObject();
        //console.log(JSON.stringify(normalUserDoc, null, '\t'));
        //console.log(Object.keys(normalUserDoc));
        Object.keys(normalUserDoc).forEach(oneKey => {
            if(oneKey === 'firstname' || oneKey === 'lastname'){
                doc.font('Times-Roman')
                .fontSize(40)
                .fill('#000000')
                .text(normalUserDoc[oneKey], 220, 60);
            }
        });

        return searchProfileBlock(userId);
    })
    .then(profileDoc => {
        const normalProfileDoc = profileDoc.toObject();
        Object.keys(normalProfileDoc).forEach(oneKey => {
            doc.font('Times-Roman')
                .fontSize(12)
                .text(normalProfileDoc[oneKey]);
        });

        //return the next search function

    })
    .then(() => {
        doc.end();
    })
    .catch(err => {
        doc.end();
        console.log("A block is missing or error occur in pdfController: " + err);
    });
    */

    //doc.end();
    

}
    
   
    
    


module.exports.createPDF = createPDF;