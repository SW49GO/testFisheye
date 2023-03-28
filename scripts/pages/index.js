console.log('index.js');

async function getJsonDataPhotographers() {
  console.log('index.js ->getJsonDataPhotographers');
  return await fetch('../../data/photographers.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
//Pour page photograph.html
// ● Vous devrez réutiliser la fonction photographerFactory que vous
// aviez étendu à l'étape 3 pour afficher le contenu de votre page, ainsi
// que votre fonction permettant d'utiliser fetch.
// ● Vous afficherez également les réalisations des photographes. Sur le
// modèle de la factory photographerFactory, vous devrez également
// créer une factory pour Media.
// ● N'oubliez pas le petit encart qui affiche le tarif journalier du ou de la
// photographe affiché.
/**
 * Function to get Object of Identity of one Photograph
 * @param {object} photographers
 * @param {string} id
 * @returns
 */
async function getPhotograperById(photographers, id) {
  console.log('index.js->getPhotograperById(photographers, id)');
  const personalPhotographer = photographers.filter(
    (user) => user.id === parseInt(id)
  );
  console.log(personalPhotographer);
  return personalPhotographer;
}
/**
 * Function to get all Object Media for one Photograph
 * @param {object} media
 * @param {string} id
 * @returns
 */
async function getMediaById(media, id) {
  console.log('index.js->getMediaById(media,id)');
  const mediaPhotographer = media.filter(
    (medias) => medias.photographerId === parseInt(id)
  );
  console.log(mediaPhotographer);
  return mediaPhotographer;
}
async function getMediaFilter(media, id, selectFilter) {
  const medias = await getMediaById(media, id);
  console.log(medias);
  let mediaFilter;
  switch (selectFilter) {
    case '1':
      mediaFilter = medias.sort((a, b) => b.likes - a.likes);
      break;
    case '2':
      mediaFilter = medias.sort((a, b) => b.dates - a.dates);
      break;
    case '3':
      mediaFilter = medias.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      mediaFilter = medias;
  }
  console.log(mediaFilter);
  return mediaFilter;
}
/**
 * Function to get the Name of one Photograph
 * @param {object} photographers
 * @param {string} id
 * @returns
 */
async function getNamePhotographer(photographers, id) {
  console.log('index.js->getNamePhotopher(photographers,id)');
  const photographerName = photographers
    .filter((photographer) => photographer.id === parseInt(id))
    .map((photographer) => photographer.name);
  return photographerName;
}
/**
 * Function to display each article of one photograph for the page index.html
 * construct from photographerFactory -> getUserCardDOM
 * @param {object} photographers
 */
async function displayDataIndex(photographers) {
  console.log('index.js->displayDataIndex');
  const photographersSection = document.querySelector('.photographer_section');
  photographers.forEach((photographer) => {
    const photographerData = { photographer };
    const photographerModel = photographerFactory(photographerData);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Function to display an article for one photographer for the page photographer.html
 * construct from photographerFactory -> getPagePhotographerDOM
 * @param {object} media
 * @param {object} photographers
 */
async function displayDataPhotographer(media, photographers, idPhotographer) {
  console.log('index.js->displayDataPhotographer');

  const mediaSection = document.querySelector('.photograph-header');
  mediaSection.innerHTML = '';
  const personalPhotographer = await getPhotograperById(
    photographers,
    idPhotographer
  );

  console.log(personalPhotographer);

  const numbLikes = media
    .filter((media) => media.photographerId === parseInt(idPhotographer))
    .map((listLike) => listLike.likes)
    .reduce((acc, value) => acc + value);

  console.log(typeof numbLikes);

  const personalData = { photographer: personalPhotographer[0] };
  const pagePhotgrapher = photographerFactory(personalData);
  const pageCardDOM = pagePhotgrapher.getPagePhotographerDOM(numbLikes);
  mediaSection.appendChild(pageCardDOM);
}

/**
 * Function to display the medias of photographers in photographer.html
 * construct from mediaFactory -> getMediaCardDOM
 * @param {object} media
 * @param {object} photographers
 * @param {string} idPhotographer
 * @param {string} selectDisplayOption->popularite:1, date:2, titre:3
 */
async function displayMedia(
  media,
  photographers,
  idPhotographer,
  selectFilter
) {
  const mediaPhotographer = await getMediaById(
    media,
    idPhotographer,
    selectFilter
  );
  console.log(mediaPhotographer);
  console.log('index.js->displaymedia');
  const mediaImage = document.querySelector('.list-images');
  mediaImage.innerHTML = '';
  const personalPhotographer = await getPhotograperById(
    photographers,
    idPhotographer
  );

  const newMedia = await getMediaFilter(
    mediaPhotographer,
    idPhotographer,
    selectFilter
  );
  console.log(newMedia);
  const photographerData = {
    photographer: personalPhotographer,
    media: newMedia,
  };
  const mediaModel = mediaFactory(photographerData);
  const mediaCardDOM = mediaModel.getMediaCardDOM();
  mediaImage.appendChild(mediaCardDOM);
}

/**
 * Function to initialize all display
 * @param {string} selectDisplayOption->popularite:1, date:2, titre:3
 */
async function init(selectFilter = '') {
  console.log('index.js->init');
  const { media, photographers } = await getJsonDataPhotographers();

  if (window.location.href.includes('index.html')) {
    displayDataIndex(photographers);
  }
  if (window.location.href.includes(`photographer.html`)) {
    const urlParams = new URLSearchParams(window.location.search);
    const idPhotographer = urlParams.get('identify');

    getPhotograperById(photographers, idPhotographer);
    getMediaById(media, idPhotographer);
    displayDataPhotographer(media, photographers, idPhotographer);
    displayMedia(media, photographers, idPhotographer, selectFilter);
    const name = await getNamePhotographer(photographers, idPhotographer);
    getPhotographerName(name);
  }
}
init();
