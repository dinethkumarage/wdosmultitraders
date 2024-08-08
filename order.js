document.addEventListener('DOMContentLoaded', function () {
    const paymentMethodSelect = document.getElementById('payment-method');
    const cashDetails = document.getElementById('cash-details');
    const cardDetails = document.getElementById('card-details');

    paymentMethodSelect.addEventListener('change', function () {
        if (paymentMethodSelect.value === 'cash') {
            cashDetails.style.display = 'block';
            cardDetails.style.display = 'none';
        } else if (paymentMethodSelect.value === 'card') {
            cashDetails.style.display = 'none';
            cardDetails.style.display = 'block';
        } else {
            cashDetails.style.display = 'none';
            cardDetails.style.display = 'none';
        }
    });

    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Thank you for ordering!');
        paymentForm.reset();
        cashDetails.style.display = 'none';
        cardDetails.style.display = 'none';
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    const orderTable = document.getElementById('order-table').querySelector('tbody');

    cartData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.total}</td>
        `;
        orderTable.appendChild(row);
    });
});






