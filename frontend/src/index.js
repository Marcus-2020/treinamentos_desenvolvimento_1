/**
 * @typedef {id: number, nome: string , nomeAlbum: string, autorAlbum: string, anoAlbum: number} Musica
 */

axios.defaults.baseURL = 'http://localhost:5259/api';

document.addEventListener("DOMContentLoaded", async function() {
    await loadIndex();
});