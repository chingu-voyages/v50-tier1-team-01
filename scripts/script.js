const menu_list = document.querySelector("#menu-list");
const test = document.querySelector(".test");

async function getMenuData() {
    const url = "https://menus-api.vercel.app";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      // Select only the pizza from the returned menu data
      const json = await response.json();
      const pizzas_all = json.pizzas; // select only pizzas
      
      // Select the first 20 pizza items
      const pizzas_selected = pizzas_all.slice(0, 20);

      // Create tile for each pizza
      for (let i = 0; i < 20; i++) {
        menu_list.innerHTML += `
          <li class="menu-list-item">
            <div class="menu-item">
              <div class="menu-image-div">
                <img class="menu-item-image" src=${pizzas_selected[i].img}>
              </div>

              <div class="primary-menu-item-details-div">
                <div class="menu-item-details">
                  <div class="menu-item-name"> ${pizzas_selected[i].dsc} </div>
                  <div class="menu-item-price"> $${pizzas_selected[i].price} </div>
                </div>

                <div class="menu-item-details">
                  <div class="menu-item-rating"> ${displayRating(pizzas_selected[i].rate)} </div>
                  <button class="add-to-basket-button">Add</button>
                </div>
              </div>

            </div>
          </li>
        `
      }
    } catch (error) {
      console.error(error.message);
    }
  }

function displayRating(rating_score) {
  const rating_star = [];

  for (let i = 0; i < rating_score; i++) {
    rating_star.push("★");
  }

  for (let i = 0; i < 5 - rating_star.length; i++) {
    rating_star.push("☆");
  }

  return rating_star.join("");
}

getMenuData();
document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  const openLoginModalBtn = document.getElementById('openLoginModalBtn');
  const openSignupModalBtn = document.getElementById('openSignupModalBtn');
  const closeElements = document.querySelectorAll('.close');
  const cancelBtns = document.querySelectorAll('.cancelbtn');
  const loginForm = document.getElementById('loginForm');
  let username = document.getElementById('login-username');
  let password = document.getElementById('login-password');

  // When the user clicks the login button, open the login modal
  openLoginModalBtn.onclick = function () {
    loginModal.style.display = 'block';
  };

  // When the user clicks the sign up button, open the sign up modal
  openSignupModalBtn.onclick = function () {
    signupModal.style.display = 'block';
  };

  // When the user clicks on <span> (x), close the modal
  closeElements.forEach((closeElement) => {
    closeElement.onclick = function () {
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
    };
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
    if (event.target === signupModal) {
      signupModal.style.display = 'none';
    }
  };

    // When the user clicks the cancel button, close the modal
    cancelBtns.forEach((cancelBtn) => {
      cancelBtn.onclick = function () {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
      };
    });


  // Form submit
  loginForm.onsubmit = function (event) {
    event.preventDefault();
    if (validateUsernameInput() && validatePasswordInput()) {
      let usernameValue = document.getElementById('login-username').value;
      let passwordValue = document.getElementById('login-password').value;
      console.log('username:', usernameValue);
      console.log('password:', passwordValue);
      loginModal.style.display = 'none';
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
    const validUsername = 'admin';
    if (usernameValue === '') {
      setError(username, 'Username is required');
      return false;
    } else if (usernameValue !== validUsername) {
      setError(username, 'Please enter valid username');
      return false;
    } else {
      setSuccess(username, '');
      return true;
    }
  };

  const validatePasswordInput = () => {
    const passwordValue = password.value.trim();
    const validPassword = 'password1';
    if (passwordValue === '') {
      setError(password, 'Password is required');
      return false;
    } else if (passwordValue !== validPassword) {
      setError(password, 'Please enter valid password');
      return false;
    } else {
      setSuccess(password, '');
      return true;
    }
  };

  username.onblur = validateUsernameInput;
  password.onblur = validatePasswordInput;
});
