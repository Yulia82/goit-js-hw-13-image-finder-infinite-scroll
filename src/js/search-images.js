import APIServices from './apiService'
import refs from './refs'
import renderGallery from '../templates/gallery-images.hbs'
import lightbox from './lightbox'
import { inform } from './pnotify'
import { errorInfo } from './pnotify'

const getImgUserRequest = new APIServices();

refs.galleryImg.addEventListener('click', onImgCard);
refs.formSearch.addEventListener('submit', onSearch);


function onImgCard(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains("img")) {
        return;
    };
    const largeImg = evt.target.dataset.srclarge;

    lightbox(largeImg);
};

function onSearch(evt) {
    evt.preventDefault();

    getImgUserRequest.searchImg = evt.currentTarget.elements.query.value;
    
    if (getImgUserRequest.searchImg.trim().length == 0) {
        inform('Enter the correct query');
        return;
    };
    
    getImgUserRequest.resetCurrentPage();
    refs.galleryImg.innerHTML = '';

    fetchImg();
};

function fetchImg() {
    getImgUserRequest.getImage().then((images) => {
        if (images.length === 0) {
            inform('Nothing found on your request');
            return;
        };

        imagesOutput(images);
        
    }).catch(error => errorInfo(error));
};


// рисование фото на экране
function imagesOutput(images) {
    refs.galleryImg.insertAdjacentHTML('beforeend', renderGallery(images));
};


// бесконечный скрол (Intersection Observer)
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && getImgUserRequest.searchImg !== '' && getImgUserRequest.currentPage !== 1) {
        fetchImg();
      };
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);