/**
 * @typedef {id?: number, nome: string , nomeAlbum: string, autorAlbum: string, anoAlbum: number} Musica
 */

axios.defaults.baseURL = 'http://localhost:5259/api';

document.addEventListener("DOMContentLoaded", async function() {
    await renderMusicasTable();
    document.querySelector("#formMusica").onsubmit = async function(event) {
        event.preventDefault();
        await postFormularioMusica();
    }
});

/**
 * Envia os dados do formulario de musica para o backend
 * @returns {Promise<void>}
 */
async function postFormularioMusica(){
    const novaMusica = getMusicaFromForm();
    limpaMusicaForm();
    const res = await axios.post("/musica", novaMusica);
    if (res.status === 200) { 
        await renderMusicasTable();
        alert("Musica adicionada com sucesso");
    } else {
        alert("Erro ao adicionar musica");
    }
}

/**
 * Envia os dados do formulario de musica para o backend
 * @returns {Promise<boolean>}
 */
async function putFormularioMusica() {
    const musicaId = parseInt(document.querySelector("#musicaId").value);
    if (musicaId) {
        const novaMusica = getMusicaFromForm(true);
        limpaMusicaForm();
        const res = await axios.put(`/musica`, novaMusica);
        if (res.status === 200) { 
            await renderMusicasTable();
            alert("Musica atualizada com sucesso");
            return true;
        } else {
            alert("Erro ao atualizar musica");
        }
    } else {
        alert("Selecione uma musica para editar");
    }
    return false;
}

/**
 * Exclui uma musica pelo id no backend
 * @param {number} musicaId 
 */
async function deleteMusica(musicaId) {
    if (musicaId) {
        const res = await axios.delete(`/musica/${musicaId}`);
        if (res.status === 200) {
            alert("Musica excluida com sucesso");
            await renderMusicasTable();
        } else {
            alert("Erro ao excluir musica");
        }
    } else {
        alert("Selecione uma musica para excluir");
    }
}

/**
 * Busca uma musica pelo id no backend
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
            const musica = event.currentTarget.data;
            musicaEditLoad(musica);
        }

        listasMusicas.appendChild(linhaMusica);
    });
}

/**
 * Carrega o formulario de edição de musica
 * @param {Musica} musica 
 */
function musicaEditLoad(musica) {
    const form = document.querySelector("#formMusica");
    form.onsubmit = async function(event) {
        event.preventDefault();
        const sucesso = await putFormularioMusica();
        if (!sucesso) return;
    }

    const formTitle = document.querySelector("#formTitle");
    formTitle.innerText = "Editar Musica";

    const btnReset = document.querySelector("#formMusicaReset");
    btnReset.classList.add("d-none");

    const btnDelete = document.querySelector("#formMusicaDelete");
    btnDelete.classList.remove("d-none");
    btnDelete.onclick = async function() {
        await deleteMusica(musica.id);
    };

    const btnCancel = document.querySelector("#formMusicaCancel");
    btnCancel.classList.remove("d-none");
    btnCancel.onclick = musicaEditCancel;

    preencheMusicaForm(musica);
}

/**
 * Cancela a edição de uma musica
 */
function musicaEditCancel() {
    limpaMusicaForm();

    const formTitle = document.querySelector("#formTitle");
    formTitle.innerText = "Adicionar Musica";

    const btnReset = document.querySelector("#formMusicaReset");
    btnReset.classList.remove("d-none");

    const btnDelete = document.querySelector("#formMusicaDelete");
    btnDelete.classList.add("d-none");

    const btnCancel = document.querySelector("#formMusicaCancel");
    btnCancel.classList.add("d-none");

    const form = document.querySelector("#formMusica");
    form.onsubmit = async function(event) {
        event.preventDefault();
        await postFormularioMusica();
    }
}

/**
 * Limpa o formulario de musica
 */
function limpaMusicaForm() {
    document.querySelector("#musicaId").value = "";
    document.querySelector("#NomeMusica").value = "";
    document.querySelector("#NomeAlbum").value = "";
    document.querySelector("#AutorAlbum").value = "";
    document.querySelector("#AnoAlbum").value = "";
}

/**
 * Preence o formulario de musica
 * @param {Musica} musica 
 */
function preencheMusicaForm(musica) {
    document.querySelector("#musicaId").value = musica.id;
    document.querySelector("#NomeMusica").value = musica.nome;
    document.querySelector("#NomeAlbum").value = musica.nomeAlbum;
    document.querySelector("#AutorAlbum").value = musica.autorAlbum;
    document.querySelector("#AnoAlbum").value = musica.anoAlbum;
}

/**
 * Busca os dados do formulario de musica
 * @param {number} [comId=false]
 * @returns {Musica}
 */
function getMusicaFromForm(comId = false) {
    const musicaId = comId ? parseInt(document.querySelector("#musicaId").value) : null;
    const nomeMusica = document.querySelector("#NomeMusica").value;
    const nomeAlbum = document.querySelector("#NomeAlbum").value;
    const autorAlbum = document.querySelector("#AutorAlbum").value;
    const anoAlbum = parseInt(document.querySelector("#AnoAlbum").value);

    const musica = {
        nome: nomeMusica,
        nomeAlbum,
        autorAlbum,
        anoAlbum
    }

    if (musicaId) {
        musica.id = musicaId;
    }

    return musica;
}