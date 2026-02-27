// ==========================
// GET ELEMENTS FROM HTML
// ==========================

// Select all product cards
const productCards = document.querySelectorAll(".product-card");

// Select cart container
const cartItems = document.querySelector(".cart-items");

// Select total price element
const totalPriceElement = document.querySelector(".total-price");

// Select modal elements
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal img");
const closeBtn = document.querySelector(".close-btn");

// NEW: Select cart count element in navbar
const cartCountElement = document.querySelector(".cart-count");

// NEW: Create cart counter variable
let cartCount = 0;

// ==========================
// FUNCTION TO UPDATE TOTAL PRICE
// ==========================
function updateTotalPrice() {
  let total = 0;

  const prices = cartItems.querySelectorAll(".cart-item-price");

  prices.forEach(function (priceElement) {
    const priceText = priceElement.innerText.replace("$", "");
    const priceNumber = Number(priceText);

    total = total + priceNumber;
  });

  totalPriceElement.innerText = total;
}

// ==========================
// NEW: FUNCTION TO UPDATE CART COUNT
// ==========================
function updateCartCount() {
  cartCountElement.innerText = cartCount;
}

// ==========================
// ADD PRODUCT TO CART
// ==========================

productCards.forEach(function (card) {
  const addButton = card.querySelector(".add-to-cart");

  addButton.addEventListener("click", function () {
    const name = card.querySelector(".product-title").innerText;

    const price = card.querySelector(".product-price").innerText;

    const imageSrc = card.querySelector("img").src;

    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${imageSrc}" class="cart-item-img">

      <div class="cart-item-info">
        <h4>${name}</h4>
        <p class="cart-item-price">${price}</p>
      </div>

      <button class="remove-btn">Remove</button>
    `;

    cartItems.appendChild(cartItem);

    // NEW: Increase cart count
    cartCount++;

    // NEW: Update navbar count
    updateCartCount();

    const removeButton = cartItem.querySelector(".remove-btn");

    removeButton.addEventListener("click", function () {
      cartItem.remove();

      // NEW: Decrease cart count
      cartCount--;

      // NEW: Update navbar count
      updateCartCount();

      updateTotalPrice();
    });

    updateTotalPrice();
  });
});

// ==========================
// OPEN MODAL WHEN CLICK IMAGE
// ==========================

productCards.forEach(function (card) {
  const img = card.querySelector("img");

  img.addEventListener("click", function () {
    modal.style.display = "flex";

    modalImg.src = img.src;
  });
});

// ==========================
// CLOSE MODAL WITH CLOSE BUTTON
// ==========================

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// ==========================
// CLOSE MODAL WHEN CLICK OUTSIDE IMAGE
// ==========================

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
