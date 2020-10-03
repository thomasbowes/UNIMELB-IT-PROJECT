// Inputs for Getting all existing users
exports.tests = [
    {
        username: 'tester1',
        password: '$2a$10$BUUI/8btB/pVQHPSZpey7O4QMdyQYl//M1nWKO6hMDXWTtu3KNmoO',
        email: 'tester1@mail.com',
        confirm: true,
        isAdmin: false,
        googleID: "93249828498190"
    },
    {
        username: 'tester2',
        password: '$2a$10$BUUI/8btB/pVQHPSZpey7O4QMdyQYl//M1nWKO6hMDXWTtu3KNmoO',
        email: 'tester2@mail.com',
        confirm: false,
        isAdmin: false
    },
    {
        username: 'tester3',
        email: 'tester4@mail.com',
        confirm: true,
        isAdmin: false,
        facebookID: "918749279988"
    }
]

exports.localUserRegister = {
    username: 'tester3 - local',
    password: 'a',
    email: 'tester4@mail.com'
};

exports.localInvalidUserRegister = {
    email: 'tester1@mail.com',
    username: 'tester1 - fail',
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
    username: 'TinTin',
    email: 'tester3@mail.com',
    password: 'tesing123',
    confirm: false,
    isAdmin: false
};

exports.newUserDupEmail = {
    username: 'Captain',
    email: 'tester3@mail.com',
    password: 1234,
    confirm: false,
    isAdmin: false
}

exports.newUserNoName = {
    email: 'haoxinl1@student.unimelb.edu.au',
    password: 1234
}

exports.newUserNoEmail = {
    username: 'haoxin',
    password: 123
}

exports.newUserNoPassword = {
    username: 'haoxinLi',
    email: 'haoxinl1@student.unimelb.edu.au'
}

exports.newUserInvalidEmail = {
    username: 'hao',
    email: 'haoxinl1student.unimelb.edu.au',
    password: 123
}
