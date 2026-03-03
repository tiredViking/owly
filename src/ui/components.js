// src/ui/components.js
//
// Manages the creation of HTML cards 

export const createBookCard = (book) => {
  const authors = book.authors?.map(a => a.name).join(", ") || "Autore Sconosciuto";
  
  return `
    <div class="card">
      <h2 class="book_title" style="cursor:pointer">${book.title}</h2>
      <p><strong>Autori:</strong> ${authors}</p>
      <button class="description_btn" 
              data-book-key="${book.key}" 
              data-loaded="false">Mostra descrizione</button>
      <div class="description_div hidden">
        <p class="description_txt"></p>
      </div>
    </div>
  `;
};
