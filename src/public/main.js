const { domainToUnicode } = require("url");

const products = [
  {
    id: 1,
    title: "Laptop Gamer",
    price: 849.99,
    image:
      "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Audifonos Hi-Res",
    price: 769.99,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Conjunto Adidas",
    price: 999.99,
    image:
      "https://images.unsplash.com/photo-1540254597053-3901b858d40f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Conjunto Champions",
    price: 1150.99,
    image:
      "https://images.unsplash.com/photo-1542321103-f277f1befb3c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Tenis Nike",
    price: 2599.99,
    image:
      "https://images.unsplash.com/photo-1698591020373-6a183ba43308?q=80&w=1580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "Tenis Adidas",
    price: 2155.99,
    image:
      "https://images.unsplash.com/photo-1674487887797-3b602633255b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    title: "Playera Nike",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1523647341782-d761bce0004c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxheWVyYSUyMG5pa2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 8,
    title: "Pantalon Vans",
    price: 679.99,
    image:
      "https://images.unsplash.com/photo-1517466121016-3f7e7107c756?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFudGFsb24lMjB2YW5zfGVufDB8fDB8fHww",
  },
];

//obtener lista de productos y elementos
const productlist = document.getElementById("productList");
const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartToltal");

// Tienda Cart Items en local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Render Products on Page
function renderProducts() {
    productlist.innerHTML = products.map((product) => `
        <div class="product">
          <img src="${product.image}" alt="" class="product-img">
          <div class="product-info">
            <h2 class="product-title">
            </h2>
              <p class="product-price"></p>
              <a class="add-to-cart">Añadir a Carrito</a>
          </div>
        </div>
        `
    )
    .join("");
}
renderProducts();