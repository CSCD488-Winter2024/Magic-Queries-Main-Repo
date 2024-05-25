export function autofill() {
    var message = document.getElementById('message');
    // fill in text area with cart info from session storage
    var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    var messageText = '';
    var counter = 0;
    cart.forEach(card => {
        counter++;
        messageText += 'Card ' + counter + '\n';
        messageText += 'Name: ' + card.name + '\n';
        
        // convert color acronym to full color name
        var color = '';
        const colorArray = card.color.split('');
        colorArray.forEach(c => {
            switch (c) {
                case 'W':
                    color += 'White ';
                    break;
                case 'U':
                    color += 'Blue ';
                    break;
                case 'B':
                    color += 'Black ';
                    break;
                case 'R':
                    color += 'Red ';
                    break;
                case 'G':
                    color += 'Green ';
                    break;
                default:
                    color += 'Colorless ';
            }
        });

        messageText += 'Color: ' + color + '\n';
        messageText += 'Expansion: ' + card.set + '\n';
        messageText += 'Quantity: ' + card.quantity + '\n\n';
    });
    //remove the last 2 blank lines from messageText
    messageText = messageText.slice(0, -2);

    message.value = messageText;
}