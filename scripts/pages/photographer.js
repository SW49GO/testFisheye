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
const likes = document.querySelector('.likes');
const tab = []; // Pour le stockage des data-ref des Images
if (sectionPhotograph != null) {
  sectionPhotograph.addEventListener('click', function (event) {
    const target = event.target;
    let totalLikes = likes.textContent;
    console.log(totalLikes);
    if (event.target.classList.contains('number-likes')) {
      const refNumber = target.dataset.ref;
      if (tab.includes(refNumber)) {
        //Utilisateur a déjà liké
        totalLikes = parseInt(totalLikes) - 1;
        likes.innerHTML = `${totalLikes}<i class="fa-solid fa-heart"></i>`;
        const index = tab.indexOf(refNumber);
        tab.splice(index, 1);
      } else {
        //Utilisateur n'a pas liké
        totalLikes = parseInt(totalLikes) + 1;
        likes.innerHTML = `${totalLikes}<i class="fa-solid fa-heart"></i>`;
        tab.push(refNumber);
      }
      console.log(tab);
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
