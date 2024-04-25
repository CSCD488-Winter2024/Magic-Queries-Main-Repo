const apiUrl = 'https://api.scryfall.com'; // Base URL of the Scryfall API
// import firebase from 'firebase/app';
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

class cardInfo {
    constructor(set, name, color, id, rarity, quantity, picURL, type, price){
        this.set = set;
        this.name = name;
        this.color = color;
        this.id = id;
        this.rarity = rarity;
        this.quantity = quantity;
        this.picURL = picURL;
        this.type = type;
        this.price = price;
    }
}

function writeDataToFirebase(cardList) {
    const firestore = getFirestore();
    // for each card in cardList, write to firebase
    cardList.forEach(card => {
        // create a name array to store parts of the lowercase name
        const nameArray = card.name.toLowerCase().split(' ');

        const docRef = doc(firestore, 'MagicCards/' + card.name + '^' + card.set);
        const docData = {
            // if value is undefined, set it to "N/A"
            name: card.name === undefined ? "N/A" : card.name,
            set: card.set === undefined ? "N/A" : card.set,
            color: card.color === undefined ? "N/A" : card.color,
            id: card.id === undefined ? "N/A" : card.id,
            rarity: card.rarity === undefined ? "N/A" : card.rarity,
            // make quantity a number
            quantity: card.quantity === undefined ? 0 : parseInt(card.quantity),
            picURL: card.picURL === undefined ? "N/A" : card.picURL,
            type: card.type === undefined ? "N/A" : card.type,
            price: card.price === undefined ? "N/A" : card.price,
            nameArray: nameArray
        };
        setDoc(docRef, docData);
    });
}    

// get bulk data from scryfall
function getScryfallBulkData() {
    return fetch(`${apiUrl}/bulk-data`)
    .then(response => response.json())
    .then(data => {
        const allMagicCardsURL = data.data[0].download_uri;
        return fetch(allMagicCardsURL)
        .then(response => response.json())
        .then(data => {
            var cardList = [];
            data.forEach(card => {
                const set = card['set_name'];
                const name = card['name'];
            });
        });
    });
}

// read allMagicCards.json
function readAllMagicCards(excelCardList) {
    fetch('allMagicCards.json')
    .then(response => response.json())
    .then(data => {
        var cardList = [];
        data.forEach(card => {
            // get card info
            const set = card['set_name'];
            const name = card['name'];
            const color = "";
            const id = "";
            const rarity = "";
            const quantity = "";
            // try to get image_uris.png, if not, leave it empty
            try {
                var picURL = card['image_uris']['png'];
            } catch (error) {
                var picURL = "";
            }
            const type = card.type_line;
            const price = card.prices.usd;
            cardList.push(new cardInfo(set, name, color, id, rarity, quantity, picURL, type, price));
        });
        console.log("Read allMagicCards.json successfully.");
        // loop through excelCardList and find the corresponding card in cardList
        const combinedCard = [];
        excelCardList.forEach(excelCard => {
            cardList.forEach(card => {
                if (excelCard.name === card.name && excelCard.set === card.set) {
                    // combine excel and scryfall data
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                    combinedCard.push(new cardInfo(excelCard.set, excelCard.name, excelCard.color, excelCard.id, excelCard.rarity, excelCard.quantity, card.picURL, card.type, card.price));
                    console.log(combinedCard);
                }
            });
        });
        writeDataToFirebase(combinedCard);
    });
}

function readExcelFile(fileURL) {
    fetch(fileURL)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        var workbook = XLSX.read(buffer, { type: 'array' });

        // Assuming you have only one sheet in your Excel file
        var sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the sheet to JSON
        var jsonData = XLSX.utils.sheet_to_json(sheet);

        //console.log(jsonData);

        // push data into cardInfo object
        var cardList = [];
        jsonData.forEach(card => {
        // get card info
        const set = card['Set'];
        const name = card['Name'];
        const color = card['Color'];
        const id = card['#'];
        const rarity = card['Rarity'];
        const quantity = card['Quantity'];
        const picURL = card['PicURL'];
        const type = card['Type'];
        const price = card['Price'];

        // create card object
        const cardObj = new cardInfo(set, name, color, id, rarity, quantity, picURL, type, price);
        cardList.push(cardObj);
        });
        console.log("Read excel file successfully.");
        readAllMagicCards(cardList);
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });
}

var lastDoc = null;
var prevQuery = null;
var prevPage = null;

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

    getDocs(myQuery).then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data());
            lastDoc = doc;
        });
        console.log("Search complete.");
    });
}

//getDatabaseCards();

//readExcelFile('Magicplaceholder.xlsx');
//searchDatabase('of', '', '', '', '', '');
