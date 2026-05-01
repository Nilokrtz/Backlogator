const usuarios = [
    {
        login: 'admin',
        pass: 'admin'
    },
    {
        login: 'user1',
        pass: 'user1'
    },
    {
        login: 'user2',
        pass: 'user2'
    }
]

let botao = document.getElementById('btnlogar')

botao.addEventListener('click', function logar(){
    
    let pegaUsuario = document.getElementById('usuario').value
    let pegaSenha = document.getElementById('senha').value
    let validaLogin = false

    for(let i in usuarios){ 
         if(pegaUsuario == usuarios[i].login && pegaSenha == usuarios[i].pass){
                validaLogin = true
            break
        }

    }

    if (validaLogin == true && pegaUsuario == 'admin' && pegaSenha == 'admin'){
        location.href ='homeadmin.html'
    } else if (validaLogin == true){
        location.href ='homeusuario.html'
    } else {
        alert('Usuário ou senha inválidos.')
    }
})

