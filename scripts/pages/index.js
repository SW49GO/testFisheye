console.log('lancement du fichier index.js');

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
  // console.log(personalPhotographer);
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
  // console.log(mediaPhotographer);
  return mediaPhotographer;
}
async function getMediaFilter(media, id, options) {
  console.log('index.js-> getMediaFilter(media, id, options)');

  const medias = await getMediaById(media, id);
  // console.log(medias);
  let mediaFilter;
  switch (options) {
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
  // console.log(mediaFilter);
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
 * Function to display an article for header photograph for the page photographer.html
 * construct from photographerFactory -> getPagePhotographerDOM
 * @param {object} media
 * @param {object} photographers
 */
async function displayDataPhotographer(media, photographers, idPhotographer) {
  console.log('index.js->displayDataPhotographer');
  const mediaSection = document.querySelector('.photograph-header');
  const personalPhotographer = await getPhotograperById(
    photographers,
    idPhotographer
  );

  // console.log(personalPhotographer);

  const numbLikes = media
    .filter((media) => media.photographerId === parseInt(idPhotographer))
    .map((listLike) => listLike.likes)
    .reduce((acc, value) => acc + value);

  // console.log(typeof numbLikes);

  const personalData = { photographer: personalPhotographer[0] };
  const pagePhotgrapher = photographerFactory(personalData);
  const pageCardDOM = pagePhotgrapher.getPagePhotographerDOM(numbLikes);
  mediaSection.appendChild(pageCardDOM);

  const btnFilter = document.querySelector('.btn-filter');
  console.log(btnFilter);
  btnFilter.addEventListener('click', function () {
    console.log('entrer addEventListener Index');
    displayMenuFilter(btnFilter);
  });
  const selectMenuFilter = document.querySelectorAll('.select-menu-item');
  for (let i = 0; i < selectMenuFilter.length; i++) {
    selectMenuFilter[i].addEventListener('click', function () {
      selectFilter(selectMenuFilter[i], btnFilter);
      const selectedMenuFilter = document.querySelector('.select-menu');
      selectedMenuFilter.classList.remove('show');
    });
  }
}

/**
 * Function to display the medias of photographers in photographer.html
 * construct from mediaFactory -> getMediaCardDOM
 * @param {object} media
 * @param {object} photographers
 * @param {string} idPhotographer
 * @param {string} selectDisplayOption->popularite:1, date:2, titre:3
 */
async function displayMedia(media, photographers, idPhotographer, options) {
  console.log('trier par :' + options);

  const mediaPhotographer = await getMediaById(media, idPhotographer);

  console.log('index.js->displaymedia');

  const mediaImage = document.querySelector('.photograph-header');
  const personalPhotographer = await getPhotograperById(
    photographers,
    idPhotographer
  );
  const newMedia = await getMediaFilter(
    mediaPhotographer,
    idPhotographer,
    options
  );
  console.log(newMedia);
  // console.log(newMedia);
  const photographerData = {
    photographer: personalPhotographer,
    media: newMedia,
  };
  const mediaModel = mediaFactory(photographerData);
  const mediaCardDOM = mediaModel.getMediaCardDOM();
  console.log(mediaCardDOM);
  mediaImage.appendChild(mediaCardDOM);
  const numberLikes = document.querySelectorAll('.number-likes');

  // Initialisation d'un tableau pour le stockage des data-ref des Likes des Photos
  // Ecouteur d'évèement sur chaque icône Like et appelle de la fonction number() pour le traitement
  const tabRef = [];
  for (let i = 0; i < numberLikes.length; i++) {
    numberLikes[i].addEventListener('click', function () {
      number(numberLikes[i], tabRef);
    });
  }
}

async function displayLightBox(
  media,
  photographers,
  selectPhoto,
  idPhotographer
) {
  console.log('index.js->displayLightBox');
  const mediaPhotographer = await getMediaById(media, idPhotographer);
  const name = await getNamePhotographer(photographers, idPhotographer);

  const modal = document.querySelector('.modal');

  console.log(modal);
  const mediaModel = mediaFactory(mediaPhotographer);
  const mediaLightBoxDOM = mediaModel.getLightBoxDOM(selectPhoto, name);
  if (mediaLightBoxDOM != null) {
    modal.appendChild(mediaLightBoxDOM);
  }
}
/**
 * Function to initialize all display
 * @param {string} selectDisplayOption->popularite:1, date:2, titre:3
 */
async function init(options = '') {
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
    displayMedia(media, photographers, idPhotographer, (options = '1'));
    const name = await getNamePhotographer(photographers, idPhotographer);
    getPhotographerName(name);
    displayLightBox(media, photographers, options, idPhotographer);
  }
}
init();
