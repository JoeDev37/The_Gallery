const accessKey = 'O6VbbEh8sPGpF0Wrh_Ojc79AkVhno1hxJKqSNzsbyZI';

const fromEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResults = document.getElementById('search-results'); // Fix: Use getElementById
const showMore = document.getElementById('show-more');

let inputData = '';
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; // Fix: Add '&' between query and client_id

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = '';
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small; // Fix: Correct the property name
        image.alt = result.alt_description; // Fix: Correct the property name
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description; // Fix: Correct the property name

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page <= data.total_pages) { // Fix: Check if there are more pages to show
        showMore.style.display = 'block';
    } else {
        showMore.style.display = 'none';
    }
}

fromEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener('click', () => {
    searchImages();
});
