const menu_list = document.querySelector('#menu-list');
const test = document.querySelector('.test');

// Array of descriptions corresponding to the menu items
const descriptions = [
  "Chicago's famous deep-dish pizza with buttery crust and rich toppings.",
  "Crispy and thin crust pizza with a variety of toppings to choose from.",
  "Authentic New Haven-style pizza with a chewy crust and flavorful toppings.",
  "A pack of Chicago's deep-dish pizzas, perfect for pizza lovers.",
  "Wood-fired pizzas with a smoky flavor, a best-seller for a reason.",
  "Choose your favorite deep-dish pizzas, packed with hearty toppings.",
  "Detroit-style pizza with a thick, airy crust and crispy edges.",
  "Customize your own pack of Brooklyn-style pizzas with fresh ingredients.",
  "Classic Chicago deep-dish pizza, a must-try for any pizza enthusiast.",
  "A pack of 4 Lou Malnati's famous deep-dish pizzas.",
  "Neapolitan-style pizza with fresh, high-quality ingredients.",
  "Thin crust pizza with a variety of toppings, a customer favorite.",
  "A pack of 10 customizable Brooklyn-style pizzas.",
  "Mozzarella-loaded New Haven-style pizza, delicious and cheesy.",
  "Customize your own pack of pizzas with a variety of toppings.",
  "Authentic Margherita pizza with a coal-fired crispy crust.",
  "Detroit-style pizza squares with a unique, flavorful taste.",
  "Detroit pizza with a thick crust and your choice of toppings.",
  "Chicago's pan-style deep-dish pizza, loaded with toppings.",
  "Buffalo-style pepperoni pizza with a spicy kick.",
  "Neapolitan pizza with a thin, soft crust and fresh ingredients.",
  "Wood-fired pizza with a perfectly charred crust.",
  "Thin crust pizza with a variety of fresh toppings.",
  "New York-style pizza with a chewy, foldable crust.",
  "Chicago deep-dish pizza with a rich, buttery crust.",
  "Customize your own pack of pizzas from Regina Pizzeria.",
  "Giant slices of coal-oven Margherita pizza, perfect for sharing."
];

async function getMenuData() {
  const url = 'https://menus-api.vercel.app';
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

    // Adding descriptions to the selected pizza items
    pizzas_selected.forEach((pizza, index) => {
      pizza.description = descriptions[index];
    });

    // Create tile for each pizza
    for (let i = 0; i < 6; i++) {
      menu_list.innerHTML += `
          <li class="menu-list-item">
            <div class="menu-item">
              <div class="menu-image-div">
                <img class="menu-item-image" src=${pizzas_selected[i].img}>
              </div>

              <div class="primary-menu-item-details-div">
                <div class="menu-item-details">
                  <div class="menu-item-name"> ${pizzas_selected[i].dsc} </div>
                  <div class="menu-item-description"> ${pizzas_selected[i].description} </div>
                  <div class="menu-item-price"> $${
                    pizzas_selected[i].price
                  } </div>
                </div>

                <div class="menu-item-details">
                  <div class="menu-item-rating"> ${displayRating(
                    pizzas_selected[i].rate
                  )} </div>
                  <button class="add-to-basket-button">Add</button>
                </div>
              </div>

            </div>
          </li>
        `;
    }
  } catch (error) {
    console.error(error.message);
  }
}

function displayRating(rating_score) {
  const rating_star = [];

  for (let i = 0; i < rating_score; i++) {
    rating_star.push('★');
  }

  for (let i = 0; i < 5 - rating_star.length; i++) {
    rating_star.push('☆');
  }

  return rating_star.join('');
}

getMenuData().then(() => {
  const addToBasketButtons = document.querySelectorAll(".add-to-basket-button");
  const menuCustomization = document.querySelector("#menu-customization") ;
  addToBasketButtons.forEach(button => {
      button.addEventListener("click", () => {
          console.log("Hello");
          menuCustomization.style.display = 'block';

      });
  });
});

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

  //search bar and filter button

  const searchBar = document.getElementById('searchBar');
  const searchButton = document.getElementById('searchButton');
  const filterButton = document.getElementById('filterButton');

  searchButton.addEventListener('click', () => {
    const query = searchBar.value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-list-item');

    menuItems.forEach(item => {
      const itemName = item.querySelector('.menu-item-name').innerText.toLowerCase();
      if (itemName.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
  filterButton.addEventListener('click', () => {
    alert('Filter button clicked');
  });

});
