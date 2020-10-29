const mongoose = require('mongoose');

// Inputs for Getting all existing users
exports.userTests = [
    {
        _id: mongoose.Types.ObjectId('1021b706175df1546e3acb09'),
        firstname: 'tester1',
        lastname: 'One',
        password: '$2a$10$BUUI/8btB/pVQHPSZpey7O4QMdyQYl//M1nWKO6hMDXWTtu3KNmoO',
        email: 'tester1@mail.com',
        confirm: true,
        isAdmin: false,
        googleID: "93249828498190"
    },
    {
        firstname: 'tester2',
        lastname: 'Two',
        password: '$2a$10$BUUI/8btB/pVQHPSZpey7O4QMdyQYl//M1nWKO6hMDXWTtu3KNmoO',
        email: 'tester2@mail.com',
        confirm: false,
        isAdmin: false
    },
    {
        firstname: 'tester3',
        lastname: 'Three',
        email: 'tester4@mail.com',
        confirm: true,
        isAdmin: false,
        facebookID: "918749279988"
    }
]

exports.rightUpdateUserDetails = {
    contents: {
        firstname: "Test Change",
        lastname: "Test Change"
    }
};

exports.itemTests = [
    {
        user_id: mongoose.Types.ObjectId('1021b706175df1546e3acb09'),
        type: 'Project',
        title: 'Test 1',
        description: 'Test Body'
    },
    {
        user_id: mongoose.Types.ObjectId('f3d6c9d62d60d057f06440f3'),
        type: 'Education',
        title: 'Test 2',
        description: 'Test Body 2'
    }
]

exports.profileTests = [
    {
        _id: mongoose.Types.ObjectId('1021b706175df1546e3acb10'),
        user_id: mongoose.Types.ObjectId('1021b706175df1546e3acb09'),
        title: 'Test 1',
        aboutMe: 'Test Body' 
    }, 
    {
        user_id: mongoose.Types.ObjectId('f3d6c9d62d60d057f06440f3'),
        title: 'Test 2',
        aboutMe: 'Test Body 2' 
    }
]

exports.rightUpdProfileDetails = {
    contents: {
        title: "Test 10",
        aboutMe: "Test Change"
    }
}

exports.wrongUpdProfileDetails = {
    contents: {
        title: "Test 10",
        aboutMe: "Test Change"
    }
};

exports.correctItemDetails = {
    contents: {
        title: "Test 3",
        type: "Project"
    }
};

exports.incorrectItemDetails = {
    contents: {
        title: "Test 4",
        // incorrect spelling of type
        type: "Prject"
    }
}

exports.missingItemDetails = {
    contents: {
        // missing type of item block
        title: "Test 5"
    }
}

exports.rightUpdItemDetails = {
    contents: {
        title: "Test 4",
        type: "Education"
    }
};

exports.wrongUpdItemDetails = {
    contents: {
        title: "Test 4",
        // incorrect spelling of "Education"
        type: "Educatio"
    }
};

exports.localUserRegister = {
    firstname: 'tester3 - local',
    lastname: 'Random',
    password: 'a',
    email: 'tester4@mail.com'
};

exports.localInvalidUserRegister = {
    email: 'tester1@mail.com',
    firstname: 'tester1 - fail',
    lastname: 'Random',
    password: 'ab'
};

exports.authBearerNotProvided = "foaiwefhwfhiofhufhahfa91898";

exports.authInvalidToken = "Bearer flaesiofhoiahao9285982ihaiof";

exports.invalidRefreshToken = {
    refresh_token: "flahfiauhuhfuha858772895iaahfih"
};

exports.loginInvalidEmail = {
    email: "aight@check.com",
    password: "123"
};

exports.loginInvalidPassword = {
    email: "tester1@mail.com",
    password: "123"
};

exports.loginEmailNotConfirm = {
    email: "tester2@mail.com",
    password: "a"
};

exports.loginOkay = {
    email: 'tester1@mail.com',
    password: 'a'
};

// Inputs for Register users functionality
exports.newUser = {
    firstname: 'TinTin',
    lastname: 'Random',
    email: 'folioexchangetesting@gmail.com',
    password: 'tesing123',
    confirm: false,
    isAdmin: false
};

exports.newUserDupEmail = {
    firstname: 'Captain',
    lastname: 'Random',
    email: 'folioexchangetesting@gmail.com',
    password: 1234,
    confirm: false,
    isAdmin: false
}

exports.newUserNoFullName = {
    email: 'haoxinl1@student.unimelb.edu.au',
    password: 1234
}

exports.newUserNoFirstname = {
    lastname: 'Haha',
    email: 'haoxinl1@student.unimelb.edu.au',
    password: 1234
}

exports.newUserNoLastname = {
    firstname: 'haoxin',
    email: 'haoxinl1@student.unimelb.edu.au',
    password: 1234
}

exports.newUserNoEmail = {
    firstname: 'haoxin',
    lastname: 'Lee',
    password: 123
}

exports.newUserNoPassword = {
    firstname: 'haoxin',
    lastname: 'Li',
    email: 'haoxinl1@student.unimelb.edu.au'
}

exports.newUserInvalidEmail = {
    firstname: 'hao',
    lastname: 'Le',
    email: 'haoxinl1student.unimelb.edu.au',
    password: 123
}
