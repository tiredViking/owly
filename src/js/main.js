import { OpenLibraryService } from './src/services/api.service.js';
import { createBookCard } from './src/ui/components.js';
import { UIRenderer } from './src/ui/render.js';

const searchForm = document.forms["search_form"];
const searchInput = document.querySelector("#search_bar");
const resultSection = document.querySelector("#show_result_section");

// Gestione Ricerca
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const genre = searchInput.value.trim().toLowerCase();
  if (!genre) return;

  UIRenderer.renderLoader(resultSection);

  try {
    const works = await OpenLibraryService.getWorksByGenre(genre);
    UIRenderer.clearContainer(resultSection);
    
    works.forEach(book => {
      resultSection.insertAdjacentHTML('beforeend', createBookCard(book));
    });
  } catch (error) {
    resultSection.innerHTML = "Errore durante la ricerca.";
    console.error(error);
  }
});

// Event Delegation per Titolo e Bottone
resultSection.addEventListener("click", async (e) => {
  const isTitle = e.target.classList.contains("book_title");
  const isBtn = e.target.classList.contains("description_btn");

  if (isTitle || isBtn) {
    const card = e.target.closest(".card");
    const btn = card.querySelector(".description_btn");
    const descDiv = card.querySelector(".description_div");
    const descText = card.querySelector(".description_txt");
    const key = btn.dataset.bookKey;

    // Toggle visibilità
    const isHidden = descDiv.classList.toggle("hidden");
    btn.textContent = isHidden ? "Mostra descrizione" : "Nascondi descrizione";

    // Caricamento Lazy della descrizione
    if (btn.dataset.loaded === "false") {
      descText.innerHTML = "Caricamento...";
      try {
        const description = await OpenLibraryService.getBookDescription(key);
        descText.textContent = description;
        btn.dataset.loaded = "true";
      } catch (err) {
        descText.textContent = "Errore nel caricamento.";
      }
    }
  }
});
