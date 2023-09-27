// function testarAlerta() {
//     alert("Testando o alerta");
// }

// function printarNome() {
//     let nome = document.querySelector("#nome").value;
//     const p = document.querySelector("#olaNome");

//     p.innerHTML = `Olá, ${nome}`;
// }

// function postFormulario() {
//     printarNome();
//     const p = document.querySelector("#teste").innerHTML = "Nome salvo com sucesso!";
//     document.querySelector("#nome").value = "";
// }

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