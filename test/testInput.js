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

exports.correctFbCreds = {
    access_token: `EAALIqkOxw2EBAGxg2rHpL88bkZCDXZCqn2ZA
                   ZB9lFWFoCMHsp0jIkXxmsFcCjzKZAAFcVBbFa
                   kWG3acBw8NY6cBB7PKEZCux3ifkEra02dR7qt
                   965jtWieuS0ZBtUbx9vxNXeI3o1WTg2bqe13h
                   GRQDHmQc6H5kg54qlmHVTW1XzrlOffAnKV0vg
                   v3YGSAwopA4GwRZBkHNFWwZDZD`
}

exports.incorrectFbCreds = {
    access_token: `itsamemario`
}

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
