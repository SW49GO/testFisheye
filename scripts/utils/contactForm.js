function displayModal(option) {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const divModal = document.querySelector(".modal");
  const divLightBox = document.querySelector(".lightBox");
  const header = document.getElementsByTagName("header");
  const form = document.querySelector(".modal-form");

  // Diminution de l'opacité de l'arrière plan
  // main.style.opacity = 0.5;
  // header[0].style.opacity = 0.5;
  if (option === "form") {
    console.log(option);
    modal.style.display = "block";
    form.style.display = "block";
    divModal.removeChild(divLightBox);
    main.style.opacity = 0.5;
    header[0].style.opacity = 0.5;
  }
  if (option === "lightBox") {
    console.log(option);
    modal.style.display = "block";
    form.style.display = "none";
  }
}
function closeModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  const header = document.getElementsByTagName("header");
  modal.style.display = "none";
  main.style.opacity = 1;
  header[0].style.opacity = 1;
}
/**
 *  Function to put the name of photograph in contact modal
 * @param {string} photographerName
 */
function getPhotographerName(photographerName) {
  console.log("utils/contactFormjs");
  const namePhotographer = document.querySelector(".modal-photographer");
  namePhotographer.innerHTML += `<br> ${photographerName}`;
}
