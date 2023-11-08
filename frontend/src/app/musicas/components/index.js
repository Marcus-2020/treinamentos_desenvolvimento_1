/**
 * Componente responsável por renderizar a página inicial de músicas.
 */
class IndexMusicas extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = /* html */`
            <div id="musicas">
                <div>
                    <slot name="titulo"></slot>
                    <div id="musicasBody">
                        <slot name="musica-body">Empty</slot>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('index-musicas', IndexMusicas);