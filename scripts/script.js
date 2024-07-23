const menu_list = document.querySelector("#menu-list");

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
          <li>
            <div class="menu-item">
              <img class="menu-item-image" src=${pizzas_selected[i].img}>

              <div class="menu-item-details">
                <div class="menu-item-name"> ${pizzas_selected[i].dsc} </div>
                <div class="menu-item-price"> $${pizzas_selected[i].price} </div>
              </div>

              <div class="menu-item-details">
                <div class="menu-item-rating"> ${pizzas_selected[i].rate} </div>
                <button class="add-to-basket-button"></button>
              </div>

            </div>
          </li>
        `
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  getMenuData();