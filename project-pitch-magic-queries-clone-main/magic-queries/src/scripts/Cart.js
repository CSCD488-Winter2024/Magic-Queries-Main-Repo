
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

// remove card from cart
function removeCard(cardName) {
    const cart = getCart();
    const newCart = cart.filter(card => card.name !== cardName);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    displayCart();
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

        cardDiv.style.width = '20%';
        cardDiv.style.margin = '10px';
        cardDiv.style.padding = '10px';
        cardDiv.style.display = 'inline-block';

        // add remove button with tailwind styling
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('border', 'border-red-500', 'text-red-500', 'rounded-md', 'px-4', 'py-2', 'm-2');
        removeButton.classList.add('remove');
        removeButton.addEventListener('click', () => removeCard(card.name));
        cardDiv.appendChild(removeButton);

        cartContainer.appendChild(cardDiv);
        totalPrice += card.price * card.quantity;
    });

    // round the total price to 2 decimal places
    totalPrice = Math.round(totalPrice * 100) / 100;

    // add total price to the cart and style it with tailwind
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('total-price');
    totalPriceDiv.innerHTML = `<h3>Total Price: $${totalPrice}</h3>`;
    // add border to the total price div using tailwind
    totalPriceDiv.classList.add('border', 'border-green-500', 'text-green-500', 'rounded-md', 'px-4', 'py-2', 'm-2');
    cartContainer.appendChild(totalPriceDiv);
}

displayCart();