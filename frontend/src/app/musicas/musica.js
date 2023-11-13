//#region Renderização

/**
 * Renderiza a tabela de músicas.
 * @param {Musica[]} musicas 
 * @returns {Promise<void>}
 */
function renderizaTabelaMusicas(musicas){
    const tabelaMusicas = document.querySelector("#tabela-musicas");

    if (musicas.length === 0) {
        return;
    }

    tabelaMusicas.innerHTML = "";
    musicas.forEach(musica => {
        const linhaMusica = document.createElement("tr");
        linhaMusica.id = `musica-${musica.id}`;
        linhaMusica.data = musica;
        const tdNome = document.createElement("td");
        const tdNomeAlbum = document.createElement("td");  
        const tdAutorAlbum = document.createElement("td");
        const tdAnoAlbum = document.createElement("td");

        tdNome.innerText = musica.nome;
        tdNomeAlbum.innerText = musica.nomeAlbum;
        tdAutorAlbum.innerText = musica.autorAlbum;
        tdAnoAlbum.innerText = musica.anoAlbum;

        linhaMusica.appendChild(tdNome);
        linhaMusica.appendChild(tdNomeAlbum);
        linhaMusica.appendChild(tdAutorAlbum);
        linhaMusica.appendChild(tdAnoAlbum);

        linhaMusica.onclick = onLinhaMusicaClicked;

        tabelaMusicas.appendChild(linhaMusica);
    });
}

/**
 * Handles the click event on a music row.
 * 
 * @param {EventWithMusica} event - The click event.
 */
function onLinhaMusicaClicked(event) {
    const musica = event.currentTarget.data;
    const indexMusicas = document.querySelector("index-musicas");

    const div = document.createElement("div");
    div.innerHTML = /* html */`
        <index-musicas>
            <h1 slot="titulo" class="text-center mb-5">Editar Música</h1>
            <edita-musica slot="musica-body"></edita-musica>
        </index-musicas>
    `;

    indexMusicas.replaceWith(div.querySelector("index-musicas"));
    preencheFormularioMusica(musica);
}

function preencheFormularioMusica(musica) {
    document.querySelector("#MusicaId").value = musica.id ? musica.id : "";
    document.querySelector("#NomeMusica").value = musica.nome;
    document.querySelector("#NomeAlbum").value = musica.nomeAlbum;
    document.querySelector("#AutorAlbum").value = musica.autorAlbum;
    document.querySelector("#AnoAlbum").value = musica.anoAlbum;
}

/**
 * Carrega a página inicial de músicas e renderiza a tabela de músicas.
 */
async function loadIndex() {
    const main = document.querySelector("#main");
    main.innerHTML = "";

    const tableDiv = document.createElement("div");
    tableDiv.innerHTML = /* html */`
        <index-musicas>
            <h1 slot="titulo" class="text-center mb-5">Minhas Músicas</h1>
            <tabela-musicas slot="musica-body"></tabela-musicas>
        </index-musicas>
    `

    main.appendChild(tableDiv);

    musicas = await apiMusicaGetAll();
    await renderizaTabelaMusicas(musicas);
}

/**
 * Carrega o formulário de criação de músicas.
 * @returns {Promise<HTMLElement>}
 */
async function loadMusicaCreateForm() {
    const musicaFormDiv = document.createElement("div");
    musicaFormDiv.innerHTML = /* html */`
        <index-musicas>
            <h1 slot="titulo" class="text-center mb-5">Nova Música</h1>
            <nova-musica slot="musica-body"></nova-musica>
        </index-musicas>
    `
    return musicaFormDiv.querySelector("index-musicas");
}

/**
 * Carrega o formulário de edição de músicas.
 * @param {number} musicaId 
 * @returns {Promise<HTMLElement>}
 */
async function loadMusicaEditForm(musicaId) {
    const musicaFormDiv = document.createElement("div");
    musicaFormDiv.innerHTML = /* html */`
        <index-musicas>
            <h1 slot="titulo" class="text-center mb-5">Editar Música</h1>
            <edita-musica slot="musica-body"></edita-musica>
        </index-musicas>
    `
    
    musicaFormDiv.querySelector("edita-musica").musicaId = musicaId;

    const musica = await getMusica(musicaId);    
    musicaFormDiv.querySelector("#MusicaId").value = musica.id;
    musicaFormDiv.querySelector("#NomeMusica").value = musica.nome;
    musicaFormDiv.querySelector("#NomeAlbum").value = musica.nomeAlbum;
    musicaFormDiv.querySelector("#AutorAlbum").value = musica.autorAlbum;
    musicaFormDiv.querySelector("#AnoAlbum").value = musica.anoAlbum;

    return musicaFormDiv.querySelector("index-musicas");
}

//#endregion