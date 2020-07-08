
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let loadedImage = 0;
let totalImage = 0;
let photosArray = [];

// helper Method

function setAttribute(element,attributes){
    for(const key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}
//check if all image is loaded
function imageLoaded(){
    console.log('Image Loaded');
    loadedImage++;
    if(loadedImage === totalImage)
    {
        ready=true;
        loader.hidden = true;
        console.log('ready=',ready);
        loadedImage=0;
    }

}

function displayPhotos(){

    totalImage = photosArray.length;
    console.log('Total Image',totalImage);
    photosArray.forEach((photo) => {
// create anchor tag
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        setAttribute(item,{
            href:photo.links.html,
            target:'_blank',
        });
//create image tag
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);     
        setAttribute(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });

        img.addEventListener('load',imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);

    });


}
// photos api
const count=30;
const apiKey = 'Us-4gEnCggUOaB7XmLdDBVFED1AQS0n3f7ORbscSbwM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get random photos
async function getRandomPhotos(){

    try{
        const responce = await fetch(apiUrl);
        photosArray = await responce.json();
        displayPhotos();
    }
    catch(error){

    }
}

window.addEventListener('scroll',() => {
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false;
        getRandomPhotos();
    }
});


//load more
getRandomPhotos();