// //Mettre le code JavaScript lié à la page photographer.html

console.log("pages/photographers.js");

const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("identify");

function number(numberLikes, tabRef) {
  const encart = document.querySelector(".likes");
  let photoLike = parseInt(numberLikes.textContent);
  console.log(photoLike);
  const refLike = numberLikes.childNodes[1].dataset.ref;
  let totalLikesEncart = parseInt(encart.textContent);
  console.log(totalLikesEncart);

  if (tabRef.includes(refLike)) {
    // Si l'utilisateur a déjà liké
    const index = tabRef.indexOf(refLike);
    tabRef.splice(index, 1);
    totalLikesEncart--;
    photoLike--;
  } else {
    // Si l'utilisateur n'a pas encore liké
    tabRef.push(refLike);
    totalLikesEncart++;
    photoLike++;
  }

  encart.innerHTML = `${totalLikesEncart}<i class="fa-solid fa-heart"></i>`;
  numberLikes.innerHTML = `${photoLike}<i data-ref="${refLike}" class="fa-solid fa-heart icon-likes"></i>`;
}

function displayMenuFilter(btnFilter) {
  console.log("entrer dans le button");

  // console.log('photographer.js/ ->btnSord addEventlistener');
  const selectedMenuFilter = document.querySelector(".select-menu");
  console.log(selectedMenuFilter.classList);
  selectedMenuFilter.classList.toggle("show");

  const chevronFilter = btnFilter.querySelector(".chevron-filter");
  const txtFilter = btnFilter.querySelector(".txt-filter");

  if (txtFilter.textContent === "") {
    chevronFilter.innerHTML = selectedMenuFilter.classList.contains("show")
      ? '<i class="fa-solid fa-chevron-down"></i>'
      : '<i class="fa-solid  fa-angle-up"></i>';
  } else {
    chevronFilter.innerHTML = selectedMenuFilter.classList.contains("show")
      ? '<i class="fa-solid fa-angle-up"></i>'
      : '<i class="fa-solid fa-chevron-down"></i>';
  }
}
function selectFilter(selectMenuFilter, btnFilter) {
  console.log("entrer selection menu");
  // Positionnement du chevron
  const chevronFilter = btnFilter.querySelector(".chevron-filter");
  chevronFilter.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
  const button = btnFilter.childNodes[0];
  const buttonTxt = button.textContent;
  const choiceName = selectMenuFilter.textContent;

  // Inversion des nom de menuItems
  button.textContent = choiceName;
  selectMenuFilter.textContent = buttonTxt;

  console.log(choiceName);
  let select;
  switch (choiceName) {
    case "Popularité":
      select = "1";
      break;
    case "Date":
      select = "2";
      break;
    case "Titre":
      select = "3";
      break;
  }

  console.log(select);
  getJsonDataPhotographers().then(({ media, photographers }) => {
    displayMedia(media, photographers, idPhotographer, select);
  });
}
// //////////////////////////////////////////////////////////////////////
///// Soumission du formulaire
const form = document.querySelector(".modal-form");
if (form != null) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(
      "Votre prénom : " +
        event.target.firstname.value +
        "\nVotre nom : " +
        event.target.lastname.value +
        "\nVotre adresse Email : " +
        event.target.email.value +
        "\nVotre message : " +
        event.target.message.value
    );
    closeModal();
  });
}

function selectPhotoLightBox(photo) {
  console.log(photo);
  const idPhoto = photo.dataset.id;
  console.log(idPhoto);
  getJsonDataPhotographers().then(({ media, photographers }) => {
    displayLightBox(media, photographers, idPhoto, idPhotographer);
  });
  displayModal("lightBox");
}

/**
 * Function to initialize "i" that is the index of the photo selected
 * @param {string} indexPhoto
 * @returns
 */
function getValueIndex(indexPhoto) {
  console.log(indexPhoto);
  i = parseInt(indexPhoto);
  return i;
}
// Variable i=indexPhoto
let i;
console.log(i);

/**
 * Function to show the next photo
 * @param {*} nbMedias
 */
function goToPreviewPhoto(nbMedias) {
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");
  // console.log(nbMedias.length);
  console.log("left");
  i--;
  // if (i >= 0) {
  //   i = Math.abs(i % nbMedias.length);
  // } else {
  //   i = nbMedias.length - Math.abs(i % nbMedias.length);
  // }
  // Affecte un valeur positif à i, si i est négatif
  i = ((i % nbMedias.length) + nbMedias.length) % nbMedias.length;

  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  console.log(
    document.getElementById("contact_modal").querySelectorAll(".li-image")[i]
  );
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");
}

/**
 * Function to go to the preview photo
 * @param {} nbMedias
 */
function goToNextPhoto(nbMedias) {
  // console.log(nbMedias.length);
  // Effacement de l'image et son titre en cours
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");

  console.log("right");
  i++;
  // if (i >= 0) {
  //   i = Math.abs(i % nbMedias.length);
  // } else {
  //   i = nbMedias.length - Math.abs(i % nbMedias.length);
  // }
  // Affecte un valeur positif à i, si i est négatif
  i = ((i % nbMedias.length) + nbMedias.length) % nbMedias.length;

  // Apparition de la prochain photo et son titre
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  console.log(
    document.getElementById("contact_modal").querySelectorAll(".li-image")[i]
  );
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");
}
