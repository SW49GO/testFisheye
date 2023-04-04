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
  console.log("factories/media.js");
  console.log(data);

  function getMediaCardDOM() {
    console.log("factories/media.js->getMediaCardDOM");
    const { name } = data.photographer[0];
    // console.log(name);

    // console.log(data.media[0]);
    const path = name.split(" ")[0];
    const parentArticle = document.querySelector(".photograph-header");
    const theLastArticle = document.querySelector(".list-article");
    if (theLastArticle) {
      parentArticle.removeChild(theLastArticle);
    }
    const article = document.createElement("article");
    article.className = "list-article";

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
    console.log("factories/media.js->getLightBoxDOM");
    console.log("selectionPhoto" + selectPhoto);
    // Récupération du nom pour le chemin d'accès au fichier
    const path = name[0].split(" ")[0];
    console.log(path);
    // Déterminer de quel média il s'agit pour la photo ou video sélectionner
    const formatPhoto = data
      .filter((photo) => photo.id == selectPhoto)
      .map((format) => format.image);
    const formatVideo = data
      .filter((photo) => photo.id == selectPhoto)
      .map((format) => format.video);

    // L'image ou video séléctionnée
    let mediaSelected = `${
      formatPhoto[0]
        ? `<img class="list-photos" src="assets/photographers/${path}/${formatPhoto[0]}" alt="photo sélectionnée">`
        : formatVideo[0]
        ? ` <video class="video list-photos" controls width="100" aria-label="Vidéo : ${formatVideo[0]}">
    <source src="assets/photographers/${path}/${formatVideo[0]}" type="video/mp4">
  </video>`
        : ""
    }`;

    // Affichage de toutes les images et video
    let displayMedia = `<div class="conteneurLightBox">
                          <div class="icon-close">
                            <i class="fa-sharp fa-solid fa-xmark" onclick="closeModal()"></i>
                          </div>
                          <div class="arrow-right">
                            <i class="fa-sharp fa-solid fa-angle-right"></i>
                          </div>
                          <div class="arrow-left">
                            <i class="fa-sharp fa-solid fa-angle-right fa-rotate-180"></i>
                          </div>
                          <ul class="conteneurImages">`;

    // Création de tout les rendus
    data.forEach((item) => {
      if (item.image) {
        displayMedia += `<li class="li-image">
                          <img class="list-photos lightBox-photo" src="assets/photographers/${path}/${item.image}" alt="photo sélectionnée">
                          <p class="title-photo">${item.title}</p>
                        </li>`;
      }
      if (item.video) {
        displayMedia += ` <li class="li-image">
                            <video class="video list-photos lightBox-photo" controls width="100" aria-label="Vidéo : ${item.video}">
                              <source src="assets/photographers/${path}/${item.video}" type="video/mp4">
                            </video>
                            <p class="title-photo">${item.title}</p>
                          </li>`;
      }
    });
    displayMedia.innerHTML = `</ul></div>`;

    if (selectPhoto != "") {
      const article = document.createElement("article");
      article.className = "lightBox";
      article.style.position = "relative";
      article.style.top = "0";
      article.style.order = "1";
      article.innerHTML = displayMedia;
      return article;
    }
    return null;
  }

  return { getMediaCardDOM, getLightBoxDOM };
}
