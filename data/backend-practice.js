const xhr = new XMLHttpRequest(); // creates a new HTTP message to send to the backedn. Message = request. 

xhr.addEventListener('load', () => { // must use an event listener to display the response since it takes time for the repsonse to come from the backend. 
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
