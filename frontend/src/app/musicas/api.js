/**
 * Retorna todas as músicas cadastradas.
 * @returns {Promise<Musica[]>}
 */
async function apiMusicaGetAll() {  
    const response =  await axios.get("/musica");
    if (response.status === 200) {
        return response.data;
    }
    return [];
}

/**
 * Realiza o cadastro de uma nova música.
 * @param {Musica} novaMusica - Uma nova música a ser cadastrada.
 * @returns {Promise<boolean>} - True se a música foi cadastrada com sucesso, false caso contrário.
 */
async function apiMusicaPost(novaMusica) {
    const response = await axios.post("/musica", novaMusica);
    return response.status === 200
}

/**
 * Atualiza uma música.
 * @param {Musica} musica - Uma música a ser atualizada.
 * @returns {Promise<boolean>} - True se a música foi atualizada com sucesso, false caso contrário.
 */
async function apiMusicaPut(musica) {
    const response = await axios.put("/musica", musica);
    return response.status === 200
}

/**
 * Exclui uma música.
 * @param {number} musicaId - O id de uma música a ser excluída.
 * @returns {Promise<boolean>} - True se a música foi excluída com sucesso, false caso contrário.
 */
async function apiMusicaDelete(musicaId) {
    const response = await axios.delete(`/musica/${musicaId}`);
    return response.status === 200
}