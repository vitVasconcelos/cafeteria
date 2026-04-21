const cart = document.getElementById("cart");
const openCart = document.getElementById("open");
const closeCart = document.getElementById("close");

openCart.addEventListener("click", () => {
  cart.style.display = "block";
});

closeCart.addEventListener("click", () => {
  cart.style.display = "none";
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("ativo");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("ativo");
    }
  });
});