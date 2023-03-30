function displayModal() {
  const modal = document.getElementById('contact_modal');
  const main = document.getElementById('main');
  const header = document.getElementsByTagName('header');
  modal.style.left = '50%';
  modal.style.transform = 'translateX(-50%)';
  main.style.opacity = 0.5;
  header[0].style.opacity = 0.5;
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  const main = document.getElementById('main');
  const header = document.getElementsByTagName('header');
  modal.style.left = '-65rem';
  main.style.opacity = 1;
  header[0].style.opacity = 1;
}

function getPhotographerName(photographerName) {
  console.log('utils/contactFormjs');
  const namePhotographer = document.querySelector('.modal-photographer');
  namePhotographer.innerHTML += `<br> ${photographerName}`;
}
