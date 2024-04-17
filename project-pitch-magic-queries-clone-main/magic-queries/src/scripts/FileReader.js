const apiUrl = 'https://api.scryfall.com'; // Base URL of the Scryfall API
// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCAVRElz4RmMuQD3-RQ5Ttd1w_h8MTStAc",
    authDomain: "magicproject-77014.firebaseapp.com",
    projectId: "magicproject-77014",
    storageBucket: "magicproject-77014.appspot.com",
    messagingSenderId: "1023897851903",  
    appId: "1:1023897851903:web:bbcd8bdf3e81c0ac82f9ca",
    databaseURL: "https://magicproject-77014-default-rtdb.firebaseio.com/"
};

class cardInfo {
    constructor(set, name, color, id, rarity, artist, quantity, picURL, type, price){
        this.set = set;
        this.name = name;
        this.color = color;
        this.id = id;
        this.rarity = rarity;
        this.artist = artist;
        this.quantity = quantity;
        this.picURL = picURL;
        this.type = type;
        this.price = price;
    }
}

function writeDataToFirebase(cardList) {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    cardList.forEach(card => {
        var cardListRef = ref(db, 'MagicCards/' + card.set + '/' + card.name);
        set(cardListRef, {
            set: card.set,
            name: card.name,
            color: card.color,
            id: card.id,
            rarity: card.rarity,
            artist: card.artist,
            quantity: card.quantity,
            picURL: card.picURL,
            type: card.type,
            price: card.price
        });
        // exit loop after 10 cards
        if (cardList.indexOf(card) === 10) {
            return;
        }
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
            const artist = "";
            const quantity = "";
            // try to get image_uris.png, if not, leave it empty
            try {
                var picURL = card['image_uris']['png'];
            } catch (error) {
                var picURL = "";
            }
            const type = card.type_line;
            const price = card.prices.usd;
            cardList.push(new cardInfo(set, name, color, id, rarity, artist, quantity, picURL, type, price));
        });
        console.log("Read allMagicCards.json successfully.");
        // loop through excelCardList and find the corresponding card in cardList
        const combinedCard = [];
        excelCardList.forEach(excelCard => {
            cardList.forEach(card => {
                if (excelCard.name === card.name) {
                    // combine excel and scryfall data
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                    combinedCard.push(new cardInfo(excelCard.set, excelCard.name, excelCard.color, excelCard.id, excelCard.rarity, excelCard.artist, excelCard.quantity, card.picURL, card.type, card.price));
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
        const artist = card['Artist'];
        const quantity = card['Quantity'];
        const picURL = card['PicURL'];
        const type = card['Type'];
        const price = card['Price'];

        // create card object
        const cardObj = new cardInfo(set, name, color, id, rarity, artist, quantity, picURL, type, price);
        cardList.push(cardObj);
        });
        console.log("Read excel file successfully.");
        readAllMagicCards(cardList);
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });
}

function getDatabaseCards() {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef = ref(db, 'MagicCards/');
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}

//getDatabaseCards();

//readExcelFile('Magicplaceholder.xlsx');
