const products = [
    { id: 1, title: "Hydrating Water", price: 199, image: "images.jpeg" },
    { id: 2, title: "Rosemary", price: 99, image: "images1.jpeg" },
    { id: 3, title: "Sunscreen", price: 299, image: "images2.jpeg" },
    { id: 4, title: "Dark Circles Remover", price: 149, image: "images3.jpeg" },
    { id: 5, title: "Rong Beauty", price: 249, image: "images4.jpeg" },
    { id: 6, title: "Rice Water", price: 189, image: "images5.jpeg" },
];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}">
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    let total = 0;

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${product.title}</h4>
            <img src="${product.image}" alt="${product.title}">
            <p>Price: ₹${product.price}</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartDiv.appendChild(cartItem);
        total += product.price;
    });

    document.getElementById('total').innerText = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add products to your cart before checking out.");
        return;
    }
    alert("Thank you for your purchase! Your order has been placed.");
    cart = []; // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Initial load
displayProducts();
updateCart();