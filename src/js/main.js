import { OpenLibraryService } from '@js/services/api.service.js';
import { createBookCard } from '@js/ui/components.js';
import { UIRenderer } from '@js/ui/render.js';

const search_form = document.forms["search_form"];
const search_input = document.querySelector("#search_bar");
const result_section = document.querySelector("#show_result_section");
const logo = document.getElementById("main_logo");

// Gestione Ricerca
search_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const genre = search_input.value.trim().toLowerCase();
  if (!genre) return;

	document.body.classList.add("has_searched");

  UIRenderer.renderLoader(result_section);

  try {
    const works = await OpenLibraryService.getWorksByGenre(genre);
    UIRenderer.clearContainer(result_section);
    
    works.forEach(book => {
      result_section.insertAdjacentHTML('beforeend', createBookCard(book));
    });
  } catch (error) {
    result_section.innerHTML = "Errore durante la ricerca.";
    console.error(error);
  }
});

// Event Delegation per Titolo e Bottone
result_section.addEventListener("click", async (e) => {
  const is_title = e.target.classList.contains("book_title");
  const is_btn = e.target.classList.contains("description_btn");

  if (is_title || is_btn) {
    const card = e.target.closest(".card");
    const btn = card.querySelector(".description_btn");
    const desc_div = card.querySelector(".description_div");
    const desc_text = card.querySelector(".description_txt");
    const key = btn.dataset.bookKey;

    // Toggle visibilità
    const is_hidden = desc_div.classList.toggle("hidden");
    btn.textContent = is_hidden ? "Mostra descrizione" : "Nascondi descrizione";

    // Caricamento Lazy della descrizione
    if (btn.dataset.loaded === "false") {
      desc_text.innerHTML = "Caricamento...";
      try {
        const description = await OpenLibraryService.getBookDescription(key);
        desc_text.textContent = description;
        btn.dataset.loaded = "true";
      } catch (err) {
        desc_text.textContent = "Errore nel caricamento.";
      }
    }
  }
});

// Gestione logo
logo.addEventListener("click", (e) => {
	e.preventDefault();
	window.location.reload();
})
