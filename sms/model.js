const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constant = require('./constant')();
const isIt = constant.isIt;
const driverS = constant.DRIVER_STATUS;
const tables = constant.TABLES;
console.log(constant);
console.log(tables);
const role = constant.ROLE;


const driverSchema = new Schema({
});

//driverSchema.index({location: '2dsphere'});

module.exports = mongoose.model(tables.DRIVER, driverSchema);












