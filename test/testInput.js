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

// MAY EXPIRE ANYTIME, INPUT UNSTABLE
exports.correctFbCreds = {
    access_token: `EAALIqkOxw2EBAFrYahcxTdOlXxaWKyj
                   cjXTSc13O6qaMwQ63sVHFEhIwPjEr1pq
                   MTnGwlLIyMRhunuXMruKza4cgQkYmF7u
                   rRdMRCUQZCpDZA8PTXs6ZArxoZB071GW
                   P9SxN2ZB1ZASCejJqPFBQI3uOCnNYteJ
                   gfICLRvSmv5ddmxhBEhj366OZBZC9MIq
                   ykeYxTe5Mj7NYmAZDZD`
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
