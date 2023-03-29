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
      // const likes = document.createElement('p');
      // likes.className = 'number-likes';
      // likes.textContent = `${data.media[i].likes}`;
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
                                <p class="number-likes" data-ref="${data.media[i].id}">${data.media[i].likes}<i data-ref="${data.media[i].id}" class="fa-solid fa-heart number-likes"></i></p>
                                </figcaption>
                              </div>`;
      }
      // article.appendChild(likes);
    }

    return article;
  }
  function getMediaCarousselDOM(selectPhoto) {
    console.log('factories/media.js->getMediaCarrouselDOM');
    console.log('selectionPhoto' + typeof selectPhoto);
    const modal = document.getElementById('contact_modal');
    const form = document.querySelector('.modal-form');
    console.log(form);
    if (selectPhoto != '') {
      modal.style.display = 'block';
      if (form != null) {
        form.style.display = 'none';
      }
      const article = document.createElement('article');
      article.innerHTML += `<p class="caroussel">Photo n° : ${selectPhoto}</p><img src="assets/icons/close.svg" onclick="closeModal()">`;
      return article;
    }
    return null;
  }

  return { getMediaCardDOM, getMediaCarousselDOM };
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
