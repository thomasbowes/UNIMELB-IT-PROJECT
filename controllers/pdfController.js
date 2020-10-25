const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const ProfileBlock = mongoose.model('ProfileBlock');
const ItemBlock = mongoose.model('ItemBlock');

//From user schema: firstname, lastname, email (all required)
//From ProfileBlock schema: title, aboutMe, website, phone, location, name (preferred), email (preferred)
//From ItemBlock schema: three different types
                        //For each type: title, description, startdate, enddate, organisation

const searchUserById = (userId) => {
    if(userId){
        const searchPromise = User.findById(userId, 'firstname lastname email').exec();
        return searchPromise;
    }

};

const searchProfileBlock = (userId) => {
    if(userId){
        const searchProfilePromise = ProfileBlock.find({user_Id: userId}, 
                                    'title aboutMe website phone location name email').exec();
        return searchProfilePromise;
    }
};

const searchItemBlock = (userId) => {
    if(userId){
        const searchItemPromise = ItemBlock.find({user_Id: userId}, 
                                    'type title description startDate endDate organisation').exec();
        return searchItemPromise;
    }
};

/*
const generateUserData = (userId, doc) => {
    const searchUserPromise = searchUserById(userId);
    searchUserPromise.then(userDoc => {
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
    }).catch(err => {
        console.log("Error in generateUserData: " + err);
    })
};
*/


const createPDF = async (req, res) => {
    const userId = req.params.userId;
    
    res.writeHead(200, {
        //'Content-Length': doc.length,
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=test.pdf'});

    // Pretended profile block
    const profileBlock = {
        website: "www.personalAccount.com.au",
        phone: "1234 567 8900",
        location: "Melbourne, Australia",
        name: "lalala",
        email: "tester123@gamil.com"
    };

    const doc = new PDFDocument();
    doc.pipe(res);
    
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

    // The first Promise (User)
    try{
        const userDoc = await searchUserById(userId);
        const normalUserDoc = userDoc.toObject();
        Object.keys(normalUserDoc).forEach(oneKey => {
            if(oneKey === 'firstname' || oneKey === 'lastname'){
                doc.font('Times-Roman')
                .fontSize(40)
                .fill('#000000')
                .text(normalUserDoc[oneKey], 220, 60);
            }
        });

    } catch (err) {
        console.log("Error in finding User's data: " + err);
    }


    // The second Promise (Profile Block) (!!!!!!!!FOR NOW, ASSUME this is the last promise)
    try {
        const profileDoc = await searchProfileBlock(userId);
        const normalProfileDoc = profileDoc.toObject();
        Object.keys(normalProfileDoc).forEach(oneKey => {
            doc.font('Times-Roman')
                .fontSize(12)
                .text(normalProfileDoc[oneKey]);
        });
        doc.end();

    } catch (err) {
        console.log("The Profile Block is not present, or, Error in finding Profile Block: " + err);
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
/*    
doc.font('Times-Roman')
            .fontSize(12)
            .text()
        );
    
 */   
    
   
    
    


module.exports.createPDF = createPDF;