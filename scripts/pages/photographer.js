//Mettre le code JavaScript lié à la page photographer.html

console.log('pages/photographers.js');

///////////////////////////////////////////////////////////////////////////////////////////////
// Appartition du sous-menu

// document.body.addEventListener('click', function (event) {
//   if (event.target.className == 'btn-filter') {
//     menuFilter();
//   }
//   if (event.target.className == 'number-likes') {
//     checkLikes();
//   }
//   if (event.target.className == 'list-photos') {
//     selectPhotoLightBox();
//   }
//   if (event.target.className == 'select-menu-item') {
//     checkFilter();
//   }
// });

console.log('menuFilter');
const btnSort = document.querySelector('.btn-filter');
if (btnSort != null) {
  const selectMenu = document.querySelector('.select-menu');
  const spanSort = btnSort.querySelector('.like-filter');
  const pSort = btnSort.querySelector('.txt-filter');

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
const sectionPhotograph = document.querySelector('.photograph-header');
const encart = document.querySelector('.likes');
const tabRef = []; // Pour le stockage des data-ref des Images
if (sectionPhotograph != null) {
  sectionPhotograph.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-filter')) {
      return;
    }
    if (event.target.classList.contains('icon-likes')) {
      const target = event.target;
      let totalLikesEncart = parseInt(encart.textContent);
      let theNumberLikes = event.target.parentNode.textContent;
      const parentLikes = event.target.parentNode;
      const refNumber = target.dataset.ref;

      if (tabRef.includes(refNumber)) {
        // Si l'utilisateur a déjà aimé
        const index = tabRef.indexOf(refNumber);
        tabRef.splice(index, 1);
        totalLikesEncart--;
        theNumberLikes--;
      } else {
        // Si l'utilisateur n'a pas encore aimé
        tabRef.push(refNumber);
        totalLikesEncart++;
        theNumberLikes++;
      }

      encart.innerHTML = `${totalLikesEncart}<i class="fa-solid fa-heart"></i>`;
      parentLikes.innerHTML = `${theNumberLikes}<i data-ref="${refNumber}" class="fa-solid fa-heart icon-likes"></i>`;
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////Listes photos  -> selection d'un photo et envoi lightBox

const listPhotos = document.querySelectorAll('.list-photos');
for (let i = 0; i < listPhotos.length; i++) {
  listPhotos[i].addEventListener('click', function () {
    console.log('photographer.js/ ->listPhoto[i] addEventlistener');
    const id = listPhotos[i].dataset.id;
    console.log(id);
    getJsonDataPhotographers().then((data) => {
      const media = data.media;
      getCaroussel(media, id);
    });
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////
///////////Selection et affichage du Filtre
const selectOptions = {
  1: 'Popularité',
  2: 'Date',
  3: 'Titre',
};

// console.log(id);
const dataSelect = document.querySelectorAll('.select-menu-item');
const photographer = document.querySelector('.photographer-identity');
if (photographer != null) {
  const id = photographer.dataset.identity;

  for (let i = 0; i < dataSelect.length; i++) {
    dataSelect[i].addEventListener('click', function () {
      console.log('photographer.js/ ->dataset filter addEventlistener');

      const dataValue = dataSelect[i].dataset.select;
      const pSort = btnSort.querySelector('.txt-filter');
      const selectMenu = document.querySelector('.select-menu');
      pSort.textContent = selectOptions[dataValue];
      pSort.style.color = '#fff';
      selectMenu.classList.remove('show');

      getJsonDataPhotographers().then((data) => {
        const media = data.media;
        const photographers = data.photographers;
        displayMedia(media, photographers, id, dataValue);
      });
    });
  }
}
