function displayModal() {
  const modal = document.getElementById('contact_modal');
  const modalInside = document.getElementsByTagName('form')[0];
  const title = document.querySelector('.modal-photographer');
  const main = document.getElementById('main');
  const header = document.getElementsByTagName('header');
  modal.style.display = 'block';
  modalInside.style.display = 'block';
  title.style.display = 'block';
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
