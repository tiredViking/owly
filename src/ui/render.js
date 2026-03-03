// src/ui/render.js
//
// Manages the rendering of the loader div
export const UIRenderer = {
  renderLoader(container) {
    container.innerHTML = `<div class="loader"></div> Caricamento...`;
  },
  
  clearContainer(container) {
    container.innerHTML = "";
  }
};
