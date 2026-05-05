// Função para salvar dados após a pessoa clicar em Registre-se
function salvarDados(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    usuarios[email] = { nome, senha };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Registro bem-sucedido!");
    window.location.href = "index.html";
}

// Adiciona o event listener ao botão após o carregamento da página
window.onload = function() {
    const botaoregistro = document.getElementById('btnregistro');
    if (botaoregistro) {
        botaoregistro.addEventListener('click', salvarDados);
    }
}