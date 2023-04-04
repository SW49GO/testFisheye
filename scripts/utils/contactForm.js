const modal = document.getElementById("contact_modal");
const divModal = document.querySelector(".modal");
const main = document.getElementById("main");
function displayModal(option) {
  console.log(option);
  modal.style.display = "block";
  main.style.opacity = 0.5;
  if (option === "lightBox") {
    modal.style.borderRadius = "none";
    modal.style.position = "fixed";
    divModal.style.display = "none";
    modal.style.border = "2px solid #95FFF9";
    const conteneurLightBox = modal.querySelector(".lightBox");

    console.log(conteneurLightBox);
    // Si la lightBox est présente, l'enlever
    if (conteneurLightBox) {
      modal.removeChild(conteneurLightBox);
    }
  }
  if (option === "form") {
    // Vérifier l'état du style "position" de #contact_modal
    if (getComputedStyle(modal).getPropertyValue("position") !== "absolute") {
      modal.style.position = "absolute";
    }
    modal.style.border = "none";
    const conteneurLightBox = modal.querySelector(".lightBox");
    // Si la lightBox est présente, l'enlever
    if (conteneurLightBox) {
      modal.removeChild(conteneurLightBox);
    }
    console.log(conteneurLightBox);
  }
}

function closeModal() {
  modal.style.display = "none";
  main.style.opacity = 1;
  divModal.style.display = "block";
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
