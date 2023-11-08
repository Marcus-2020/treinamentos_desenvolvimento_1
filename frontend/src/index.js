axios.defaults.baseURL = 'http://localhost:5259/api';

document.addEventListener("DOMContentLoaded", async function() {
    await loadIndex();
});