function displayModal() {
  const modal = document.getElementById('contact_modal');
  const main = document.getElementById('main');
  const header = document.getElementsByTagName('header');
  const caroussel = document.querySelector('.caroussel');
  const form = document.querySelector('.modal-form');
  modal.style.display = 'block';
  if (caroussel) {
    caroussel.style.display = 'none';
  }
  if (form) {
    form.style.display = 'block';
  }
  main.style.opacity = 0.5;
  header[0].style.opacity = 0.5;
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  const main = document.getElementById('main');
  const header = document.getElementsByTagName('header');
  modal.style.display = 'none';
  main.style.opacity = 1;
  header[0].style.opacity = 1;
}

function getPhotographerName(photographerName) {
  console.log('utils/contactFormjs');
  const namePhotographer = document.querySelector('.modal-photographer');

  namePhotographer.innerHTML += `<br> ${photographerName}`;
}
