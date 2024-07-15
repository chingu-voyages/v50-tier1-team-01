// Login modal

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('loginModal');
  const btn = document.getElementById('openModalBtn');
  const span = document.getElementsByClassName('close')[0];
  const form = document.getElementById('loginForm');

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

  form.onsubmit = function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    modal.style.display = 'none';
    console.log('username:', username);
    console.log('password:', password);
  };
});
