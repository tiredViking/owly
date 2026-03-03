import { describe, it, expect, vi } from 'vitest';
import { OpenLibraryService } from '../src/services/api.service.js';

describe('OpenLibraryService', () => {
  it('dovrebbe gestire descrizioni sia come stringa che come oggetto', async () => {
    const mockResponse = { description: { value: "Testo descrizione" } };
    
    // Mock della fetch globale
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await OpenLibraryService.getBookDescription('/works/123');
    expect(result).toBe("Testo descrizione");
  });

  it('dovrebbe lanciare un errore se la risposta non è ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    await expect(OpenLibraryService.getWorksByGenre('horror')).rejects.toThrow();
  });
});
