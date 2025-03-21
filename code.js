const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const offScreenMenu = document.querySelector(".off-screen-menu");
menuOpen = false;

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = "flex";
        menuOpen = false;
    } else if (window.innerWidth <= 768 && menuOpen === false) {
        navLinks.style.display = "none";
    }
});

// Only happens when window.innerWidth <= 768px
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    offScreenMenu.classList.toggle("active");

    if (menuOpen === false) {
        menuOpen = true;
    } else if (menuOpen === true) {
        navLinks.style.display = "none";
        menuOpen = false;
    }
});
