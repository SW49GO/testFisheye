//  Dans la factory Media, vous devrez gérer les différents cas où le
//  média est une image ou une vidéo.
// ● Vous afficherez également les réalisations des photographes. Sur le
// modèle de la factory photographerFactory, vous devrez également
// créer une factory pour Media.
// ● N'oubliez pas le petit encart qui affiche le tarif journalier du ou de la
// photographe affiché.
// ● Dans la factory Media, vous devrez gérer les différents cas où le
// média est une image ou une vidéo.

/**
 * Pattern Factories to create HTMLElements for photographer.html
 * @param {object} data
 * @returns getMediaCardDOM->HTMLElement(article)
 */
function mediaFactory(data) {
  console.log('factories/media.js');
  console.log(data);

  function getMediaCardDOM() {
    console.log('factories/media.js->getMediaCardDOM');
    const { name } = data.photographer[0];
    // console.log(name);

    // console.log(data.media[0]);
    const path = name.split(' ')[0];
    const parentArticle = document.querySelector('.photograph-header');
    const theLastArticle = document.querySelector('.list-article');
    if (theLastArticle) {
      parentArticle.removeChild(theLastArticle);
    }
    const article = document.createElement('article');
    article.className = 'list-article';

    for (let i = 0; i < data.media.length; i++) {
      const images = data.media[i].image
        ? `<img class="list-photos" data-id="${data.media[i].id}" src="assets/photographers/${path}/${data.media[i].image}" alt="${data.media[i].title}" loading="lazy"></img>`
        : `<video class="video list-photos" data-id="${data.media[i].id}" aria-label="Vidéo : ${data.media[i].title}">
                                      <source src="assets/photographers/${path}/${data.media[i].video}" type="video/mp4" >
                                    </video>`;
      const title = data.media[i].video
        ? `<p><i class="fa-solid fa-video" title="Vidéo"></i> ${data.media[i].title}</p>`
        : `<p>${data.media[i].title}</p>`;
      if (images) {
        // console.log(images);
        article.innerHTML += `<div class="list-photos-photographer">
                                <a href="#">
                                  <figure class="list-photos-conteneur">
                                    ${images}
                                  </figure>
                                 </a>
                                <figcaption class="list-photos-description">
                                  ${title}
                                <p class="number-likes"">${data.media[i].likes}<i data-ref="${data.media[i].id}" class="fa-solid fa-heart icon-likes"></i></p>
                                </figcaption>
                              </div>`;
      }
    }

    return article;
  }
  function getLightBoxDOM(selectPhoto, name) {
    console.log('factories/media.js->getLightBoxDOM');
    console.log('selectionPhoto' + selectPhoto);
    const path = name[0].split(' ')[0];
    console.log(path);
    const modal = document.getElementById('contact_modal');
    const form = document.querySelector('.modal-form');
    // Déterminer de quel média il s'agit
    const formatPhoto = data
      .filter((photo) => photo.id == selectPhoto)
      .map((format) => format.image);
    const formatVideo = data
      .filter((photo) => photo.id == selectPhoto)
      .map((format) => format.video);
    // Rendu suivant le media
    let displayMedia;
    if (formatPhoto[0]) {
      displayMedia = `<img class="list-photos" src="assets/photographers/${path}/${formatPhoto[0]}" alt="photo sélectionnée">`;
    } else if (formatVideo[0]) {
      displayMedia = `<video class="video list-photos" controls width="100"aria-label="Vidéo : ${formatVideo[0]}">
                                      <source src="assets/photographers/${path}/${formatVideo[0]}" type="video/mp4" >
                                      <track kind="subtitles" src="assets/photographers/${path}/test.vtt" srclang="fr">
                                    </video>`;
    }

    if (selectPhoto != '') {
      modal.style.display = 'block';
      if (form != null) {
        form.style.display = 'none';
      }
      const article = document.createElement('article');
      article.className = 'caroussel';
      article.innerHTML = displayMedia;
      return article;
    }
    return null;
  }

  return { getMediaCardDOM, getLightBoxDOM };
}
////Caroussel du cours !!!
//////////////////////////
//  <ul class="carousel" aria-label="Our selection of Recipes">
//      <li class="carousel-item item-0" aria-hidden="false">
//          <div role="button" class="controls controls-left">
//              <span class="img prev-image">
//                  <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
//              </span>
//              <p class="sr-only">Previous</p>
//          </div>
//          <div role="button" class="controls controls-right">
//              <span class="img next-image">
//                  <i aria-hidden="true" class="fa fa-arrow-circle-right"></i>
//              </span>
//              <p class="sr-only">Next</p>
//          </div>
//          <div class="caroussel-title">
//              <h2>Item 1</h2>
//          </div>
//      </li>
//      <li class="carousel-item item-1" aria-hidden="true">
//          <div role="button" class="controls controls-left">
//              <span class="img prev-image">
//                  <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
//              </span>
//              <p class="sr-only">Previous</p>
//          </div>
//          <div role="button" class="controls controls-right">
//              <span class="img next-image">
//                  <i aria-hidden="true" class="fa fa-arrow-circle-right"></i>
//              </span>
//              <p class="sr-only">Next</p>
//          </div>
//          <div class="caroussel-title">
//              <h2>Item 2</h2>
//          </div>
//      </li>
//      <li class="carousel-item item-2" aria-hidden="true">
//          <div role="button" class="controls controls-left">
//              <span class="img prev-image">
//                  <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
//              </span>
//              <p class="sr-only">Previous</p>
//          </div>
//          <div role="button" class="controls controls-right">
//              <span class="img next-image">
//                  <i aria-hidden="true" class="fa fa-arrow-circle-right"></i>
//              </span>
//              <p class="sr-only">Next</p>
//          </div>
//          <div class="caroussel-title">
//              <h2>Item 3</h2>
//          </div>
//      </li>
//  </ul>
