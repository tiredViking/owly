// src/ui/render.js
//
// Manages the rendering of the loader div
export const UIRenderer = {
  renderLoader(container) {
    container.innerHTML = `
			<div class="loader_container">
				<div class="loader"></div> 
				<div class="loader_text">Caricamento...</div>
			</div>
		`;
  },
  
  clearContainer(container) {
    container.innerHTML = "";
  }
};
