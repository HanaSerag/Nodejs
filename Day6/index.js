const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { rg } = require('./Events');
const dataUsers = require('./Data');

const rl = readline.createInterface({ input, output });

rl.question('Enter Username: ', (username) => {
    rl.question('Enter Password: ', (password) => {
        rl.question('Enter Email: ', (email) => {
            let account = { username, password, email };

            
            rg.emit('Register', account);

            rg.on('Register', (data) => {
                if (dataUsers[data.username]) {
                    console.log('Username Found');
                } else if (data.password.length < 8) {
                    console.log('Error: Password must be at least 8 characters');
                } else {
                    dataUsers[data.username] = data;
                    console.log('Registration successful');
                }
            });

            rl.close();
        });
    });
});
