// jQuery ajax get request
/*
$.get('/', function (employees) {
    return console.log(employees);
});
*/

// use css selector to select html element using jQuery
// call submit listener
// callback with the event

$('#newEmployeeForm').submit(function (e) {
    // prevent the default form action
    e.preventDefault();

    // select the form using $(this)
    // $(this) represents the form as an object and serialize turns the object into a string.
    // same as saying form.serialize()
    let newEmployee = $(this).serialize();

    // sending the data to the server.... requires[ url, data, and callback()]
    // specify the route, pass the new employee then callback afterwards
    // $.post is a short cut method to perform post request using jQuery ajax
    $.post('/employees', newEmployee, (e)=>{
        // the res is what is coming back from the server
        // select our employees list then append the new item. SIDE NOTE! `` are not supported in IE browser
        // BIG NOTE! we need to replace the ejs syntax with e.g. ${e.name};
        $('#employeeList').append(
            `<li id="listElement">
                 <form id="editForm" METHOD="POST" action="/employees/${e._id}">
                    <input type="text" name="name" value="${e.name}" required>
                    <input type="text" name="phone" value="${e.phone}" required>
                    <input type="email" name="email" value="${e.email}" required>
                    <button type="submit">Update</button>
                    
                </form>
                <span><strong>Name:</strong> ${e.name} </span>
                <span><strong>Phone:</strong> ${e.phone} </span>
                <span><strong>Email:</strong> ${e.email}</span>
                <button class="edit-btn">Edit</button><!--give a class so we can select all buttons-->
                <form id="deleteForm" method="POST" action="/employees/${e._id}">
                    <button type="submit">Delete</button></form>
            </li>`
        );
        // select the new employee form then select input elements withing the form and clear
        $('#newEmployeeForm').find('.new-form-input').val('');
    });

});

// UPDATE ROUTE....................................
$('#employeeList').on('click', '.edit-btn', function(){
    // toggle the edit form
    // $(this) represents the edit button that was clicked
    // all elements within the li at the same level with the edit button are siblings to the edit button
    $(this).siblings('#editForm').toggle();
});

// update ajax logic..........
// listen on edit form submission
$('#employeeList').on('submit', '#editForm', function (event) {
    event.preventDefault();// prevent the default form action
    // select the edit form using $(this)
    let editEmployee = $(this).serialize();
    let formAction = $(this).attr('action');// get the form actions url
    // we need to know which item we are updating so that we can select with jQuery
    $oldData = $(this).parent('#listElement');
    // $.ajax since there is no method for $.put in ajax
    $.ajax({
        url: formAction,
        data: editEmployee,
        type: 'PUT',//this is where we indicate it is a put request
        oldData: $oldData,// we must this defined out side of this ajax otherwise we no longer have access to (this)
        success: function(e){// will be invoked when we got a successful response
            // this represents the ajax request
            this.oldData.html(
                `<form id="editForm" METHOD="POST" action="/employees/${e._id}">
                    <input type="text" name="name" value="${e.name}" required>
                    <input type="text" name="phone" value="${e.phone}" required>
                    <input type="email" name="email" value="${e.email}" required>
                    <button type="submit">Update</button>
                </form>

                <span><strong>Name:</strong> ${e.name} </span>
                <span><strong>Phone:</strong> ${e.phone} </span>
                <span><strong>Email:</strong> ${e.email} </span>
                <button class="edit-btn">Edit</button><!--give a class so we can select all buttons-->
                <form id="deleteForm" method="POST" action="/employees/${e._id}">
                    <button type="submit">Delete</button></form>`
            );
        }
    });
});



// DELETE REQUEST HI JACKING.....................
// EDIT FORM HI JACKING

$('#employeeList').on('submit', '#deleteForm',function (e) {
    e.preventDefault();// prevent the default form action
    let confirmDelete = confirm("Confirm to delete?");
    if(confirmDelete){// if true
        let formAction = $(this).attr('action');// get the action url
        // find the old object that was clicked
        $oldData = $(this).closest('#listElement');
        $.ajax({
            url: formAction,
            type: 'DELETE',
            oldData: $oldData,
            success: function (data) {
                console.log(this.oldData);
                this.oldData.remove();
            }
        });
    }
});















