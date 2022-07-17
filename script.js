const apikey = '3897a285-3821-4714-94f6-18f007d941bf';
const apihost = 'https://todo-api.coderslab.pl';

// Pobranie zadań z API jako JSON

function apiListTasks() {
  return fetch(
    apihost + '/api/tasks',

    {
      headers: { Authorization: apikey }
    }
  ).then(
    function (resp) {
      if(!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
      }
      return resp.json();
    }
  )
}

//Renderowanie zadań na stronie
// długa funkcja, wywołanie funkcji poniżej

function renderTask(taskId, title, description, status) {
  const section = document.createElement('section');
  section.className = 'card mt-5 shadow-sm';
  document.querySelector('main').appendChild(section);

  const headerDiv = document.createElement('div');
  headerDiv.className = 'card-header d-flex justify-content-between align-items-center';
  section.appendChild(headerDiv);

  const headerLeftDiv = document.createElement('div');
  headerDiv.appendChild(headerLeftDiv);

  const h5 = document.createElement('h5');
  h5.innerText = title;
  headerLeftDiv.appendChild(h5);

  const h6 = document.createElement('h6');
  h6.className = 'card-subtitle text-muted';
  h6.innerText = description;
  headerLeftDiv.appendChild(h6);

  const headerRightDiv = document.createElement('div');
  headerDiv.appendChild(headerRightDiv);

  // kiedy zadanie ma status "closed", nie chcemy widzieć przycisku "Finish"
  if(status == 'open') {
    const finishButton = document.createElement('button');
    finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
    finishButton.innerText = 'Finish';
    headerRightDiv.appendChild(finishButton);
    // tu znajdzie się obsługa kliknięcia przycisku "Finish"
  }

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
  deleteButton.innerText = 'Delete';
  headerRightDiv.appendChild(deleteButton);
  // tu znajdzie się obsługa kliknięcia przycisku "Delete"

  // ...

  // ...
  const ul = document.createElement('ul');
  ul.className = 'list-group list-group-flush';
  section.appendChild(ul);
  // ...
  apiListOperationsForTask(taskId).then(
    function(response) {
      response.data.forEach(
        function(operation) {
          renderOperation(ul, status, operation.id, operation.description, operation.timeSpent);
        }
      );
    }
  );

  // formularz dodawania nowych operacji chcemy widzieć tylko w otwartych zadaniach
  if(status == 'open') {
    const addOperationDiv = document.createElement('div');
    addOperationDiv.className = 'card-body js-task-open-only';
    section.appendChild(addOperationDiv);

    const form = document.createElement('form');
    addOperationDiv.appendChild(form);

    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    form.appendChild(inputGroup);

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('placeholder', 'Operation description');
    descriptionInput.setAttribute('minlength', '5');
    descriptionInput.className = 'form-control';
    inputGroup.appendChild(descriptionInput);

    const inputGroupAppend = document.createElement('div');
    inputGroupAppend.className = 'input-group-append';
    inputGroup.appendChild(inputGroupAppend);

    const addButton = document.createElement('button');
    addButton.className = 'btn btn-info';
    addButton.innerText = 'Add';
    inputGroupAppend.appendChild(addButton);

    // tu znajdzie się obsługa wysłania formularza
  }
}

//Przesłanie danych z backendu do funkcji renderTask
document.addEventListener('DOMContentLoaded', function() {
  apiListTasks().then(
    function(response) {
      response.data.forEach(
        function(task) {
          renderTask(task.id, task.title, task.description, task.status);
        }
      )
    }
  );
});

//operacje
function apiListOperationsForTask(taskId) {
  return fetch(
    apihost + '/api/tasks/' + taskId + '/operations',
    { headers: { 'Authorization': apikey } }
  ).then(
    function (resp) {
      if(!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
      }
      return resp.json();
    }
  );
}

//
function renderOperation(ul, status, operationId, operationDescription, timeSpent) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  ul.appendChild(li);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.innerText = operationDescription;
  li.appendChild(descriptionDiv);

  const time = document.createElement('span');
  time.className = 'badge badge-success badge-pill ml-2';
  time.innerText = formatTime(timeSpent);
  descriptionDiv.appendChild(time);

  // ...

function renderOperation(ul, status, operationId, operationDescription, timeSpent) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  ul.appendChild(li);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.innerText = operationDescription;
  li.appendChild(descriptionDiv);

  const time = document.createElement('span');
  time.className = 'badge badge-success badge-pill ml-2';
  time.innerText = formatTime(timeSpent);
  descriptionDiv.appendChild(time);

  if(status == "open") {
    const controlDiv = document.createElement('div');
    controlDiv.className = 'js-task-open-only';
    li.appendChild(controlDiv);

    const add15minButton = document.createElement('button');
    add15minButton.className = 'btn btn-outline-success btn-sm mr-2';
    add15minButton.innerText = '+15m';
    controlDiv.appendChild(add15minButton);
    // tu dodamy obsługę kliknięcia przycisku "+15m"

    const add1hButton = document.createElement('button');
    add1hButton.className = 'btn btn-outline-success btn-sm mr-2';
    add1hButton.innerText = '+1h';
    controlDiv.appendChild(add1hButton);
    // tu dodamy obsługę kliknięcia przycisku "+1h"

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm';
    deleteButton.innerText = 'Delete';
    controlDiv.appendChild(deleteButton);
    // tu dodamy obsługę kliknięcia przycisku "Delete"
  }
}};

function formatTime(timeSpent) {
  const hours = Math.floor(timeSpent / 60);
  const minutes = timeSpent % 60;
  if(hours > 0) {
    return hours + 'h ' + minutes + 'm';
  } else {
    return minutes + 'm';
  }
}






// // moje consol logi
// apiListTasks().then(
//   function(response) {
//       for (let i = 0; i < response.data.length; i++) {
//           console.log('Tytuł zadania: ', response.data[i].title);
//           if (response.data[i].description == ""){
//             console.log("opis: na razie brak opisu")
//           }
//           else {
//           console.log('opis: ', response.data[i].description);}
//           console.log(`status:  ${response.data[i].status}`);
//           // console.log(`data dodania:  ${response.data[i].addedDate}`);
//       }
//   console.log(`Ilośc zadań:  ${response.data.length}`)
//
//   }
// );