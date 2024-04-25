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

async function fetchMagicCards(cardName) {
  cardContainer.innerHTML = ''; // Clear previous search results
  searchDatabase(cardName, '', '', '', '', '').then((querySnapshot) => {
      // clear previous search results
      cardContainer.innerHTML = '';
      querySnapshot.forEach((card) => {
          // Create a card element for each card
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');

          // Create an image element for the card
          const imgElement = document.createElement('img');
          imgElement.src = card.data().picURL;
          imgElement.alt = card.name; // Set alt attribute for accessibility
          cardElement.appendChild(imgElement);

          cardContainer.appendChild(cardElement);
      });
  });
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

function searchDatabase(name, rarity, color, type, set, page){
    const firestore = getFirestore();
    name = name.toLowerCase();
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    const namePart = name === '' ? '' : or(and(where('name', '>=', capitalized), where('name', '<=', capitalized + '\uf8ff')), where('nameArray', 'array-contains-any', name.split(' ')));
    const rarityPart = rarity === '' ? '' : where('rarity', '==', rarity);
    const colorPart = color === '' ? '' : where('color', '==', color);
    const typePart = type === '' ? '' : where('type', '==', type);
    const setPart = set === '' ? '' : where('set', '==', set);
    const pagePart = page === '' ? '' : startAfter(lastDoc);

    const queryParts = [namePart, rarityPart, colorPart, typePart, setPart, pagePart].filter(part => part !== '');

    var myQuery = query(collection(firestore, 'MagicCards'), and(...queryParts), limit(10));

    return getDocs(myQuery);
}