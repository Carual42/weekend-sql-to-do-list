$( document ).ready( function(){
    console.log( 'JQ' );
    // Establish Click Listeners
    // setupClickListeners()
    $('#addTask').on('click', sendTaskToServer);
    $('body').on('click', '.completebtn', updateStatus);
    $('body').on('click', '.deletebtn', deleteTask);
    // load existing task on page load
    getTask();
  
  }); // end doc ready
  
  function updateStatus() {
    const toDoId = $(this).data('id');
    console.log('in updateStatus');
    $.ajax({
      type: 'PUT',
      url: `/toDo/${toDoId}`
  ,  }).then(function(response) {
      getTask();
    }).catch(function(error) {
      console.log(error);
      alert('Something went wrong in updateStatus');
    });
  } 
  ;
  
  function deleteTask(){
    const toDoId = $(this).data('id');
    $.ajax({
          type: 'DELETE',
          url: `/toDo/${toDoId}`
  }).then(function(response){
    getTask();
  }).catch(function(error){
    alert('something went wrong in delete', error);
  });}
  
  function sendTaskToServer() {
    console.log('in sendTaskToServer');
    $.ajax({
      type: 'POST',
      url: '/toDO',
      data: {
        task: $('#taskToDo').val(),
        complete: 'N'
      }
    }).then( function (response) {
        console.log('response');
        getTask(); // need to create, will display the task array on the DOM
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
  } // 
  
  function getTask(){
    console.log( 'in getTask' );
    $.ajax({
      type: 'GET',
      url: '/toDO',
    }).then(function (response) {
      console.log(response);
      $('#viewTask').empty();
      for (let i = 0; i < response.length; i++) {
        console.log('in for loop');
        if (response[i].complete === 'N'){
        $('#viewTask').append(`
        <tr>
          <td>${response[i].task}</td>
          <td>${response[i].complete}</td>
          <td><button class="completebtn" data-id="${response[i].id}">complete</button></td>
          <td><button class="deletebtn" data-id="${response[i].id}">delete</button></td>
        </tr>
        `)} else if (response[i].complete === 'Y'){
          $('#viewTask').append(`
          <tr>
          <td>${response[i].task}</td>
          <td>${response[i].complete}</td>
          <td><button class="deletebtn" data-id="${response[i].id}">delete</button></td>
        </tr>
          `);
        }
      }
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
  }