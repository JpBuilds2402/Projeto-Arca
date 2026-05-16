function validarLogin(event) {
    event.preventDefault();

    const user = document.getElementById('usuario').value.trim();
    const pass = document.getElementById('senha').value.trim();

    if (user === 'tutor' && pass === '123456') {
        window.location.href = 'tutor_apresentacao.html';
        
    } else if (user === 'candidato' && pass === 'cand!098') {
        window.location.href = 'candidato_apresentacao.html';
        
    } else if (user === 'Ong' && pass === 'ong$-135') {
        window.location.href = 'ong_apresentacao.html';
        
    } else if (user === 'prefeitura' && pass === 'pref@456') {
        window.location.href = 'prefeitura_apresentacao.html';
        
    } else {
        alert('Usuário ou senha inválidos! Verifique suas credenciais.');
    }
}