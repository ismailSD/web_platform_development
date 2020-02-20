var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let employeeSchema = new Schema({
   name: String,
   phone: String,
   email: String
});

let Employee = mongoose.model('Employee', employeeSchema);

/*
let john = new Employee({
    name: "John doe",
    phone: "1234556767",
    email: "john@yahoo.com"
});

// save the employee object
john.save().then(function (data) {
    console.log("New employee created! ", data);
}).catch(function (err) {
    console.log(err.stack);
});
*/

module.exports = Employee;// exports our model