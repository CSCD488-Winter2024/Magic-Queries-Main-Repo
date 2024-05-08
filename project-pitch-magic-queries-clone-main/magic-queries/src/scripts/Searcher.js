const apiUrl = 'https://api.scryfall.com'; // Base URL of the Scryfall API
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, where, query, getDocs, collection, or, and, limit, startAfter } from "firebase/firestore";

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCAVRElz4RmMuQD3-RQ5Ttd1w_h8MTStAc",
  authDomain: "magicproject-77014.firebaseapp.com",
  projectId: "magicproject-77014",
  storageBucket: "magicproject-77014.appspot.com",
  messagingSenderId: "1023897851903",
  appId: "1:1023897851903:web:bbcd8bdf3e81c0ac82f9ca",
})

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cardContainer = document.getElementById('cardContainer');

function fetchMagicCards() {
  // get cards from the FireBase database
  const firestore = getFirestore();
  // get the search info from the url
  const urlParams = new URLSearchParams(window.location.search);
  const capitalized = urlParams.get('name') === null ? "" : urlParams.get('name').charAt(0).toUpperCase() + urlParams.get('name').slice(1);
  const name = urlParams.get('name') === null ? "" : urlParams.get('name');

  const namePart = urlParams.get('name') === null ? "" : or(and(where('name', '>=', capitalized), where('name', '<=', capitalized + '\uf8ff')), where('nameArray', 'array-contains-any', name.split(' ')));
  const rarityPart = urlParams.get('rarity') === null ? "" : where('rarity', '==', urlParams.get('rarity'));
  const colorPart = urlParams.get('color') === null ? "" : where('color', '==', urlParams.get('color'));
  const typePart = urlParams.get('type') === null ? "" : where('type', '==', urlParams.get('type'));
  const setPart = urlParams.get('set') === null ? "" : where('set', '==', urlParams.get('set'));
  const pagePart = urlParams.get('page') === null ? 0 : parseInt(urlParams.get('page'));

  const queryParts = [namePart, rarityPart, colorPart, typePart, setPart].filter(part => part !== "");

  // if query is empty, add a default query, that fetches all cards that start with A
  if (queryParts.length === 0) {
    queryParts.push(where('name', '>=', 'A'), where('name', '<=', 'A\uf8ff'));
  }

  const myQuery = query(collection(firestore, 'MagicCards'), and(...queryParts), limit(10));

  // if the query matches the previous query, don't fetch again
  if (sessionStorage.getItem('searchQuery') === JSON.stringify(queryParts)) {
    console.log("Query matches previous query");
    console.log("Getting cards from session storage");
    displayCards();
    return;
  }

  var cardList = [];
  getDocs(myQuery).then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.data());
      cardList.push(doc.data());
    });
    console.log("Done fetching cards from firebase");
    // store the search in session storage
    sessionStorage.setItem('search', JSON.stringify(cardList));
    sessionStorage.setItem('searchQuery', JSON.stringify(queryParts));
    displayCards();
  });
}

function displayCards() {
  cardContainer.innerHTML = ''; // Clear previous search results
  // get the cards from session storage
  const cards = JSON.parse(sessionStorage.getItem('search'));
  var cardIndex = 0;
  // create a grid of cards with a column of 3 cards
  cards.forEach(card => {
    // Create an image element for the card
    const imgElement = document.createElement('img');
    const cardNormalPicURL = card.picURL.replace('/png', '/normal').replace('.png', '.jpg');

    // create a grid of cards with a column of 3 cards
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    // limit the size of the card container
    cardElement.style.width = '20%';
    cardElement.style.margin = '10px';
    cardElement.style.padding = '10px';
    cardElement.style.display = 'inline-block';

    imgElement.src = cardNormalPicURL;
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
    // add border to the button using tailwind
    addToCartButton.classList.add('border', 'border-blue-500', 'text-blue-500', 'rounded-md', 'px-4', 'py-2', 'm-2');
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.addEventListener('click', event => {
      event.stopPropagation(); // Prevent the click event from bubbling to the card element
      handleAddToCartClick(card);
    });

    cardElement.appendChild(imgElement);
    cardElement.appendChild(addToCartButton);
    cardContainer.appendChild(cardElement);

    cardIndex++;
  });

}

async function handleAddToCartClick(card) {
  // holds needed card info for the cart
  class cardInfo {
    constructor(name, quantity, picURL, price) {
      this.name = name;
      this.quantity = quantity;
      this.picURL = picURL;
      this.price = price;
    }
  }
  const cardToSave = new cardInfo(card.name, 1, card.picURL, card.price);

  // append the card to the session storage
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart.push(cardToSave);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  console.log('Added to cart:', card.name);
}

searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();
  // add search pramas to the URL and the color blue
  const url = new URL(window.location.href);
  url.searchParams.set('name', searchTerm);
  //url.searchParams.set('color', 'U');
  window.history.pushState({}, '', url);
  if (searchTerm) {
    fetchMagicCards();
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

// Check if there is a search query in the URL
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('name');
if (searchQuery) {
  searchInput.value = searchQuery;
  searchButton.click();
} else {
  fetchMagicCards();
}
