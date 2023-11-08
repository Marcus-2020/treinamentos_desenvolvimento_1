/**
 * Componente responsável por exibir a tabela de músicas
 */
class TabelaMusicas extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /* html */`
            <div class="my-table mt-3">
                <div class="d-flex flex-row gap-3 my-3 w-100 justify-content-end">
                    <button class="my-button w-25" id="btnAdicionarMusica">Nova Música</button>
                </div>
                <table class="table table-striped table-hover">
                    <thead class="thead-purple">
                        <tr>
                            <th>Nome</th>
                            <th>Album</th>
                            <th>Autor</th>
                            <th>Ano</th>
                        </tr>
                    </thead>
                    <tbody id="tabela-musicas">
                        <tr>
                            <td colspan="4">
                                Nenhum registro encontrado
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <style>
                .my-table {
                    max-width: 80%;
                    margin: 0 auto;
                    padding: 1rem;
                }
            </style>
        `;
        
        // Define o evento de click no botão de adicionar música
        this.querySelector("#btnAdicionarMusica").onclick = async function() {
            loadMusicaCreateForm().then(view => {
                const main = document.querySelector("index-musicas");
                main.replaceWith(view);
            });
        };   
    }
}

customElements.define('tabela-musicas', TabelaMusicas);