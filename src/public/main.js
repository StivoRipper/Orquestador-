const products = [
  {
    id: 1,
    title: "Laptop Gamer",
    price: 849.99,
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwZ2FtZXJ8ZW58MHx8MHx8fDI%3D",
  },
  {
    id: 2,
    title: "Audifonos Hi-Res",
    price: 769.99,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXVkaWZvbm9zfGVufDB8fDB8fHwy",
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
const productList = document.getElementById("productList");
const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");

// Tienda Cart Items en local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Render Products on Page
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
      <div class="product">
      <img src="${product.image}" alt="${product.title}" class="product-img">
      <div class="product-info">
        <h2 class="product-title">${product.title}</h2>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <a class="add-to-cart" data-id="${product.id}">Añadir a Carrito</a>
      </div>
    </div>
        `
    )
    .join("");

  // añadir al carro
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCart);
  }
}

//añadir un producto
function addToCart(event) {
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => product.id === productID);

  if (product) {
    //si el producto esta realmente en carro
    const exixtingItem = cart.find((item) => item.id === product.id);

    if (exixtingItem) {
      exixtingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    renderCartItems();
    saveToLocalStorage();
  }
}

// guardar en la tienda
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Renderizar productos a carrito
function renderCartItems() {
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" />
      <div class="cart-item-info">
        <h2 class="cart-item-title">${item.title}</h2>
        <input 
          class="cart-item-quantity" type="number" 
          name="" 
          min="1" 
          value="${item.quantity}" 
          data-id="${item.id}"
        />
      </div>
      <h2 class="cart-item-price">$${item.price}</h2>
      <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
    </div>
    `
    )
    .join("");
}

//checar si esta sobre la pagina de carrito

if (window.location.pathname.includes("cart.html")) {
  renderCartItems();
} else {
  renderProducts();
}

renderProducts();
renderCartItems();
