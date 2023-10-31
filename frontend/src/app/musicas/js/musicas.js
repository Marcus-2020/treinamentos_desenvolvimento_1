/**
 * Cria uma nova musica
 * @returns {Promise<void>}
 */
async function postFormularioMusica(){
    const nomeMusica = document.querySelector("#NomeMusica").value;
    const nomeAlbum = document.querySelector("#NomeAlbum").value;
    const autorAlbum = document.querySelector("#AutorAlbum").value;
    const anoAlbum = parseInt(document.querySelector("#AnoAlbum").value);

    const novaMusica = {
        nome: nomeMusica,
        nomeAlbum,
        autorAlbum,
        anoAlbum
    }

    document.querySelector("#NomeMusica").value = "";
    document.querySelector("#NomeAlbum").value = "";
    document.querySelector("#AutorAlbum").value = "";
    document.querySelector("#AnoAlbum").value = "";
    
    const res = await axios.post("/musica", novaMusica);
    
    if (res.status === 200) { 
        await renderMusicasTable();
    }
}

async function putFormularioMusica(){
    const musicaId = parseInt(document.querySelector("#musicaId").value);
    if (musicaId) {
        const nomeMusica = document.querySelector("#NomeMusica").value;
        const nomeAlbum = document.querySelector("#NomeAlbum").value;
        const autorAlbum = document.querySelector("#AutorAlbum").value;
        const anoAlbum = parseInt(document.querySelector("#AnoAlbum").value);

        const novaMusica = {
            nome: nomeMusica,
            nomeAlbum,
            autorAlbum,
            anoAlbum
        }

        document.querySelector("#NomeMusica").value = "";
        document.querySelector("#NomeAlbum").value = "";
        document.querySelector("#AutorAlbum").value = "";
        document.querySelector("#AnoAlbum").value = "";
        
        const res = await axios.put(`/musica/${musicaId}`, novaMusica);
        
        if (res.status === 200) { 
            await renderMusicasTable();
        }
    } else {
        alert("Selecione uma musica para editar");
    }
}

async function deleteMusica(musicaId) {
    if (musicaId) {
        const res = await axios.delete(`/musica/${musicaId}`);
        if (res.status === 200) {
            await renderMusicasTable();
        }
    } else {
        alert("Selecione uma musica para excluir");
    }
}

/**
 * Busca uma musica pelo id
 * @param {number} musicaId 
 * @returns {Promise<Musica>}
 */
async function getMusica(musicaId) {
    if (musicaId){ 
        const response = await axios.get(`/musica/${musicaId}`);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }
}

/**
 * Busca todas as musicas
 * @returns {Promise<Musica[]>}
 */
async function getMusicas() {
    const response = await axios.get("/musica");
    if (response.status === 200) {
        return response.data;
    }
    return [];
}

/**
 *  Renderiza a tabela de musicas
 * @returns {Promise<void>}
 */
async function renderMusicasTable(){
    const musicas = await getMusicas();
    const listasMusicas = document.querySelector("#tabelaMusica");

    if (musicas.length === 0) {
        return;
    }

    const musicasOrdenadas = musicas.sort((a, b) => a.nome.localeCompare(b.nome));

    listasMusicas.innerHTML = "";
    musicasOrdenadas.forEach(musica => {
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

        linhaMusica.onclick = function(event) {
            const musicaId = event.currentTarget.id.split("-")[1];
            loadMusicaEditForm(musicaId).then(view => {
                const main = document.querySelector("#musicasBody");
                main.innerHTML = "";
                main.appendChild(view);
            });
        }

        listasMusicas.appendChild(linhaMusica);
    });
}


async function loadIndex() {
    const main = document.querySelector("#main");
    main.innerHTML = "";

    const tableDiv = document.createElement("div");
    await renderHtml("./app/musicas/html/index.html", tableDiv);
    await renderHtml("./app/musicas/html/table.html", tableDiv.querySelector("#musicasBody"));
    tableDiv.querySelector("#btnAdicionarMusica").addEventListener("click", async function(){
        loadMusicaCreateForm().then(view => {
            const main = document.querySelector("#musicasBody");
            main.innerHTML = "";
            main.appendChild(view);
        });
    });

    main.appendChild(tableDiv.querySelector("#musicas"));
    await renderMusicasTable();
}

async function loadMusicaCreateForm() {
    const musicaFormDiv = document.createElement("div");
    musicaFormDiv.innerHTML = await getHtml("./app/musicas/html/create/create.html");
    musicaFormDiv.querySelector("#formInputs").innerHTML = await getHtml("./app/musicas/html/form.html");
    musicaFormDiv.querySelector("#formMusicaCreate").addEventListener("submit", function(event){
        event.preventDefault();
        postFormularioMusica();
    });
    musicaFormDiv.querySelector("#formMusicaCreateCancel").addEventListener("click", async function(){
        await loadIndex();
    });

    return musicaFormDiv.querySelector("#formulario");
}

async function loadMusicaEditForm(musicaId) {
    const musicaFormDiv = document.createElement("div");
    musicaFormDiv.innerHTML = await getHtml("./app/musicas/html/edit/edit.html");
    musicaFormDiv.querySelector("#formInputs").innerHTML = await getHtml("./app/musicas/html/form.html");
    musicaFormDiv.querySelector("#formMusicaEdit").addEventListener("submit", async function(event){
        event.preventDefault();
        await putFormularioMusica(musicaId);
    });
    musicaFormDiv.querySelector("#formMusicaEditDelete").addEventListener("click", async function(){
        await deleteMusica(musicaId);
        await loadIndex();
    });
    musicaFormDiv.querySelector("#formMusicaEditCancel").addEventListener("click", async function(){
        await loadIndex();
    });

    const musica = await getMusica(musicaId);
    musicaFormDiv.querySelector("#musicaId").value = musica.id;
    musicaFormDiv.querySelector("#NomeMusica").value = musica.nome;
    musicaFormDiv.querySelector("#NomeAlbum").value = musica.nomeAlbum;
    musicaFormDiv.querySelector("#AutorAlbum").value = musica.autorAlbum;
    musicaFormDiv.querySelector("#AnoAlbum").value = musica.anoAlbum;

    return musicaFormDiv.querySelector("#formulario");
}