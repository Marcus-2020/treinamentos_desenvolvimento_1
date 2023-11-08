/**
 * @typedef {{id: number, nome: string, nomeAlbum: string, nomeAutor: string, anoAlbum: number}} Musica
 */

async function postFormularioMusica(){
    const novaMusica = getMusicaFromForm();
    limpaFormularioMusica();
    const res = await axios.post("/musica", novaMusica);
    if (res.status === 200) { 
        await renderizaTabelaMusicas();
    }
}

async function putFormularioMusica(){
    const musicaId = document.querySelector("#MusicaId").value;
    if (!musicaId) {
        alert("Selecione uma música para editar");
        return;    
    }
    
    const novaMusica = getMusicaFromForm();
    const res = await axios.put("/musica", novaMusica);
    if (res.status === 200) { 
        limpaFormularioMusica();
        await renderizaTabelaMusicas();
    }
}

async function deleteFormularioMusica(){
    const musicaId = document.querySelector("#MusicaId").value;
    if (!musicaId) {
        alert("Selecione uma música para excluir");
        return;    
    }
    const res = await axios.delete(`/musica/${musicaId}`);
    if (res.status === 200) { 
        limpaFormularioMusica();
        await renderizaTabelaMusicas();
    }
}

/**
 * Retorna todas as músicas cadastradas.
 * @returns {Promise<Musica[]>}
 */
async function getMusicas() {  
    const response =  await axios.get("/musica");
    if (response.status === 200) {
        return response.data;
    }   
}


async function renderizaTabelaMusicas(){
    const musicas = await getMusicas();
    const listasMusicas = document.querySelector("#tabelaMusica");

    if (musicas.length === 0) {
        return;
    } 

    listasMusicas.innerHTML = "";
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

        listasMusicas.appendChild(linhaMusica);
    });
}

function onLinhaMusicaClicked(event) {
    const musica = event.currentTarget.data;

    const form = document.querySelector("#formMusica");
    form.onsubmit = function(event) {
        event.preventDefault();
        putFormularioMusica();
    }

    formEditarMusica();
    preencheFormularioMusica(musica);
}

function preencheFormularioMusica(musica) {
    document.querySelector("#MusicaId").value = musica.id ? musica.id : "";
    document.querySelector("#NomeMusica").value = musica.nome;
    document.querySelector("#NomeAlbum").value = musica.nomeAlbum;
    document.querySelector("#AutorAlbum").value = musica.autorAlbum;
    document.querySelector("#AnoAlbum").value = musica.anoAlbum;
}

function getMusicaFromForm() {
    const musicaId = parseInt(document.querySelector("#MusicaId").value) ?? 0;
    const nomeMusica = document.querySelector("#NomeMusica").value;
    const nomeAlbum = document.querySelector("#NomeAlbum").value;
    const autorAlbum = document.querySelector("#AutorAlbum").value;
    const anoAlbum = parseInt(document.querySelector("#AnoAlbum").value);

    const musica = {
        id: musicaId,
        nome: nomeMusica,
        nomeAlbum,
        autorAlbum,
        anoAlbum
    }

    return musica;
}

function limpaFormularioMusica() {
    document.querySelector("#MusicaId").value = "";
    document.querySelector("#NomeMusica").value = "";
    document.querySelector("#NomeAlbum").value = "";
    document.querySelector("#AutorAlbum").value = "";
    document.querySelector("#AnoAlbum").value = "";
}

function formEditarMusica(){
    const formTitulo = document.querySelector("#formTitulo");
    formTitulo.innerHTML = "Editar Música";

    const btnLimpar = document.querySelector("#btnLimpar");
    btnLimpar.classList.add("d-none");

    const btnExcluir = document.querySelector("#btnExcluir");
    btnExcluir.classList.remove("d-none");
    btnExcluir.onclick = async function() {
        await deleteFormularioMusica();
    }

    const btnCancelar = document.querySelector("#btnCancelar");
    btnCancelar.classList.remove("d-none");
    btnCancelar.onclick = function(event) {
        event.preventDefault();
        formNovaMusica(formTitulo, btnLimpar, btnExcluir, btnCancelar);
        renderizaTabelaMusicas();
    }
}

function formNovaMusica(formTitulo, btnLimpar, btnExcluir, btnCancelar){
    formTitulo.innerHTML = "Nova Música";
    limpaFormularioMusica();
    btnLimpar.classList.remove("d-none");
    btnExcluir.classList.add("d-none");
    btnCancelar.classList.add("d-none");
}

async function loadIndex() {
    const main = document.querySelector("#main");
    main.innerHTML = "";

    const tableDiv = document.createElement("div");
    await renderHtml("./app/musicas/html/index.html", tableDiv);
    await renderHtml("./app/musicas/html/table.html", tableDiv.querySelector("#musicasBody"));
    tableDiv.querySelector("#btnAdicionarMusica").onclick = async function() {
        loadMusicaCreateForm().then(view => {
            const main = document.querySelector("#musicasBody");
            main.innerHTML = "";
            main.appendChild(view);
        });
    };   

    main.appendChild(tableDiv);
}

async function loadMusicaCreateForm() {
    const musicaFormDiv = document.createElement("div");
    musicaFormDiv.innerHTML = await getHtml("./app/musicas/html/create.html");
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