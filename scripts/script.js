// login modal

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('loginModal');
  const btn = document.getElementById('openModalBtn');
  const span = document.getElementsByClassName('close')[0];
  const form = document.getElementById('loginForm');
  let username = document.getElementById('username');
  let password = document.getElementById('password');

  //modal display
  btn.onclick = function () {
    modal.style.display = 'block';
  };

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  //form submit
  form.onsubmit = function (event) {
    event.preventDefault();
    if (validateUsernameInput() && validatePasswordInput()) {
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      console.log('username:', username);
      console.log('password:', password);
      modal.style.display = 'none';
    } else {
      console.log('Validation failed!');
    }

    validateUsernameInput();
    validatePasswordInput();
  };

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
  };

  const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  };

  const validateUsernameInput = () => {
    const usernameValue = username.value.trim();

    if (usernameValue === '') {
      setError(username, 'Username is required');
      return false;
    } else if (usernameValue.length < 3) {
      setError(username, 'Username must be at least 3 characters long');
      return false;
    } else {
      setSuccess(username, '');
      return true;
    }
  };

  const validatePasswordInput = () => {
    const passwordValue = password.value.trim();

    if (passwordValue === '') {
      setError(password, 'Password is required');
      return false;
    } else if (passwordValue.length < 6) {
      setError(password, 'Password must be at least 6 characters!');
      return false;
    } else {
      setSuccess(password, '');
      return true;
    }
  };

  username.onblur = validateUsernameInput;
  password.onblur = validatePasswordInput;
});
