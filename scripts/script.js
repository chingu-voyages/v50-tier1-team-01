// Get references to DOM elements
const menu_list = document.querySelector('#menu-list');
const test = document.querySelector('.test');

// Function to sort and display pizzas based on the selected filter
const filterPizzas = (order) => {
  let pizzas = Array.from(menu_list.children);  // Convert menu items to an array
  pizzas.sort((a, b) => {
    let priceA = parseFloat(
      a.querySelector('.menu-item-price').innerText.replace('$', '')
    );
    let priceB = parseFloat(
      b.querySelector('.menu-item-price').innerText.replace('$', '')
    );
    return order === 'low' ? priceA - priceB : priceB - priceA;
  });

  menu_list.innerHTML = '';
  pizzas.forEach((pizza) => menu_list.appendChild(pizza));
};

// Add event listeners for filter dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach((item) => {
  item.addEventListener('click', () => {
    const priceOrder = item.getAttribute('data-price'); // Get the filter order from data attribute
    filterPizzas(priceOrder);
  });
});

// Array of descriptions corresponding to the menu items
const descriptions = [
  "Chicago's famous deep-dish pizza with buttery crust and rich toppings.",
  'Crispy and thin crust pizza with a variety of toppings to choose from.',
  'Authentic New Haven-style pizza with a chewy crust and flavorful toppings.',
  "A pack of Chicago's deep-dish pizzas, perfect for pizza lovers.",
  'Wood-fired pizzas with a smoky flavor, a best-seller for a reason.',
  'Choose your favorite deep-dish pizzas, packed with hearty toppings.',
  'Detroit-style pizza with a thick, airy crust and crispy edges.',
  'Customize your own pack of Brooklyn-style pizzas with fresh ingredients.',
  'Classic Chicago deep-dish pizza, a must-try for any pizza enthusiast.',
  "A pack of 4 Lou Malnati's famous deep-dish pizzas.",
  'Neapolitan-style pizza with fresh, high-quality ingredients.',
  'Thin crust pizza with a variety of toppings, a customer favorite.',
  'A pack of 10 customizable Brooklyn-style pizzas.',
  'Mozzarella-loaded New Haven-style pizza, delicious and cheesy.',
  'Customize your own pack of pizzas with a variety of toppings.',
  'Authentic Margherita pizza with a coal-fired crispy crust.',
  'Detroit-style pizza squares with a unique, flavorful taste.',
  'Detroit pizza with a thick crust and your choice of toppings.',
  "Chicago's pan-style deep-dish pizza, loaded with toppings.",
  'Buffalo-style pepperoni pizza with a spicy kick.',
  'Neapolitan pizza with a thin, soft crust and fresh ingredients.',
  'Wood-fired pizza with a perfectly charred crust.',
  'Thin crust pizza with a variety of fresh toppings.',
  'New York-style pizza with a chewy, foldable crust.',
  'Chicago deep-dish pizza with a rich, buttery crust.',
  'Customize your own pack of pizzas from Regina Pizzeria.',
  'Giant slices of coal-oven Margherita pizza, perfect for sharing.',
];

//credit update feature
let userCredit = 0;
let basket = [];
//end.

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

    menu_list.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const pizza = pizzas_selected[i];
      const listItem = document.createElement('li');
      listItem.className = 'menu-list-item';
      listItem.innerHTML = `
        <div class="menu-item">
          <div class="menu-image-div">
            <img class="menu-item-image" src=${pizza.img}>
          </div>
          <div class="primary-menu-item-details-div">
            <div class="menu-item-details">
              <div class="menu-item-name">${pizza.dsc}</div>
              <div class="menu-item-description">${pizza.description}</div>
              <div class="menu-item-price">$${pizza.price}</div>
            </div>
            <div class="menu-item-detailsof">
              <div class="menu-item-rating">${displayRating(pizza.rate)}</div>
              <button class="add-to-basket-button" data-pizza='${JSON.stringify(
                pizza
              )}'>Add</button>
            </div>
          </div>
        </div>
      `;
      // Get the image element
      const imgElement = listItem.querySelector('.menu-item-image');

      // Add an error event listener to replace the image if it fails to load
      imgElement.onerror = function() {
        imgElement.src = 'images/fallback-pizza.png';  // Replace with your fallback image path
      };
      menu_list.appendChild(listItem);
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

//Adding items to basket and credit update on order starts here NEW.
function addToBasket(pizza) {
  basket.push(pizza);
  updateBasketDisplay();
  // Optional confirmation message we can have this feature or remove it.
  alert(`Added ${pizza.dsc} to your basket!`);
}

//remove items from basket individually
function removeFromBasket(pizza) {
  basket = basket.filter((item) => item.dsc !== pizza.dsc);
  updateBasketDisplay();
}

function updateBasketDisplay() {
  const basketCount = document.getElementById('basketCount');
  const basketItems = document.getElementById('basketItems');
  const basketTotal = document.getElementById('basketTotal');
  const checkoutTotal = document.getElementById('checkoutTotal');
  const finalTotal = document.getElementById('finalTotal');

  basketCount.textContent = basket.length;
  basketItems.innerHTML = '';
  let total = 0;

  basket.forEach((pizza) => {
    const li = document.createElement('li');
    li.innerHTML = `${pizza.dsc} - $${
      pizza.price
    } <button class="remove-from-basket-button" data-pizza='${JSON.stringify(
      pizza
    )}'>Remove</button>`;
    basketItems.appendChild(li);
    total += pizza.price;
  });

  basketTotal.textContent = total.toFixed(2);
  checkoutTotal.textContent = total.toFixed(2);
  finalTotal.textContent = total.toFixed(2);
}

function updateAvailableCredit() {
  document.getElementById('availableCredit').textContent =
    userCredit.toFixed(2);
}
//basket and credit update functionality ends here


// Initialize modals and event listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('loginModal'); //main login modal
  const signupModal = document.getElementById('signupModal'); //signup form modal
  const basketModal = document.getElementById('basketModal'); //order baket modal
  const checkoutModal = document.getElementById('checkoutModal'); //checkout modal on order completion
  const openLoginModalBtn = document.getElementById('openLoginModalBtn');
  const openSignupModalBtn = document.getElementById('openSignupModalBtn');
  const basketBtn = document.getElementById('basketBtn'); //get the order basket for update
  const checkoutBtn = document.getElementById('checkoutBtn');
  const payBtn = document.getElementById('payBtn'); //finalize payment
  const closeElements = document.querySelectorAll('.close');
  const cancelBtns = document.querySelectorAll('.cancelbtn');
  const loginForm = document.getElementById('loginForm');
  let username = document.getElementById('login-username');
  let password = document.getElementById('login-password');

  //This event listener responds to the 'add' button clicks in the menu
  document.addEventListener('click', (event) => {
    // Add to Basket
    if (event.target.classList.contains('add-to-basket-button')) {
      const pizzaData = JSON.parse(event.target.getAttribute('data-pizza'));
      addToBasket(pizzaData);
    }
    // Remove from Basket
    else if (event.target.classList.contains('remove-from-basket-button')) {
      const pizzaData = JSON.parse(event.target.getAttribute('data-pizza'));
      removeFromBasket(pizzaData);
    }
  });

  basketItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-basket-button')) {
      const pizzaData = JSON.parse(event.target.getAttribute('data-pizza'));
      removeFromBasket(pizzaData);
    }
  });

  // When the user clicks the login button, open the login modal
  openLoginModalBtn.onclick = function () {
    loginModal.style.display = 'block';
  };

  // When the user clicks the sign up button, open the sign up modal
  openSignupModalBtn.onclick = function () {
    signupModal.style.display = 'block';
  };

  basketBtn.onclick = () => (basketModal.style.display = 'block');

  checkoutBtn.onclick = () => {
    checkoutModal.style.display = 'block';
    basketModal.style.display = 'none';
  };

  //payment acceptance based on order and available credit. NEW.
  payBtn.onclick = () => {
    const total = parseFloat(
      document.getElementById('checkoutTotal').textContent
    );
    if (total <= userCredit) {
      userCredit -= total;
      alert('Payment successful! Thank you for your order.');
      basket = [];
      updateBasketDisplay();
      updateAvailableCredit();
      checkoutModal.style.display = 'none';
    } else {
      alert('Insufficient credit. Please add more credit to your account.');
    }
  };
  // When the user clicks on <span> (x), close the modals, login, signup, basket and checkout.
  closeElements.forEach((closeElement) => {
    closeElement.onclick = function () {
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
      basketModal.style.display = 'none';
      checkoutModal.style.display = 'none';
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
    if (event.target === basketModal) {
      basketModal.style.display = 'none';
    }
    if (event.target === checkoutModal) {
      checkoutModal.style.display = 'none';
    }
  };

  // When the user clicks the cancel button, close the modal
  cancelBtns.forEach((cancelBtn) => {
    cancelBtn.onclick = function () {
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
    };
  });

    // Form submit event listener for login form
  loginForm.onsubmit = function (event) {
    event.preventDefault();
    if (validateUsernameInput() && validatePasswordInput()) {
      let usernameValue = document.getElementById('login-username').value;
      let passwordValue = document.getElementById('login-password').value;
      userCredit = parseFloat(document.getElementById('login-credit').value); //credit input submit
      console.log('username:', usernameValue);
      console.log('password:', passwordValue);
      console.log('credit:', userCredit); //credit update when user enters
      updateAvailableCredit();
      loginModal.style.display = 'none';
    } else {
      console.log('Validation failed!');
    }

    validateUsernameInput();
    validatePasswordInput();
  };

  // Function to display an error message and apply error styles
  const setError = (element, message) => {
    const inputControl = element.parentElement; // Get the parent element of the input
    const errorDisplay = inputControl.querySelector('.error');  // Find the error display element within the parent

    errorDisplay.innerText = message;
    inputControl.classList.add('error');  // Add error styling class
    inputControl.classList.remove('success'); // Remove success styling class
  };

  // Function to display a success message and apply success styles
  const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
  };

  // Function to validate the username input
  const validateUsernameInput = () => {
    const usernameValue = username.value.trim();  // Get and trim the username value
    const validUsername = 'admin';  // Force define the valid username
    if (usernameValue === '') {  // Check if the username is empty
      setError(username, 'Username is required');
      return false;
    } else if (usernameValue !== validUsername) {
      setError(username, 'Please enter valid username');
      return false;
    } else {
      setSuccess(username, ''); // Clear any existing error messages and show success
      return true;
    }
  };

  // Function to validate the password input
  const validatePasswordInput = () => {
    const passwordValue = password.value.trim();
    const validPassword = 'password1';
    if (passwordValue === '') {
      setError(password, 'Password is required'); // Show error message
      return false;
    } else if (passwordValue !== validPassword) {
      setError(password, 'Please enter valid password');
      return false; // Validation failed
    } else {
      setSuccess(password, '');
      return true;
    }
  };

  // Attach validation functions to the blur event of the username and password fields
  username.onblur = validateUsernameInput;
  password.onblur = validatePasswordInput;

  getMenuData();


  //search bar and filter button

  const searchBar = document.getElementById('searchBar');
  const searchButton = document.getElementById('searchButton');
  const filterButton = document.getElementById('filterButton');

  searchButton.addEventListener('click', () => {
    const query = searchBar.value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-list-item');

    menuItems.forEach((item) => {
      const itemName = item
        .querySelector('.menu-item-name')
        .innerText.toLowerCase();
      if (itemName.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

// Function to format the current time
function formatTime(date) {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleTimeString(undefined, options);
}

// Function to display the current date and time
function displayCurrentDateTime() {
  const currentDateTimeElement = document.getElementById('currentDateTime');
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const formattedTime = formatTime(currentDate);
  currentDateTimeElement.textContent += `${formattedDate} ${formattedTime}`;
}

// Call the function to display the date and time when the page loads
window.onload = displayCurrentDateTime;