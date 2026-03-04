// /src/services/api.service.js
const BASE_URL = 'https://openlibrary.org';

export const OpenLibraryService = {
  /**
   * Finds books by genre
   */
  async getWorksByGenre(genre) {
    if (!genre) return [];
    const response = await fetch(`${BASE_URL}/subjects/${genre}.json`);
    if (!response.ok) throw new Error("Errore API Generi");
    const data = await response.json();
    return data.works || [];
  },

  /**
   * fetches descriptions
   */
  async getBookDescription(key) {
    const response = await fetch(`${BASE_URL}${key}.json`);
    if (!response.ok) throw new Error("Errore API Descrizione");
    const data = await response.json();
    
    if (!data.description) return "Nessuna descrizione disponibile.";
    
    // Manages description (string or object .value)
    return typeof data.description === 'string' 
      ? data.description 
      : data.description.value;
  }
};
