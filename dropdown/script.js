const HOST = 'server.com/';

function populateCategories(category) {
  api.get(HOST + 'categories', {category}, function(categories) {
    let newCategories = '';
    for (const category of categories) {
      const categoryElement = `
        <li class="menu__sub__categories__item">
          <a href="#" class="menu__sub__categories__item__link">${category}</a>
        </li>
      `;
      newCategories += categoryElement;
    }
    const categoriesElement = document.getElementsByClassName(`menu__sub__categories__items--${category}`)[0];
    categoriesElement.innerHTML = newCategories;
  });
}

function showSubmenu() {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "block";

  populateCategories('top');
  populateCategories('additional');
}

function hideSubmenu() {
  const submenu = document.getElementsByClassName("menu__sub")[0];
  submenu.style.display = "none";
}

let active = null;

function onMenuItemMouseEnter(item) {
  if (active) {
    active.classList.remove("menu__main__item--active");
  }
  active = item;
  item.classList.add("menu__main__item--active");
  showSubmenu();
}

const menuItems = document.getElementsByClassName("menu__main__item");
for (const menuItem of menuItems) {
  menuItem.onmouseenter = () => onMenuItemMouseEnter(menuItem)
}

const menu = document.getElementsByClassName("menu")[0];
menu.onmouseleave = hideSubmenu;

// Server

function getCategories(data) {
  if (data.category == 'top') {
    return [
      'Server apple',
      'Server banana',
      'Server pear',
      'Server orange'
    ];
  }
  if (data.category == 'additional') {
    return [
      'Server square',
      'Server circle',
      'Server oval',
      'Server diamond'
    ];
  }
  return [];
}

const endpoints = {
  "/categories": {
    "get": getCategories
  }
}

function getFunction(url, data, callback) {
  const domain = url.substring(0, url.indexOf("/"));
  const endpoint = url.substring(url.indexOf("/"), url.length);

  callback(endpoints[endpoint]["get"](data));
}

const api = {
  get: getFunction
};