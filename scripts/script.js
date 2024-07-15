const menu_div = document.querySelector("#menu-div")

async function getMenuData() {
    const url = "https://menus-api.vercel.app";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;

    } catch (error) {
      console.error(error.message);
    }
  }
  
const menuData = getMenuData();

console.log