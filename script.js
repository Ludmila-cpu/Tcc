// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão de login
    const loginButton = document.querySelector('.login-btn');

    // Adiciona o evento de clique no botão de login
    loginButton.addEventListener('click', function() {
        // Aqui você pode adicionar a lógica do login
        // Exemplo de redirecionamento para a página de login
        alert('Login clicado!');  // Para testar

        // Redireciona para a página de login (você pode alterar o URL)
        // window.location.href = 'login.html'; // Substitua com o caminho da sua página de login
    });
});
