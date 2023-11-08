/**
 * Componente responsável por renderizar o formulário de criação de músicas.
 */
class NovaMusica extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /* html */`
            <div id="formulario">
                <form id="formMusicaCreate">
                    <div id="formBody" class="custom-container">
                        <h2 id="formTitulo">Nova Música</h2>
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
                            <button type="submit" class="my-button">Salvar</button>
                            <button class="my-button secondary" type="reset">Limpar</button>
                            <button id="formMusicaCreateCancel" class="my-button secondary" type="button">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        `;
        
        // Define o evento de click no botão de salvar
        this.querySelector("#formMusicaCreate").addEventListener("submit", function(event){
            event.preventDefault();
            postFormularioMusica();
        });
        // Define o evento de click no botão de cancelar
        this.querySelector("#formMusicaCreateCancel").addEventListener("click", async function(){
            await loadIndex();
        });
    }
}

/**
 * Envia os dados do formulário de criação de músicas para a API.
 */
async function postFormularioMusica(){
    const novaMusica = getDadosFormularioNovaMusica();
    limpaFormularioNovaMusica();
    if (await apiMusicaPost(novaMusica)) { 
        await loadIndex(await apiMusicaGetAll());
    }
}

/**
 * Obtém os dados do formulário de criação de músicas.
 * @returns {Musica} - Um objeto com os dados do formulário de criação de músicas.
 */
function getDadosFormularioNovaMusica() {
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

    return musica;
}

/**
 * Limpa os campos do formulário de criação de músicas.
 */
function limpaFormularioNovaMusica() {
    document.querySelector("#NomeMusica").value = "";
    document.querySelector("#NomeAlbum").value = "";
    document.querySelector("#AutorAlbum").value = "";
    document.querySelector("#AnoAlbum").value = "";
}

customElements.define('nova-musica', NovaMusica);