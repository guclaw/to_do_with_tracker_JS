const apikey = '3897a285-3821-4714-94f6-18f007d941bf';
const apihost = 'https://todo-api.coderslab.pl';

// METODA GET
function apiListTasks() {
  return fetch(
    apihost + '/api/tasks',
    {
      headers: { Authorization: apikey }
    }
  ).then(
    function(resp) {
      if(!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
      }
      return resp.json();
    }
  )
}

// Operacja na response
apiListTasks().then(
  function(response) {
      for (let i = 0; i < response.data.length; i++) {
          console.log('Tytuł zadania to: ', response.data[i].title);
      }
  console.log(`Ilośc zadań:  ${response.data.length}`)
  }
);

// Dodawanie zadania - stworzenie funkcji
function apiCreateTask(title, description) {
  return fetch(apihost + '/api/tasks',
    {
      headers: { 'Authorization': apikey},
      body: JSON.stringify({ title: title, description: description, status: 'open' })
    }
  ).then(
    function(resp) {
      if(!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
      }
      return resp.json();
    }
  )
}

// Wywołanie funkcji

apiCreateTask('Przykładowy tytuł', 'Przykładowy opis').then(
  function(response) {
    console.log('Odpowiedź z serwera to:', response);
  }
);
