document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const favourites = [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartTableBody = document.querySelector('#cart-table tbody');
    const cartTotalElement = document.querySelector('#cart-total');
    const addToFavouritesButton = document.querySelector('#add-to-favourites');
    const applyFavouritesButton = document.querySelector('#apply-favourites');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.parentElement;
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.split(' ')[0]);
            const productQuantity = parseFloat(productCard.querySelector('.product-quantity').value);

            addToCart(productName, productPrice, productQuantity);
        });
    });

    function addToCart(name, price, quantity) {
        const existingProductIndex = cart.findIndex(item => item.name === name);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        updateCartTable();
    }

    function updateCartTable() {
        cartTableBody.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity} KG</td>
                <td>${item.price} LKR/KG</td>
                <td>${(item.price * item.quantity).toFixed(2)} LKR</td>
                <td><button class="remove-from-cart">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });
        cartTotalElement.textContent = `Total: ${total.toFixed(2)} LKR`;

        const removeButtons = cartTableBody.querySelectorAll('.remove-from-cart');
        removeButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCartTable();
            });
        });
    }

    addToFavouritesButton.addEventListener('click', function () {
        localStorage.setItem('favourites', JSON.stringify(cart));
        alert('Favourites saved!');
    });

    applyFavouritesButton.addEventListener('click', function () {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
        if (savedFavourites) {
            savedFavourites.forEach(fav => {
                addToCart(fav.name, fav.price, fav.quantity);
            });
            updateCartTable();
        } else {
            alert('No favourites found!');
        }
    });
});

document.getElementById('proceed-to-payment').addEventListener('click', () => {
    const cartTable = document.getElementById('cart-table').querySelector('tbody');
    const cartRows = cartTable.querySelectorAll('tr');
    const cartData = [];

    cartRows.forEach(row => {
        const product = row.cells[0].innerText;
        const quantity = row.cells[1].innerText;
        const price = row.cells[2].innerText;
        const total = row.cells[3].innerText;
        cartData.push({ product, quantity, price, total });
    });

    localStorage.setItem('cartData', JSON.stringify(cartData));
    window.location.href = 'order.html';
});
