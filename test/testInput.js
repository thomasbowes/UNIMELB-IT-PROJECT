// Inputs for Getting all existing users
exports.tests = [
    {
        username: 'tester1',
        password: 'lkjfklajfa98awjfk',
        email: 'tester1@mail.com',
        confirm: true,
        isAdmin: false
    },
    {
        username: 'tester2',
        password: 'laksdfjklhhwhfuwhfhwuifh',
        email: 'tester2@mail.com',
        confirm: false,
        isAdmin: false
    }
]

// Inputs for Register users functionality
exports.newUser = {
    username: 'TinTin',
    email: 'haoxinli89@gmail.com',
    password: 'tesing123',
    confirm: false,
    isAdmin: false
};

exports.newUserDupEmail = {
    username: 'Captain',
    email: 'haoxinli89@gmail.com',
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
