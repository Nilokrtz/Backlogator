var formulario = document.getElementById('meu-formulario');

var campoNome = document.getElementById('nome');
var campoIdade = document.getElementById('idade');
var campoEmail = document.getElementById('email');
var campoJogo = document.getElementById('nome_jogo');
var campoPlataforma = document.getElementById('plataforma');
var campoGenero = document.getElementById('genero');
var campoSugestao = document.getElementById('sugestao');

var erroNome = document.getElementById('erro-nome');
var erroIdade = document.getElementById('erro-idade');
var erroEmail = document.getElementById('erro-email');
var erroJogo = document.getElementById('erro-jogo');
var erroPlataforma = document.getElementById('erro-plataforma');
var erroGenero = document.getElementById('erro-genero');
var erroSugestao = document.getElementById('erro-sugestao');

var generosValidos = ['Ação', 'RPG', 'Estratégia', 'Simulação', 'Esportes', 'FPS'];

function validarNome(valor) {
    var texto = valor.trim();
    if (texto === '') return 'O nome é obrigatório.';
    if (texto.length < 2) return 'O nome deve ter pelo menos 2 letras.';
    if (!/^[\p{L}\s]+$/u.test(texto)) return 'O nome deve conter apenas letras e espaços.';
    return '';
}

function validarIdade(valor) {
    var texto = valor.trim();
    if (texto === '') return 'A idade é obrigatória.';
    var numero = parseInt(texto);
    if (isNaN(numero)) return 'Digite um número válido.';
    if (numero < 1) return 'A idade deve ser maior que 0.';
    if (numero > 120) return 'A idade deve ser menor que 120.';
    return '';
}

function validarEmail(valor) {
    var texto = valor.trim();
    if (texto === '') return 'O e-mail é obrigatório.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) return 'Digite um e-mail válido (ex: nome@email.com).';
    return '';
}

function validarJogo(valor) {
    var texto = valor.trim();
    if (texto === '') return 'O jogo favorito é obrigatório.';
    if (texto.length < 2) return 'O nome do jogo deve ter pelo menos 2 letras.';
    return '';
}

function validarPlataforma(valor) {
    var texto = valor.trim();
    if (texto === '') return 'A plataforma é obrigatória.';
    return '';
}

function validarGenero(valor) {
    var texto = valor.trim();
    if (texto === '') return 'Escolha um tipo de jogo.';
    var encontrado = false;
    for (var i = 0; i < generosValidos.length; i++) {
        if (generosValidos[i].toLowerCase() === texto.toLowerCase()) {
            encontrado = true;
            break;
        }
    }
    if (!encontrado) return 'Escolha um tipo válido da lista.';
    return '';
}

function validarSugestao(valor) {
    var texto = valor.trim();
    if (texto !== '' && texto.length < 10) return 'A sugestão deve ter pelo menos 10 caracteres.';
    return '';
}

function aplicarErro(campo, spanErro, mensagem) {
    if (mensagem !== '') {
        spanErro.textContent = mensagem;
        campo.classList.add('erro');
        campo.classList.remove('valido');
    } else {
        spanErro.textContent = '';
        campo.classList.remove('erro');
        campo.classList.add('valido');
    }
}

formulario.addEventListener('submit', function (evento) {
    var rNome = validarNome(campoNome.value);
    var rIdade = validarIdade(campoIdade.value);
    var rEmail = validarEmail(campoEmail.value);
    var rJogo = validarJogo(campoJogo.value);
    var rPlataforma = validarPlataforma(campoPlataforma.value);
    var rGenero = validarGenero(campoGenero.value);
    var rSugestao = validarSugestao(campoSugestao.value);

    aplicarErro(campoNome, erroNome, rNome);
    aplicarErro(campoIdade, erroIdade, rIdade);
    aplicarErro(campoEmail, erroEmail, rEmail);
    aplicarErro(campoJogo, erroJogo, rJogo);
    aplicarErro(campoPlataforma, erroPlataforma, rPlataforma);
    aplicarErro(campoGenero, erroGenero, rGenero);
    aplicarErro(campoSugestao, erroSugestao, rSugestao);

    var temErro = rNome !== '' || rIdade !== '' || rEmail !== '' ||
        rJogo !== '' || rPlataforma !== '' || rGenero !== '' || rSugestao !== '';

    if (temErro) {
        evento.preventDefault();
        var primeiroErro = document.querySelector('.erro');
        if (primeiroErro) {
            primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
            primeiroErro.focus();
        }
    } else {
        evento.preventDefault();
        alert('Formulário enviado com sucesso! Obrigado pela opinião!');
        formulario.reset();
        var todosValidos = document.querySelectorAll('.valido');
        for (var i = 0; i < todosValidos.length; i++) {
            todosValidos[i].classList.remove('valido');
        }
        var todosErros = document.querySelectorAll('.mensagem-erro');
        for (var i = 0; i < todosErros.length; i++) {
            todosErros[i].textContent = '';
        }
    }
});

campoNome.addEventListener('input', function () {
    aplicarErro(campoNome, erroNome, validarNome(campoNome.value));
});

campoIdade.addEventListener('input', function () {
    aplicarErro(campoIdade, erroIdade, validarIdade(campoIdade.value));
});

campoEmail.addEventListener('input', function () {
    aplicarErro(campoEmail, erroEmail, validarEmail(campoEmail.value));
});

campoJogo.addEventListener('input', function () {
    aplicarErro(campoJogo, erroJogo, validarJogo(campoJogo.value));
});

campoPlataforma.addEventListener('input', function () {
    aplicarErro(campoPlataforma, erroPlataforma, validarPlataforma(campoPlataforma.value));
});

campoGenero.addEventListener('input', function () {
    aplicarErro(campoGenero, erroGenero, validarGenero(campoGenero.value));
});

campoSugestao.addEventListener('input', function () {
    aplicarErro(campoSugestao, erroSugestao, validarSugestao(campoSugestao.value));
});
