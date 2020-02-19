const mongoose = require('mongoose');
const Employee = require('./models/employee');

let sample_data = [
    // employee objects
    {
        name:"John done",
        phone:"123456785",
        email:"john@yahoo.com"
    },
    {
        name:"Jane done",
        phone:"775556785",
        email:"jane@yahoo.com"
    },
    {
        name:"ingaine adam",
        phone:"3984793473",
        email:"ingaine@gmail.com"
    },
    {
        name:"Alex McDonald",
        phone:"123456785",
        email:"alex@hotmail.com.uk"
    }
];

// Seed the database
function seedDB(){
    Employee.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Wiped all data!");
            sample_data.forEach(function(data){
                Employee.create(data, function(err, employee){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("New employee created! ", employee);
                    }
                });
            });
        }
    });
}

module.exports = seedDB;