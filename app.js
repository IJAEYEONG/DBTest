document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('nameInput').value;
  saveUser(name);
});

function saveUser(name) {
  fetch('/save', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
  })
  .then(function(response){
    return response.text
  })  
  .then(data => {
      console.log(data);
      loadUsers();
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function loadUsers() {
  fetch('/load')
  .then(response => response.json())
  .then(data => {
      const userList = document.getElementById('userList');
      userList.innerHTML = '';
      data.forEach(user => {
          const userItem = document.createElement('div');
          userItem.textContent = user.name;
          userList.appendChild(userItem);
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

loadUsers();