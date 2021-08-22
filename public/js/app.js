const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = searchElement.value;

  messageOne.textContent = '';
  messageTwo.textContent = '';

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);

        messageTwo.textContent = data.error;
      } else {
        console.log(`Pocasi v ${data.location} je ${data.forecast}`);
        messageOne.textContent = `Pocasi v ${data.location} je ${data.forecast}`;
      }
    });
  });
});
