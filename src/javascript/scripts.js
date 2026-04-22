const cart = document.getElementById("cart");
const openCart = document.getElementById("open");
const closeCart = document.getElementById("close");

const cartTitle = document.querySelector(".cart h2");
const cartItemsContainer = document.querySelector(".cart-items");
const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-total");
const emptyCartImg = document.querySelector("#empty-cart");
const emptyCartMsg = document.querySelector(".cart p");
const confirmBtn = document.querySelector(".confirm-btn");
const cartBadge = document.querySelector("#cart-badge");

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

//carrinho
let carrinho = [];

openCart.addEventListener("click", () => {
  cart.style.display = "block";
});

closeCart.addEventListener("click", () => {
  cart.style.display = "none";
});


function atualizarCarrinho() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (carrinho.length > 0) {
    cartBadge.style.display = "flex";
    cartBadge.textContent = carrinho.length;
  } else {
    cartBadge.style.display = "none";
  }

  if (carrinho.length === 0) {
    emptyCartImg.style.display = "block";
    emptyCartMsg.style.display = "block";
    cartFooter.style.display = "none";
    cartTitle.textContent = "Itens no carrinho (0)";
    return;
  }

  emptyCartImg.style.display = "none";
  emptyCartMsg.style.display = "none";
  cartFooter.style.display = "block";
  cartTitle.textContent = `Itens no carrinho (${carrinho.length})`;

  carrinho.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Excluir";

    deleteBtn.addEventListener("click", () => {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    });

    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} `;
    li.appendChild(deleteBtn);
    cartItemsContainer.appendChild(li);
  });


  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const productContainer = button.closest(".box");
    const productName = productContainer.querySelector("h3").textContent;

    const precoTexto =
      productContainer.querySelector(".preco").childNodes[0].textContent;

    const productPrice = parseFloat(
      precoTexto.replace("R$", "").replace(",", ".").trim()
    );

    carrinho.push({
      name: productName,
      price: productPrice
    });

    atualizarCarrinho();
  });
});

confirmBtn.addEventListener("click", () => {
  if (carrinho.length === 0) return;

  alert("Agradecemos seu pedido!");

  carrinho = [];
  atualizarCarrinho();
  cart.style.display = "none";
});