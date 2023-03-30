//Mettre le code JavaScript lié à la page photographer.html

console.log('pages/photographers.js');

///////////////////////////////////////////////////////////////////////////////////////////////
// Appartition du sous-menu

console.log('menuFilter');
const btnFilter = document.querySelector('.btn-filter');
if (btnFilter != null) {
  const selectedMenuFilter = document.querySelector('.select-menu');
  const chevronFilter = btnFilter.querySelector('.chevron-filter');
  const txtFilter = btnFilter.querySelector('.txt-filter');

  btnFilter.addEventListener('click', function () {
    console.log('photographer.js/ ->btnSord addEventlistener');
    selectedMenuFilter.classList.toggle('show');

    if (txtFilter.textContent === '') {
      chevronFilter.innerHTML = selectedMenuFilter.classList.contains('show')
        ? '<i class="fa-solid fa-angle-up"></i>'
        : '<i class="fa-solid fa-chevron-down"></i>';
    } else {
      chevronFilter.innerHTML = selectedMenuFilter.classList.contains('show')
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
        // Si l'utilisateur a déjà liké
        const index = tabRef.indexOf(refNumber);
        tabRef.splice(index, 1);
        totalLikesEncart--;
        theNumberLikes--;
      } else {
        // Si l'utilisateur n'a pas encore liké
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
console.log(listPhotos);
for (let i = 0; i < listPhotos.length; i++) {
  listPhotos[i].addEventListener('click', function () {
    console.log(listPhotos[i]);
    console.log('photographer.js/ ->listPhoto[i] addEventlistener');
    // suppression du titre
    const titleModalContact = document.querySelector('.modal-photographer');
    titleModalContact.innerHTML = '';
    const article = document.querySelector('.caroussel');
    // vérification si un article déjà présent, si oui suppression
    if (article) {
      if (article.parentNode) {
        article.parentNode.removeChild(article);
      }
    }

    const idPhoto = listPhotos[i].dataset.id;
    console.log(idPhoto);
    console.log('photo cliqué');
    const photographer = document.querySelector('.photographer-identity');
    if (photographer != null) {
      const idPhotographer = photographer.dataset.identity;
      getJsonDataPhotographers().then(({ media, photographers }) => {
        displayLightBox(media, photographers, idPhoto, idPhotographer);
      });
    }
    displayModal();
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////
///////////Selection et affichage du Filtre
const selectOptions = {
  1: 'Popularité',
  2: 'Date',
  3: 'Titre',
};

const selectedFilter = document.querySelectorAll('.select-menu-item');
const photographer = document.querySelector('.photographer-identity');
if (photographer != null) {
  const id = photographer.dataset.identity;

  for (let i = 0; i < selectedFilter.length; i++) {
    selectedFilter[i].addEventListener('click', function () {
      console.log('photographer.js/ ->dataset filter addEventlistener');

      const selectedImage = selectedFilter[i].dataset.select;
      const txtFilter = btnFilter.querySelector('.txt-filter');
      const selectedMenuFilter = document.querySelector('.select-menu');
      txtFilter.textContent = selectOptions[selectedImage];
      txtFilter.style.color = '#fff';
      selectedMenuFilter.classList.remove('show');

      getJsonDataPhotographers().then(({ media, photographers }) => {
        displayMedia(media, photographers, id, selectedImage);
      });
    });
  }
}

//////////////////////////////////////////////////////////////////////
///// Soumission du formulaire
const form = document.querySelector('.modal-form');
if (form != null) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(
      'Votre prénom : ' +
        event.target.firstname.value +
        '\nVotre nom : ' +
        event.target.lastname.value +
        '\nVotre adresse Email : ' +
        event.target.email.value +
        '\nVotre message : ' +
        event.target.message.value
    );
    closeModal();
  });
}
