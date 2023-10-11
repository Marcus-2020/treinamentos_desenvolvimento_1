axios.defaults.baseURL = 'http://localhost:5259/api';

document.querySelector("#formMusica").addEventListener("submit", function(event){
    event.preventDefault();
    postFormularioMusica();
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

    alert("Dados Salvos");
    await axios.post("/musica", novaMusica);

    console.log(novaMusica);
}

async function getMusicas(){
    const response =  await axios.get("/musica");
    if(response.status === 200){
        const musicas = response.data;
        const listasMusicas = document.querySelector("#tabelaMusica");
        
        musicas.forEach(musica => {
            const linhaMusica = document.createElement("tr");
            linhaMusica.id = `musica-${musica.id}`;
           // linhaMusica.data = musica;
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

            listasMusicas.appendChild(linhaMusica);
            
            // <tbody id="tabelaMusica"> 
            //     <tr>
            //         <td>Nome</td>
            //         <td>Nome Album</td>
            //         <td>Autor Album</td>
            //         <td>Ano Album</td>
            //     </tr>
            // </tbody>
        });
    }
}