function displayModal(option) {
  const modal = document.getElementById('contact_modal');
  const main = document.getElementById('main');
  const divModal = document.querySelector('.modal');
  const lightBox = document.querySelector('.lightBox');
  const header = document.getElementsByTagName('header');
  const form = document.querySelector('.modal-form');
  const title = document.querySelector('.modal-photographer');
  // Positionnement de la modal
  modal.style.left = '50%';
  modal.style.transform = 'translateX(-50%)';
  // Diminution de l'opacité de l'arrière plan
  main.style.opacity = 0.5;
  header[0].style.opacity = 0.5;
  if (option == 'form') {
    // Affichage du formulaire
    form.style.left = '0';
    form.style.height = '100%';
    if (lightBox) {
      divModal.removeChild(lightBox);
    }
  } else {
    if (lightBox) {
      divModal.removeChild(lightBox);
    }

    form.style.left = '-100rem';
    form.style.order = '2';
    form.style.height = '0';
    lightBox.style.left = '0';
    lightBox.style.top = '0';

    console.log('light');
  }
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  const main = document.getElementById('main');
  const header = document.getElementsByTagName('header');
  modal.style.left = '-65rem';
  main.style.opacity = 1;
  header[0].style.opacity = 1;
}
/**
 *  Function to put the name of photograph in contact modal
 * @param {string} photographerName
 */
function getPhotographerName(photographerName) {
  console.log('utils/contactFormjs');
  const namePhotographer = document.querySelector('.modal-photographer');
  namePhotographer.innerHTML += `<br> ${photographerName}`;
}
