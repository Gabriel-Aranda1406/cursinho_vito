document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('myForm');
    const loadingMessage = document.getElementById('loading-message'); // Elemento de carregamento
    const successMessage = document.getElementById('success-message'); // Mensagem de sucesso

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Validação dos campos do formulário
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Validação do nome
        if (!nameInput.value) {
            displayError(nameInput, "Por favor, insira seu nome.");
            return false;
        } else {
            clearError(nameInput);
        }

        // Validação do email
        if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            displayError(emailInput, "Por favor, insira um email válido.");
            return false;
        } else {
            clearError(emailInput);
        }

        // Validação do assunto
        if (!subjectInput.value) {
            displayError(subjectInput, "Por favor, insira o assunto.");
            return false;
        } else {
            clearError(subjectInput);
        }

        // Validação da mensagem
        if (!messageInput.value) {
            displayError(messageInput, "Por favor, insira a mensagem.");
            return false;
        } else {
            clearError(messageInput);
        }

        // Mostrar mensagem de carregamento
        loadingMessage.style.display = 'block';

        // Formulário é válido, enviar dados para o servidor
        const formData = new FormData(form);
        fetch(form.getAttribute('action'), {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Envio bem-sucedido
                successMessage.style.display = 'block'; // Exibe a mensagem de sucesso

                // Ocultar mensagem de sucesso após 15 segundos
                setTimeout(function () {
                    successMessage.style.display = 'none';
                }, 15000); // 15 segundos em milissegundos

                form.reset(); // Limpa o formulário após o envio bem-sucedido
            } else {
                // Envio falhou
                alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");
            }
        })
        .catch(error => {
            // Erro de rede
            alert("Ocorreu um erro de rede ao enviar o formulário. Por favor, verifique sua conexão e tente novamente.");
        })
        .finally(() => {
            // Ocultar mensagem de carregamento após o envio
            loadingMessage.style.display = 'none';
        });
    });

    // Função para exibir mensagens de erro (seu código de exibir e limpar erros aqui...)

    function displayError(inputElement, errorMessage) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.innerText = errorMessage;
        errorElement.style.display = 'block';
    }

    function clearError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        errorElement.innerText = '';
        errorElement.style.display = 'none';
    }
});
