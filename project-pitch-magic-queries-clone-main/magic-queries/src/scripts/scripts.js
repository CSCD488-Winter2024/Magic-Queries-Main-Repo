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
    cardElement.appendChild(imgElement);

    cardContainer.appendChild(cardElement);
  });
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
