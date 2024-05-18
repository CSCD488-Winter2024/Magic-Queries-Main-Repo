
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
        removeButton.classList.add('border', 'border-red-500', 'text-red-500', 'rounded-md', 'px-4', 'py-2', 'm-2', 'hover:bg-red-100');
        removeButton.classList.add('remove');
        removeButton.addEventListener('click', () => removeCard(card.name));
        cardDiv.appendChild(removeButton);

        cartContainer.appendChild(cardDiv);
        totalPrice += card.price * card.quantity;

        // add decrease button with tailwind styling
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('border', 'border-blue-500', 'text-blue-500', 'rounded-md', 'px-4', 'py-2', 'm-2', 'hover:bg-blue-100');
        decreaseButton.classList.add('decrease');
        decreaseButton.addEventListener('click', () => {
            if (card.quantity <= 1) {
                removeCard(card.name);
                return;
            }
            card.quantity--;
            sessionStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        });
        cardDiv.appendChild(decreaseButton);


        // add increase button
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('border', 'border-blue-500', 'text-blue-500', 'rounded-md', 'px-4', 'py-2', 'm-2', 'hover:bg-blue-100');
        increaseButton.classList.add('increase');
        increaseButton.addEventListener('click', () => {
            if (card.quantity >= card.quantityInStock) return;
            card.quantity++;
            sessionStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        });
        cardDiv.appendChild(increaseButton);

    });

    // round the total price to 2 decimal places
    totalPrice = Math.round(totalPrice * 100) / 100;

    // add total price to the cart and style it with tailwind
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('total-price');
    totalPriceDiv.innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;
    // add border to the total price div using tailwind
    totalPriceDiv.classList.add('border', 'border-green-800', 'text-green-800', 'rounded-md', 'px-4', 'py-2', 'm-2', 'bg-green-100');
    // move total price to the right of the cart
    totalPriceDiv.style.float = 'left';
    cartContainer.appendChild(totalPriceDiv);

    //add a checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'Checkout';
    checkoutButton.classList.add('border', 'border-blue-500', 'text-blue-500', 'rounded-md', 'px-4', 'py-2', 'm-2', 'hover:bg-blue-100');
    checkoutButton.classList.add('checkout');
    checkoutButton.addEventListener('click', () => alert('Checkout clicked'));
    cartContainer.appendChild(checkoutButton);

    //move checkout button to the right of the cart
    checkoutButton.style.float = 'right';

}

displayCart();