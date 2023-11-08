/**
 * Renderiza o HTML de uma página em um elemento.
 * @param {string} path 
 * @param {HTMLElement} element 
 */
function renderHtml(path, element) {
    return getHtml(path).then(html => {
        element.innerHTML = html;
    });
}

/**
 * Retorna o HTML de uma página.
 * @param {string} path 
 * @returns {Promise<string>}
 */
function getHtml(path) {
    return fetch(path).then(response => response.text());
}