/**
 * Renderiza um html em um elemento
 * @param {string} path 
 * @param {HTMLElement} element 
 */
function renderHtml(path, element) {
    return getHtml(path)
        .then(html => {
            element.innerHTML = html;
        });
}

/**
 * Retorna o html de um arquivo
 * @param {string} path 
 * @returns {string}
 */
function getHtml(path) {
    return fetch(path)
        .then(response => response.text());
}