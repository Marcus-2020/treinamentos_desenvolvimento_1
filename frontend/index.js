axios.defaults.baseURL = 'http://localhost:5259/api';

document.querySelector("#formMusica").addEventListener("submit", function(event){
    event.preventDefault();
    postFormularioMusica();
});

document.addEventListener("DOMContentLoaded", async function() {
    await getMusicas();
});

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
        await getMusicas();
    }
    
}

async function getMusicas(){
    const response =  await axios.get("/musica");
    if(response.status === 200){
        const musicas = response.data;
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

            linhaMusica.onclick = function(event) {
                const musica = event.currentTarget.data;
                document.querySelector("#NomeMusica").value = musica.nome;
                document.querySelector("#NomeAlbum").value = musica.nomeAlbum;
                document.querySelector("#AutorAlbum").value = musica.autorAlbum;
                document.querySelector("#AnoAlbum").value = musica.anoAlbum;
            }

            listasMusicas.appendChild(linhaMusica);
        });
    }
}