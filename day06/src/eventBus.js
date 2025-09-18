// Event Emitter - will be shared across the application
const EventEmitter = require("events");
// Make single instance of Event Emitter
const bus = new EventEmitter();
// export the event emitter to be used in the application
module.exports = bus;