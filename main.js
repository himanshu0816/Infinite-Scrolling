const imageContainer = document.getElementById("image-container");
let ready = false;
let imagesLoaded = 0;
let totalImages = 10;
let photosArray = [];
// Unsplash api
const apiUrl = "https://api.unsplash.com/photos/random/?client_id=RZJH0GBd2uw_YIV6778UAw51c-TlCoW4IrpvbMzCdk4&count=10"


// get photos from unsplash api
async function getphotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    }catch(error){

    }
}

// check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        imagesLoaded =0;
    }
    console.log("imageloaded");

}

// display data in website
function displayPhotos(){
    photosArray.forEach((photos)=>{
        // create img element
        const img = document.createElement("img");
        img.setAttribute("src", photos.urls.regular);
        img.setAttribute("title", photos.alt_description);
        img.addEventListener("load", imageLoaded)
        // put img in parent element
        imageContainer.appendChild(img)
    })
}

// load more photos whenever reach near bottom of page
window.addEventListener("scroll", function scroll(){
    if(window.scrollY >= document.body.offsetHeight - 2000 && ready){
        ready = false;
        getphotos()
        console.log("more images loaded")
    }
})


// on load
getphotos();