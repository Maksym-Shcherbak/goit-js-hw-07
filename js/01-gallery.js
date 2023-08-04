import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
let modal;
addImageToGallery();
onShowOriginalImage();

function onShowOriginalImage() {
  gallery.addEventListener("click", createModalWithImage);
}

function createImages(images) {
  return images
    .map(
      (image) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${image.original}">
                <img
                    class="gallery__image"
                    src="${image.preview}"
                    data-source="${image.original}"
                    alt="${image.description}"
                />
            </a>
        </li>`
    )
    .join("");
}

function addImageToGallery() {
  gallery.innerHTML = createImages(galleryItems);
}

function createModalWithImage(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();

  modal = basicLightbox.create(
    `
		<img width="1400" height="900" src="${replaceUrl(e)}">
	`
  );
  modal.show();
  onCloseModal();
}

function replaceUrl(img) {
  const originalUrl = img.target.dataset.source;
  img.target.src = originalUrl;
  return originalUrl;
}

function onCloseModal() {
  window.addEventListener("keydown", CheckPresslEsc);
}

function CheckPresslEsc(e) {
  if (e.code === "Escape") {
    modal.close();
  }
}
