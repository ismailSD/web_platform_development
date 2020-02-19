// jQuery ajax get request
$.get('/', function (employees) {
    return console.log(employees);
});

// use css selector to select html element using jQuery
// call submit listener
// callback with the event
$('.newEmployeeForm').submit(function (e) {
    // prevent the default form action
    e.preventDefault();

    // select the form using $(this)
    // $(this) represents the form as an object and serialize turns the object into a string.
    let newEmployee = $(this).serialize();

    // sending the data to the server....
    // specify the route, pass the new employee then callback afterwards
    // $.post is a short cut method to perform post request using jQuery ajax
    $.post('/employees', newEmployee, (res)=>{
        // the res is what is coming back from the server
        console.log(res);

        // use jQuery to update the DOM.
    });

});