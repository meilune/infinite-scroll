const apiKey = "K8gxLQHve5ov39W9OO_7_zkWoB8584RR0hUjoayCfDE";
let count = 5; //initial count to load the website faster, set to 30 later in the code
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const addImage = document.getElementById("new-image")
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const hideLoader = () => {
    loader.hidden = true;
};

const showLoader = () => {
    loader.hidden = false;
};

function imageLoaded() {
    imagesLoaded ++;
    if (imagesLoaded === totalImages) {
        ready = true;
        hideLoader();
        count = 30;
    }
}

//display photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    //Run function for objects array
    photosArray.forEach((photo) => {
        //Create a link to Unsplash
        const item = document.createElement("a");
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        //Create image element
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        if (photo.alt_description !== null) {
                img.setAttribute("alt", photo.alt_description);
                img.setAttribute("title", photo.alt_description);
            }
        //Event Listener
        img.addEventListener("load", imageLoaded());
        
        //Put img inside a, then put inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//get images
getImages()
.catch(error => {
    console.log(error);
});

async function getImages() {
    showLoader();
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
    hideLoader();
}

//Scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImages();
    }
})
