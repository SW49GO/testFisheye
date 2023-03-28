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
  // console.log(data);

  function getMediaCardDOM() {
    console.log('factories/media.js->getMediaCardDOM');
    const { name } = data.photographer[0];
    // console.log(name);

    // console.log(data.media[0]);
    const path = name.split(' ')[0];
    const article = document.createElement('article');
    article.className = 'list-article';
    for (let i = 0; i < data.media.length; i++) {
      const images = data.media[i].image
        ? `<img class="list-photos" data-id="${data.media[i].id}" src="assets/photographers/${path}/${data.media[i].image}" alt="${data.media[i].title}"></img>`
        : `<video class="list-photos" data-id="${data.media[i].id}" controls width="100"  aria-label="${data.media[i].title}">
                                      <source src="assets/photographers/${path}/${data.media[i].video}" type="video/mp4" >
                                    </video>`;
      if (images) {
        article.innerHTML += `<div class="list-photos-photographer">
                                <a href="#">
                                  <figure class="list-photos-conteneur">
                                    ${images}
                                  </figure>
                                 </a>
                                <figcaption class="list-photos-description">
                                <p>${data.media[i].title}</p>
                                <p class="number-likes" data-ref="${data.media[i].id}">${data.media[i].likes}<i class="fa-solid fa-heart"></i></p>
                                </figcaption>
                              </div>`;
      }
    }
    return article;
  }
  function getMediaCarrouselDOM(selectPhoto) {
    console.log('factories/media.js->getMediaCarrouselDOM');
    console.log(selectPhoto);

    const article = document.createElement('article');
    article.innerHTML = `<p>Photo n° : ${selectPhoto}</p>`;
    return article;
  }

  return { getMediaCardDOM, getMediaCarrouselDOM };
}

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
