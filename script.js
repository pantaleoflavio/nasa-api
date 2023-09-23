const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// nasa api
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {

};

function updateDOM() {
    resultsArray.forEach((result) => {
        // card container
        const card = document.createElement('div');
        card.classList.add('card');
        // link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target ='_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'Nasa pic of the day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // card title
        const cardTitle = document.createElement('h3');
        cardBody.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Save text
        const saveText = document.createElement('a');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add to favorites';
        saveText.setAttribute('onClick', `saveFavorite('${result.url}')`);
        // Card text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // Footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = `${copyrightResult}`;
        // Append
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

// get 10 images from nasa api
async function getNasaPics () {
    try {
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        updateDOM();
    } catch (error) {
        // catch errors

    }
};

// add result to favorites
function saveFavorite(itemUrl) {
    // loop through results array to select favorite
    resultsArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            
            // show save confirmation for 2 secs
            saveConfirmed.hidden = false;
            setTimeout(()=> {
                saveConfirmed.hidden = true;
            }, 2000);
            // set favorites in local storage
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }
    });
};

// on load
getNasaPics();
