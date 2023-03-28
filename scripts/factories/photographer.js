/**
 * Pattern Factories to create HTMLElements for photographer.html
 * @param {object} data
 * @returns getUserCardDOM, getPagePhotographerDOM ->HTMLElement
 */
function photographerFactory(data) {
  console.log('factories/photographer.js');
  // Extraction des propriétés de l'objet data pour photographer à l'aide de la déstructuration
  const { name, id, city, country, tagline, price, portrait } =
    data.photographer;
  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  //////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Function to return the HTML in index page for each Photographer
   * @returns HTMLElement(article)
   */
  function getUserCardDOM() {
    console.log('factories/photographer.js->getUserCardDOM');
    // Création des éléments HTML pour représenter la carte utilisateur
    const article = document.createElement('article');
    article.setAttribute(
      'aria-label',
      "Carte d'identité du photographe " + name
    );
    article.innerHTML = `<a href="photographer.html?identify=${id}" aria-label="Lien vers la page du photographe ${name}">
                            <img src="${picture}" alt="Portrait du photographe ${name}, lien vers sa page">
                            <h2>${name}</h2>
                        </a>
                        <div class="photographer-description" aria-label="Localisation, slogan et tarifs du photographe ${name}">
                          <h3>${city}, ${country}</h3> 
                          <p>${tagline}</p>
                          <p>${price}€/jour</p>
                        </div>`;
    return article;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Function to return the HTML page of each Photographer
   * @param {number} numbLikes
   * @returns HTMLElement(article)
   */
  function getPagePhotographerDOM(numbLikes) {
    console.log('factories/photographer.js->getPagePhotographerDOM');
    const verif = document.querySelector('.photographer-header-article');
    console.log(verif);
    if (!verif) {
      const article = document.createElement('article');
      article.className = 'photographer-header-article';
      article.innerHTML = `<div class="photographer-identity" data-identity="${id}">
                            <div  aria-label="Localisation, slogan et tarifs du photographe ${name}">
                              <h2 class="name-photographer">${name}</h2>
                              <h3>${city}, ${country}</h3> 
                              <p>${tagline}</p>
                            </div>
                            <div aria-label="Bouton pour contacter ${name}">
                              <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                            </div>
                            <div aria-label="Portait de ${name}">
                              <img class="photographer-portrait" src="${picture}" alt="Portrait du photographe ${name}, lien vers sa page">
                            </div>
                          </div>
                          <div class="select-sort" aria-label="Tri des images selon la popularité, la date ou le titre">
                            <p>Trier par </p>
                            <div class="dropdown">
                              <button class="btn-filter" type="button" tabindex="3" ><p></p><span><i class="fa-solid fa-chevron-down"></i></span></button>
                              <ul class="select-menu">
                                <li class="select-menu-item" data-select="1">Populartié</li><hr>
                                <li class="select-menu-item" data-select="2">Date</li><hr>
                                <li class="select-menu-item" data-select="3">Titre</li>
                              </ul>
                            </div>
                          </div>
                          <div class="list-images">
                          </div>
                          <div class="encart">
                            <p class="likes">	${numbLikes} <span>&hearts;<span></p>
                            <p class="price">${price}€/jour</p>
                          </div>
                      `;
      return article;
    }
    return null;
  }

  return { getUserCardDOM, getPagePhotographerDOM };
}
