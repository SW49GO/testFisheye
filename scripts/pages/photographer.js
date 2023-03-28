//Mettre le code JavaScript lié à la page photographer.html
// document.addEventListener('DOMContentLoaded', function () {
console.log('pages/photographers.js');

// const photographHeader = document.querySelector('.photograph-header');
// console.log(photographHeader);
// console.log(photographHeader.querySelector('.photographer-header-article'));

///////////////////////////////////////////////////////////////////////////////////////////////
// Appartition du sous-menu
const btnSort = document.querySelector('.btn-filter');
// console.log(btnSort);
if (btnSort != null) {
  const selectMenu = document.querySelector('.select-menu');
  const spanSort = btnSort.getElementsByTagName('span')[0];
  const pSort = btnSort.getElementsByTagName('p')[0];

  btnSort.addEventListener('click', function () {
    console.log('photographer.js/ ->btnSord addEventlistener');
    selectMenu.classList.toggle('show');

    if (pSort.textContent === '') {
      spanSort.innerHTML = selectMenu.classList.contains('show')
        ? '<i class="fa-solid fa-angle-up"></i>'
        : '<i class="fa-solid fa-chevron-down"></i>';
    } else {
      spanSort.innerHTML = selectMenu.classList.contains('show')
        ? '<i class="fa-solid fa-angle-up"></i>'
        : '<i class="fa-solid fa-chevron-down"></i>';
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////
// Gestion des Likes
const numberLikes = document.querySelectorAll('.number-likes');
const likes = document.querySelector('.likes');

if (likes != null && numberLikes) {
  const dataSelect = document.querySelectorAll('.select-menu-item');
  const selectMenu = document.querySelector('.select-menu');
  const pSort = btnSort.getElementsByTagName('p')[0];
  const likesValue = parseInt(likes.childNodes[0].nodeValue.trim());
  const initialLike = Array.from(numberLikes).map(() => 0);

  console.log(initialLike);

  numberLikes.forEach((elt, index) => {
    elt.addEventListener('click', function () {
      console.log('photographer.js/ ->numberLikes addEventlistener');

      if (initialLike[index] === 0) {
        // Si le like était à 0, on l'incrémente en l'initialisant à 1
        initialLike[index] = 1;
        const userLike = parseInt(elt.childNodes[0].nodeValue) + 1;
        numberLikes[
          index
        ].innerHTML = `${userLike}<i class="fa-solid fa-heart"></i>`;
      } else {
        // Sinon, on le décrémente en laissant la valeur initial à 0
        initialLike[index] = 0;
        const userLike = parseInt(elt.childNodes[0].nodeValue) - 1;
        numberLikes[
          index
        ].innerHTML = `${userLike}<i class="fa-solid fa-heart"></i>`;
      }
      const totalLikes =
        likesValue + initialLike.reduce((acc, value) => acc + value, 0);
      likes.innerHTML = `${totalLikes} <span>&hearts;<span></span>`;
    });
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // Tri selon la selection
  const selectOptions = {
    1: 'Popularité',
    2: 'Date',
    3: 'Titre',
  };
  // Id du Photographe
  const photographer = document.querySelector('.photographer-identity');
  const idPhotographer = photographer.dataset.identity;
  console.log(idPhotographer);
  for (let i = 0; i < dataSelect.length; i++) {
    dataSelect[i].addEventListener('click', function () {
      console.log('photographer.js/ ->dataset filter addEventlistener');

      const dataValue = dataSelect[i].dataset.select;
      pSort.textContent = selectOptions[dataValue];
      pSort.style.color = '#fff';
      selectMenu.classList.remove('show');
      getJsonDataPhotographers().then((data) => {
        const media = data.media;
        const photographers = data.photographers;
        displayMedia(media, photographers, idPhotographer, dataValue);
      });
    });
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////s
/////////////Listes photos
const listPhotos = document.querySelectorAll('.list-photos');
const modalConteneur = document.getElementById('contact_modal');
const modal = document.querySelector('.modal');

for (let i = 0; i < listPhotos.length; i++) {
  listPhotos[i].addEventListener('click', function () {
    console.log('photographer.js/ ->listPhoto[i] addEventlistener');
    const id = listPhotos[i].dataset.id;
    console.log(id);
    getJsonDataPhotographers().then((data) => {
      const media = data.media;
      getCarrousel(media, id);
    });
  });
}
