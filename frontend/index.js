function testarAlerta() {
    alert("Testando o alerta");
}

function printarNome() {
    let nome = document.querySelector("#nome").value;
    const p = document.querySelector("#olaNome");

    p.innerHTML = `Olá, ${nome}`;
}

function postFormulario() {
    printarNome();
    const p = document.querySelector("#teste").innerHTML = "Nome salvo com sucesso!";
    document.querySelector("#nome").value = "";
}