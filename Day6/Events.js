const events = require('events');
const rg = new events.EventEmitter();

rg.on('Register', (data) => {
    console.log('Register event received:', data);
});

module.exports = { rg };
