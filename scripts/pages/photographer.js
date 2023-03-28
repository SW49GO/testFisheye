//Mettre le code JavaScript lié à la page photographer.html
// document.addEventListener('DOMContentLoaded', function () {
console.log('pages/photographers.js');

// const photographHeader = document.querySelector('.photograph-header');
// console.log(photographHeader);
// console.log(photographHeader.querySelector('.photographer-header-article'));

///////////////////////////////////////////////////////////////////////////////////////////////
// Appartition du sous-menu
const btnSort = document.querySelector('.btn-filter');
const selectMenu = document.querySelector('.select-menu');
const dataSelect = document.querySelectorAll('.select-menu-item');
const spanSort = btnSort.getElementsByTagName('span')[0];
const pSort = btnSort.getElementsByTagName('p')[0];
btnSort.addEventListener('click', function () {
  console.log('bouton');
  selectMenu.classList.toggle('show');
  spanSort.innerHTML = selectMenu.classList.contains('show')
    ? '<i class="fa-solid fa-angle-up"></i>'
    : '<i class="fa-solid fa-chevron-down"></i>';
});

///////////////////////////////////////////////////////////////////////////////////////////////
// Gestion des Likes
const numberLikes = document.querySelectorAll('.number-likes');
const likes = document.querySelector('.likes');
console.log(likes);

// const namePhotographer =
//   document.querySelector('.name-photographer').textContent;
// const nameP = namePhotographer.split(' ')[0];
// console.log(nameP);
if (likes != null) {
  const likesValue = parseInt(likes.childNodes[0].nodeValue.trim());

  const initialLike = Array.from(numberLikes).map(() => 0);

  console.log(initialLike);

  numberLikes.forEach((elt, index) => {
    elt.addEventListener('click', function () {
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

  for (let i = 0; i < dataSelect.length; i++) {
    dataSelect[i].addEventListener('click', function () {
      const dataValue = dataSelect[i].dataset.select;
      pSort.textContent = selectOptions[dataValue];
      pSort.style.color = '#fff';
      console.log(dataValue);
      console.log(typeof dataValue);
      // init(dataValue);

      localStorage.setItem('choice', dataValue);
      const value = localStorage.getItem('choice');
      console.log(localStorage);

      init(value);
      console.log('je suis revenu');
    });
  }
  localStorage.getItem('choice');
  console.log(localStorage);

  ///////////////////////////////////////////////////////////////////////////////////////////////s
  /////////////Listes photos
  const listPhotos = document.querySelectorAll('.list-photos');
  const modalConteneur = document.getElementById('contact_modal');
  const modal = document.querySelector('.modal');
  const modalForm = modalConteneur.getElementsByTagName('form')[0];
  // const titre = modalConteneur.getElementsByTagName('h2')[0];
  const title = document.querySelector('.modal-photographer');

  for (let i = 0; i < listPhotos.length; i++) {
    listPhotos[i].addEventListener('click', function () {
      const id = listPhotos[i].dataset.id;
      localStorage.setItem('id', id);
      modalConteneur.style.display = 'block';
      modalForm.style.display = 'none';
      title.style.display = 'none';
      getMediaData();
      // modalConteneur.style.backgroundColor = '#fff';
      // titre.innerHTML = '';

      // const img = document.createElement('img');
      // img.src = listPhotos[i].src;
      // modalConteneur.appendChild(img);
      // const image = modalConteneur.getElementsByTagName('img')[0];
      // image.style.width = '90%';
      // image.style.height = '90%';
    });
  }

  async function getMediaData() {
    const { media } = await getJsonDataPhotographers();

    // const mediaSection = document.querySelector('.modal');
    const selectPhoto = localStorage.getItem('id');
    const mediaModel = mediaFactory(media);
    const mediaCarrouselDOM = mediaModel.getMediaCarrouselDOM(selectPhoto);
    modalConteneur.appendChild(mediaCarrouselDOM);
    console.log(media);
  }
}
//////
// });
// //Faire un tri selon l'optionSelect reçu
// // Tri des Likes par ordre croissant
// const choice = localStorage.getItem('choice');
// console.log(choice);
// let newMedia;

// switch (selectDisplayOption) {
//   case '1':
//     newMedia = mediaPhotographer.sort((a, b) => b.likes - a.likes);
//     break;
//   case '2':
//     newMedia = mediaPhotographer.sort((a, b) => b.dates - a.dates);
//     break;
//   case '3':
//     newMedia = mediaPhotographer.sort((a, b) =>
//       a.title.localeCompare(b.title)
//     );
//     break;
//   default:
//     newMedia = mediaPhotographer;
// }
// console.log(newMedia);
