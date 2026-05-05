
let botao = document.getElementById('btnlogar');

botao.addEventListener('click', function logar(event){
    event.preventDefault();
    let pegaUsuario = document.getElementById('usuario').value;
    let pegaSenha = document.getElementById('senha').value;
    let validaLogin = false;

    // Verifica admin fixo
    if (pegaUsuario === 'admin' && pegaSenha === 'admin') {
        window.location.href = 'homeadmin.html';
        return;
    }

    // Verifica usuários cadastrados no localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    if (usuarios[pegaUsuario] && usuarios[pegaUsuario].senha === pegaSenha) {
        window.location.href = 'homeusuario.html';
        return;
    }

    alert('Usuário ou senha inválidos.');
});

