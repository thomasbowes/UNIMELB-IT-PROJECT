// Inputs for Getting all existing users
exports.tests = [
    {
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
    email: 'tester3@mail.com',
    password: 'tesing123',
    confirm: false,
    isAdmin: false
};

exports.newUserDupEmail = {
    firstname: 'Captain',
    lastname: 'Random',
    email: 'tester3@mail.com',
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
