// ==========================
// GET ELEMENTS
// ==========================

const cartItems = document.querySelector(".cart-items");
const totalPriceElement = document.querySelector(".total-price");
const cartCountElement = document.querySelector(".cart-count");

const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-image");
const closeBtn = document.querySelector(".close-btn");

const searchInput = document.querySelector(".search-input");
const categoryFilter = document.querySelector("#category-filter");

let cartCount = 0;

// ==========================
// UPDATE TOTAL PRICE
// ==========================

function updateTotalPrice() {
  let total = 0;

  const prices = document.querySelectorAll(".cart-item-price");

  prices.forEach(function (price) {
    const priceValue = price.textContent.replace("$", "");

    total += Number(priceValue);
  });

  totalPriceElement.textContent = total.toFixed(2);
}

// ==========================
// UPDATE CART COUNT
// ==========================

function updateCartCount() {
  cartCountElement.textContent = cartCount;
}

// ==========================
// ADD TO CART
// ==========================

function addToCart(name, price, image) {
  const cartItem = document.createElement("div");

  cartItem.classList.add("cart-item");

  cartItem.innerHTML = `
  
    <img src="${image}" class="cart-item-img">

    <div>
      <h4>${name}</h4>
      <p class="cart-item-price">$${price}</p>
    </div>

    <button class="remove-btn">Remove</button>
  
  `;

  cartItems.appendChild(cartItem);

  cartCount++;

  updateCartCount();

  updateTotalPrice();

  const removeBtn = cartItem.querySelector(".remove-btn");

  removeBtn.addEventListener("click", function () {
    cartItem.remove();

    cartCount--;

    updateCartCount();

    updateTotalPrice();
  });
}

// ==========================
// MODAL FUNCTIONS
// ==========================

function openModal(imageSrc) {
  modal.style.display = "flex";

  modalImg.src = imageSrc;
}

// close modal with X

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// close modal when click outside

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// ==========================
// FETCH PRODUCTS
// ==========================

fetch("https://fakestoreapi.com/products")
  .then(function (response) {
    return response.json();
  })

  .then(function (products) {
    displayProducts(products);
  })

  .catch(function (error) {
    console.log("Error:", error);
  });

// ==========================
// DISPLAY PRODUCTS
// ==========================

function displayProducts(products) {
  const container = document.querySelector("#product-list");

  container.innerHTML = "";

  products.forEach(function (product) {
    const card = document.createElement("div");

    card.classList.add("product-card");

    card.innerHTML = `
    
      <img src="${product.image}" class="product-image">

      <h3 class="product-title">${product.title}</h3>

      <p class="product-price">$${product.price}</p>

      <p class="product-category" style="display:none">
        ${product.category}
      </p>

      <button class="add-to-cart">Add to Cart</button>
    
    `;

    // add to cart

    const addBtn = card.querySelector(".add-to-cart");

    addBtn.addEventListener("click", function () {
      addToCart(product.title, product.price, product.image);
    });

    // modal

    const img = card.querySelector(".product-image");

    img.addEventListener("click", function () {
      openModal(product.image);
    });

    container.appendChild(card);
  });
}

// ==========================
// SEARCH FUNCTION
// ==========================

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();

  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(function (card) {
    const title = card
      .querySelector(".product-title")
      .textContent.toLowerCase();

    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// ==========================
// FILTER FUNCTION
// ==========================

categoryFilter.addEventListener("change", function () {
  const selectedCategory = categoryFilter.value;

  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach(function (card) {
    const category = card.querySelector(".product-category").textContent;

    if (selectedCategory === "all" || category === selectedCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
