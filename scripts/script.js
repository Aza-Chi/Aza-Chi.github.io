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



/////////////// Highlight Menu Item WIP!!!

const navMenu = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const items = ["About", "Education", "Projects", "Section 4"];
let lastId;
let last_known_scroll_position = 0;
let ticking = false;

//Build the nav
items.forEach((item, i) => {
  const li = document.createElement("li");
  const el = document.createElement("a");
  el.innerText = item;
  el.classList.add("menu-items");
  el.setAttribute("id", `menu-${i + 1}`);
  el.href = `#section${i + 1}`;

  el.addEventListener("click", function(e) {
    const href = e.target.getAttribute("href"),
      offsetTop = href === "#" ? 0 : e.target.offsetTop - topMenuHeight + 1;
    const scrollOptions = {
      scrollIntoView: true,
      behavior: "smooth"
    };
    e.target.scrollIntoView(scrollOptions);
    e.preventDefault();
  });

  navList.appendChild(li);
  li.appendChild(el);
});

const topMenu = document.getElementById("navbar__list");
const topMenuHeight = topMenu.offsetHeight + 1;
const menuItems = document.querySelectorAll(".menu-items");
const scrollItems = document.querySelectorAll(".sec");

//Make Nav Active when Clicked and scrolls down to section
document.addEventListener("click", function(event) {
  let active = document.querySelector(".active");
  if (active) {
    active.classList.remove("active");
  }
  if (event.target.classList.contains("menu-items")) {
    event.target.classList.add("active");
  }
});

// Bind to scroll
window.addEventListener("scroll", function() {
  // Get container scroll position
  const container = document.querySelector(".container");
  let fromTop = window.pageYOffset + topMenuHeight + 40;

  // Get id of current scroll item
  let cur = [];

  [...scrollItems].map(function(item) {
    if (item.offsetTop < fromTop) {
      cur.push(item);
    }
  });

  // Get the id of the current element
  cur = cur[cur.length - 1];
  let id = cur ? cur.id : "";

  if (lastId !== id) {
    lastId = id;

    menuItems.forEach(function(elem, index) {
      elem.classList.remove("active");
      const filteredItems = [...menuItems].filter(elem => elem.getAttribute("href") === `#${id}`);
      filteredItems[0].classList.add("active");
    });
  }
});

/////////////// Highlight Menu Item END