/**
 * Componente responsável por renderizar o formulário de edição de músicas.
 */
class EditaMusica extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /* html */`
            <div id="formulario">
                <form id="formMusicaEdit">
                    <input id="MusicaId" type="hidden" name="Id" value="">
                    <div id="formBody" class="custom-container">
                        <h2 id="formTitulo">Editar Música</h2>
                        <div id="formInputs">
                            <div class="mb-1">
                                <input id="NomeMusica" type="text" name="Nome" value="" placeholder="Digite o nome">
                            </div>
                            <div class="mb-1">
                                <input id="NomeAlbum" type="text" name="Album" value="" placeholder="Digite o nome do Álbum">
                            </div>
                            <div class="mb-1">
                                <input id="AutorAlbum" type="text" name="Autor" value="" placeholder="Digite o Autor do Álbum">
                            </div>
                            <div>
                                <input id="AnoAlbum" type="number" name="Ano" value="" placeholder="Digite o Ano do Álbum">
                            </div>
                        </div>
                        <div id="formActions" class="d-flex flex-column w-100 align-items-center gap-1 mt-2">
                            <button class="my-button" type="submit">Salvar</button>
                            <button id="formMusicaEditDelete" class="my-button secondary" type="button">Excluir</button>
                            <button id="formMusicaEditCancel" class="my-button secondary" type="button">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        `;

        this.querySelector("#formMusicaEdit").addEventListener("submit", async function(event){
            event.preventDefault();
            const musicaId = parseInt(document.querySelector("#MusicaId").value) ?? 0;
            await putFormularioMusica(musicaId);
        });
        this.querySelector("#formMusicaEditDelete").addEventListener("click", async function(){
            const musicaId = parseInt(document.querySelector("#MusicaId").value) ?? 0;
            await deleteFormularioMusica(musicaId);
        });
        this.querySelector("#formMusicaEditCancel").addEventListener("click", async function(){
            await loadIndex();
        });
    }
}

/**
 * Envia os dados do formulário de edição de músicas para a API.
 * @param {number} musicaId - O id da música a ser editada.
 * @returns {Promise<void>} - Uma promise vazia. Retona o usuário para a página inicial de músicas.
 */
async function putFormularioMusica(musicaId){
    if (!musicaId) {
        alert("Selecione uma música para editar");
        return;    
    }
    const musicaUpdate = getDadosFormularioEditaMusica();
    apiMusicaPut(musicaUpdate).then(async (res) => { 
        if (res) {
            limpaFormularioEditaMusica();
            await loadIndex();
        }
    });
}

/**
 * Exclui uma música.
 * @param {number} musicaId - O id da música a ser excluída.
 * @returns {Promise<void>} - Uma promise vazia. Retona o usuário para a página inicial de músicas.
 */
async function deleteFormularioMusica(musicaId){
    if (!musicaId) {
        alert("Selecione uma música para excluir");
        return;    
    }
    apiMusicaDelete(musicaId).then(async (res) => {
        if (res) {
            limpaFormularioEditaMusica();
            await loadIndex();
        }
    });
}

/**
 * Obtém os dados do formulário de edição de músicas.
 * @returns {Musica} - Um objeto com os dados do formulário de edição de músicas.
 */
function getDadosFormularioEditaMusica() {
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

/**
 * Limpa os campos do formulário de edição de músicas.
 */
function limpaFormularioEditaMusica() {
    document.querySelector("#MusicaId").value = "";
    document.querySelector("#NomeMusica").value = "";
    document.querySelector("#NomeAlbum").value = "";
    document.querySelector("#AutorAlbum").value = "";
    document.querySelector("#AnoAlbum").value = "";
}

customElements.define('edita-musica', EditaMusica);