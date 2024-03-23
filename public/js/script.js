const navIcon = window.document.querySelector(".nav-icon"); 
const navList = window.document.querySelector(".nav-list"); 


navIcon.addEventListener("click", () => {
    navList.classList.toggle("active");
});