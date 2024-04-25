const apiUrl = 'https://api.scryfall.com'; // Base URL of the Scryfall API

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cardContainer = document.getElementById('cardContainer');

async function fetchMagicCards(cardName) {
  try {
    const response = await fetch(`${apiUrl}/cards/search?q=${cardName}&format=image`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json(); // Get JSON data from the response
    return data.data; // Return the array of cards from the data
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array if there's an error
  }
}

function displayCards(cards) {
  cardContainer.innerHTML = ''; // Clear previous search results
  cards.forEach(card => {
    // Create a card element for each card
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    // Create an image element for the card
    const imgElement = document.createElement('img');
    imgElement.src = card.image_uris.normal;
    imgElement.alt = card.name; // Set alt attribute for accessibility
  
    // Add click event listener to open a new window with detailed information
    // Right now this doesn't do anything, but we will implement it later
    cardElement.addEventListener('click', () => {
      const newItemWindow = window.open(`/item-details/${card.id}`, '_blank');
      newItemWindow.focus();
    });

    // Create "Add to Cart" button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.addEventListener('click', event => {
      event.stopPropagation(); // Prevent the click event from bubbling to the card element
      handleAddToCartClick(card);
    });

    cardElement.appendChild(imgElement);
    cardElement.appendChild(addToCartButton);
    cardContainer.appendChild(cardElement);

  });

}

async function handleAddToCartClick(card) {
  // Will need to implement this logic later
  console.log('Added to cart:', card.name);
}

searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const cards = await fetchMagicCards(searchTerm);
    if (cards.length > 0) {
      displayCards(cards);
    } else {
      console.log('No cards found');
    }
  }
});

searchInput.addEventListener('input', () => {
  // Clear search results if input is empty
  if (!searchInput.value.trim()) {
    cardContainer.innerHTML = '';
  }
});

searchInput.addEventListener("keypress", function (event) { 
   
  if (event.key === 'Enter') { 
      searchButton.click(); 
  } 
}); 
