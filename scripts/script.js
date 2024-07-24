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