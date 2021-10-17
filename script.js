$(document).ready(function () {
    localStorage.setItem('isEdit', false)
    var localarray = JSON.parse(localStorage.getItem('text')) || [];
    var studentarray = localarray.length > 0 ? localarray : [];

    $('body').on('click', 'button.delete-row', function () {
        // alert("The paragraph was clicked." + $(this).data("id"));
        console.log('this', this);
        const removeId = $(this).data("id");
        // $(this).data("id");
        console.log('studentarray 1', studentarray);
        var filteredArray = studentarray.filter(e => e.id !== removeId);
        console.log('filteredArray', filteredArray);
        // console.log(filteredArray);
        studentarray = [...filteredArray];
        console.log('studentarray 2', studentarray);
        table(studentarray);
    });

    // if ($("#fname").val().length && $("#lname").val().length && $("#subject").val().length) {

    $("#form-btn").click(function (e) {
        var editArray = localStorage.getItem('isEdit');
        console.log(editArray);
        //preventing page reload
        e.preventDefault();

        // form validation



        if ($("#fname").val().length && $("#lname").val().length && $("#subject").val().length &&
            $("#tamil").val() && $("#english").val() && $("#maths").val() && $("#science").val()
            && $("#social").val() > 0) {

            //object creation
            const total = parseInt($("#tamil").val()) + parseInt($("#english").val()) + parseInt($("#maths").val()) +
                parseInt($("#science").val()) + parseInt($("#social").val());
            const result = (parseInt($("#tamil").val()) >= 40 || parseInt($("#english").val()) >= 40 || parseInt($("#maths").val()) >= 40 ||
                parseInt($("#science").val()) >= 40 || parseInt($("#social").val() >= 40)) ? "Pass" : "Fail";
            // const checkMarks =  ? "Pass" : "Fail";   

            if ((parseInt($("#tamil").val()) > 100 || parseInt($("#english").val()) > 100 || parseInt($("#maths").val()) > 100 ||
                parseInt($("#science").val()) > 100 || parseInt($("#social").val() > 100))) {
                alert("Enter Numbers less than 100");
                // e.preventDefault();
                return false;
            }
            if (localStorage.getItem('isEdit') == 'true') {
                var student = {
                    id: parseInt(localStorage.getItem('editId')),
                    firstname: $("#fname").val(),
                    lastname: $("#lname").val(),
                    subject: $("#subject").val(),
                    tamil: $("#tamil").val(),
                    english: $("#english").val(),
                    maths: $("#maths").val(),
                    science: $("#science").val(),
                    social: $("#social").val(),
                    total: total,
                    average: total / 5,
                    result: result
                };

                let newArray = studentarray.map(e => {
                    if (e.id === student.id) {
                        return student;
                    } else {
                        return e;
                    }
                });
                studentarray = [...newArray];

            }
            else {
                var student = {
                    id: studentarray.length + 1,
                    firstname: $("#fname").val(),
                    lastname: $("#lname").val(),
                    subject: $("#subject").val(),
                    tamil: $("#tamil").val(),
                    english: $("#english").val(),
                    maths: $("#maths").val(),
                    science: $("#science").val(),
                    social: $("#social").val(),
                    total: total,
                    average: total / 5,
                    result: result
                };
                //pushing items to array
                studentarray.push(student);
            }
            // console.log(studentarray);

            //for resetting the form data
            $("#myform").trigger('reset');
            localStorage.setItem('isEdit', false);
            localStorage.removeItem('editId');
        } else {
            alert("please provide all the inputs")
        }
        table(studentarray);

        // set the item in localStorage
        // localStorage.setItem('text' + count, JSON.stringify(studentarray));
        localStorage.setItem('text', JSON.stringify(studentarray));
    });

    function table(studentarray) {
        $("#myTable tbody").empty();
        var tableRows = '';
        for (let i = 0; i < studentarray.length; i++) {
            tableRows = tableRows +
                `<tr>
                      <td>${studentarray[i].firstname}</td>
                      <td>${studentarray[i].lastname}</td>
                      <td>${studentarray[i].subject}</td>
                      <td>${studentarray[i].tamil}</td>
                      <td>${studentarray[i].english}</td>
                      <td>${studentarray[i].maths}</td>
                      <td>${studentarray[i].science}</td>
                      <td>${studentarray[i].social}</td>
                      <td>${studentarray[i].total}</td>
                      <td>${studentarray[i].average}</td>
                      <td>${studentarray[i].result}</td>
                      <td><button data-id="${studentarray[i].id}" class="edit-row">Edit</button></td>
                      <td><button data-id="${studentarray[i].id}" class="delete-row">Delete</button></td>
                </tr>`
        }
        $("#myTable tbody").append(tableRows);

    };


    function tableFromLocal() {
        var studentarray = JSON.parse(localStorage.getItem('text')) || [];
        // alert("ppp");
        // console.log(studentarray);
        $("#myTable tbody").empty();
        for (let i = 0; i < studentarray.length; i++) {
            $("#myTable tbody").append(
                `<tr>
                      <td>${studentarray[i].firstname}</td>
                      <td>${studentarray[i].lastname}</td>
                      <td>${studentarray[i].subject}</td>
                      <td>${studentarray[i].tamil}</td>
                      <td>${studentarray[i].english}</td>
                      <td>${studentarray[i].maths}</td>
                      <td>${studentarray[i].science}</td>
                      <td>${studentarray[i].social}</td>
                      <td>${studentarray[i].total}</td>
                      <td>${studentarray[i].average}</td>
                      <td>${studentarray[i].result}</td>
                      <td><button data-id="${studentarray[i].id}" class="edit-row">Edit</button></td>
                      <td><button data-id="${studentarray[i].id}" class="delete-row">Delete</button></td>
                </tr> `)
        }
    };

    tableFromLocal();

    //Edit record functionality starts here

    $('body').on('click', 'button.edit-row', function () {
        // console.log('this', this);
        var editId = $(this).data("id");
        // console.log(editId);

        var editedArray = studentarray.filter(e => e.id == editId);
        console.log(editedArray);

        $("#fname").val(editedArray[0].firstname);
        $("#lname").val(editedArray[0].lastname);
        $("#subject").val(editedArray[0].subject);
        $("#tamil").val(editedArray[0].tamil);
        $("#english").val(editedArray[0].english);
        $("#maths").val(editedArray[0].maths);
        $("#science").val(editedArray[0].science);
        $("#social").val(editedArray[0].social);
        isEditable = "true"
        // console.log(isEditable);
        localStorage.setItem('isEdit', true);
        localStorage.setItem('editId', editId);
    });

});