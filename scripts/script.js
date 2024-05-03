/////////////////// Spotlight Mouse
let root = document.documentElement;

root.addEventListener("mousemove", e => {
  root.style.setProperty('--mouse-x', (e.clientX - 450) + "px");
  root.style.setProperty('--mouse-y', (e.clientY - 440 ) + "px");
});
////////////////// Spotlight Mouse End 


///////////////// Dark Mode / Theme Toggle 

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.contains("light-theme")
    ? enableDarkMode()
    : enableLightMode();
});

function enableDarkMode() {
  document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  themeToggle.setAttribute("aria-label", "Switch to light theme");
}

function enableLightMode() {
  document.body.classList.remove("dark-theme");
  document.body.classList.add("light-theme");
  themeToggle.setAttribute("aria-label", "Switch to dark theme");
}

function setThemePreference() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    enableDarkMode();
    return;
  }
  enableLightMode();
}

document.onload = setThemePreference();

/////////////// Dark Mode End 


///////////////////
/////////////// Highlight Menu Item WIP!!!

const navList = document.getElementById("navbar__list");
// const items = ["About", "Education", "Section 3", "Projects"];
const items = ["About", "Education", "Projects"];
const topMenu = document.getElementById("navbar__list");
let lastId;

//Build the nav
items.forEach((item, i) => {
  const el = document.createElement("a");
  el.innerText = item;
  el.classList.add("menu-items");
  el.setAttribute("id", `menu-${i + 1}`);
  el.href = `#section${i + 1}`;
  //navList.appendChild(el);

  const li = document.createElement("li");
  li.classList.add("menu-list");
  li.appendChild(el);
  li.setAttribute("id", `${i + 1}`);
  // Append the list item to the list
  li.appendChild(el);
  navList.appendChild(li);
});

//Make Nav Active when Clicked and scrolls down to section
document.addEventListener("click", function(event) {
  let active = document.querySelector(".menu-list.active");
  if (active) active.classList.remove("active");
  if (event.target.classList.contains("menu-list")) {
    event.target.classList.add("active");
    window.location.href = "#section" + event.target.id -500;
  }
});

const topMenuHeight = topMenu.offsetTop - 100; //Zoom stuff for highlight nav
const menuItems = document.querySelectorAll(".menu-list");
const scrollItems = document.querySelectorAll("section");

// Bind to scroll
window.addEventListener("scroll", function() {
  // Get container scroll position
  const mainHeroHeight = document.querySelector(".main__hero").offsetTop;
  console.log(mainHeroHeight);
  let fromTop = window.pageYOffset + topMenuHeight + mainHeroHeight;
  // Get id of current scroll item
  let cur = [];

  [...scrollItems].map(function(item) {
    //debugger;
    if (item.offsetTop < fromTop) {
      cur.push(item);
    }
  });

  // Get the id of the current element
  //debugger;
  cur = cur[cur.length - 1];
  let id = cur ? cur.id : "";

  if (lastId !== id) {
    lastId = id;

    menuItems.forEach(function(elem, index) {
      elem.classList.remove("active");
      // Look at the child "a" tags and try to find the one for our section
      const filteredItems = [...menuItems].filter(elem => elem.children[0].getAttribute("href") === `#${id}`);
      filteredItems[0].classList.add("active");
    });
  }
});



/////////////// Highlight Menu Item END