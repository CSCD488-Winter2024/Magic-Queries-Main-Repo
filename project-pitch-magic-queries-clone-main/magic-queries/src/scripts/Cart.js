
class cards {
    constructor(name, quantity, picURL, price) {
        this.name = name;
        this.quantity = quantity;
        this.picURL = picURL;
        this.price = price;
    }
}

// get cart info from session storage
function getCart() {
    return JSON.parse(sessionStorage.getItem('cart')) || [];
}

// display cart info
function displayCart() {
    const cart = getCart();
    console.log(cart);
    const cartContainer = document.getElementById('cart-container');
    var totalPrice = 0;

    cartContainer.innerHTML = '';
    cart.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `
            <img src="${card.picURL}" alt="${card.name}">
            <h3>${card.name}</h3>
            <p>Price: $${card.price}</p>
            <p>Quantity: ${card.quantity}</p>
        `;

        cartContainer.appendChild(cardDiv);
        totalPrice += card.price * card.quantity;
    });

    // round the total price to 2 decimal places
    totalPrice = Math.round(totalPrice * 100) / 100;

    // add total price to the cart
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('total-price');
    totalPriceDiv.innerHTML = `<h3>Total Price: $${totalPrice}</h3>`;
    cartContainer.appendChild(totalPriceDiv);
}

displayCart();