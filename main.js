// Função para carregar o conteúdo do arquivo HTML
function loadContent(page, cssFile) {
    const mainContent = document.getElementById('main-content');
    const dynamicCss = document.getElementById('dynamic-css');

    // Adiciona a animação de saída ao conteúdo atual
    mainContent.classList.add('slide-out-left');

    // Aguarda a animação de saída antes de carregar o novo conteúdo
    setTimeout(() => {
        fetch(page)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar o conteúdo');
                return response.text();
            })
            .then(data => {
                // Atualiza o conteúdo do main-content
                mainContent.innerHTML = data;

                // Adiciona o CSS específico, se fornecido
                if (cssFile) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = cssFile;
                    document.head.appendChild(link); // Adiciona o novo CSS ao cabeçalho
                }

                // Remove a classe de saída e adiciona a classe de entrada
                mainContent.classList.remove('slide-out-left');
                mainContent.classList.add('slide-in-right');

                // Reanexa o script de formatação se o conteúdo carregado for o de contato
                if (page.includes("contato.html")) {
                    attachPhoneFormatter();
                }
            })
            .catch(error => {
                mainContent.innerHTML = `<p>${error.message}</p>`;
                // Remove a animação de saída em caso de erro
                mainContent.classList.remove('slide-out-left');
            });
    }, 500); // Tempo da animação de saída
}

// Função para anexar a formatação do número de celular
function attachPhoneFormatter() {
    const celularInput = document.getElementById("celular");
    if (celularInput) {
        celularInput.addEventListener("input", function() {
            let value = celularInput.value.replace(/\D/g, ""); // Remove tudo que não é número
            if (value.length > 11) value = value.slice(0, 11); // Limita ao máximo de 11 dígitos

            const formatted = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
                                    .replace(/^(\d{2})(\d{4})$/, "($1) $2"); // Aplica a formatação

            celularInput.value = formatted;
        });
    }
}

// Adiciona eventos de clique aos links de navegação
document.getElementById('apresentacao-link').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    loadContent('/pages/apresentacao/apresentacao.html', '/pages/apresentacao/apresentacao.css'); // Carrega o conteúdo da apresentação
});

document.getElementById('funcionalidades-link').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    loadContent('/pages/funcionalidades/funcionalidades.html', '/pages/funcionalidades/funcionalidades.css'); // Carrega o conteúdo de funcionalidades
});

document.getElementById('sobre-link').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    loadContent('/pages/sobre/sobre.html', '/pages/sobre/sobre.css'); // Carrega o conteúdo da página sobre
});

document.getElementById('contato-link').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    loadContent('/pages/contato/contato.html', '/pages/contato/contato.css'); // Carrega o conteúdo da página de contato
});

// Carrega o conteúdo padrão ao abrir a página
loadContent('/pages/apresentacao/apresentacao.html', '/pages/apresentacao/apresentacao.css');

// Menu Mobile
document.addEventListener('DOMContentLoaded', () => {
    const btnAbrirMenu = document.querySelector('.btn-abrir-menu');
    const btnFecharMenu = document.querySelector('.btn-fechar');
    const menuMobile = document.querySelector('.menu-mobile');

    // Quando o ícone de abrir o menu for clicado
    btnAbrirMenu.addEventListener('click', () => {
        menuMobile.classList.remove('slide-out-left');
        menuMobile.classList.add('slide-in-right');
        menuMobile.style.display = 'block'; // Exibe o menu
    });

    // Quando o botão de fechar o menu for clicado
    btnFecharMenu.addEventListener('click', () => {
        menuMobile.classList.remove('slide-in-right');
        menuMobile.classList.add('slide-out-left');
        setTimeout(() => {
            menuMobile.style.display = 'none'; // Oculta o menu após a animação
        }, 500); // Tempo para aguardar a animação de saída
    });

    // Adiciona eventos de clique aos links de navegação do menu mobile
    document.getElementById('apresentacao-link').addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        loadContent('/pages/apresentacao/apresentacao.html', '/pages/apresentacao/apresentacao.css'); // Carrega o conteúdo da apresentação
    });

    document.getElementById('funcionalidades-link').addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        loadContent('/pages/funcionalidades/funcionalidades.html', '/pages/funcionalidades/funcionalidades.css'); // Carrega o conteúdo de funcionalidades
    });

    document.getElementById('sobre-link').addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        loadContent('/pages/sobre/sobre.html', '/pages/sobre/sobre.css'); // Carrega o conteúdo da página sobre
    });

    document.getElementById('contato-link').addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        loadContent('/pages/contato/contato.html', '/pages/contato/contato.css'); // Carrega o conteúdo da página de contato
    });

    // Adiciona evento de clique para o link "Acesse o Sistema"
    document.querySelector('.menu-mobile .acesse-sistema a').addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        loadContent('/pages/manutencao/manutencao.html', '/pages/manutencao/manutencao.css'); // Carrega o conteúdo da página de manutenção

        // Fecha o menu após a seleção
        menuMobile.classList.remove('slide-in-right');
        menuMobile.classList.add('slide-out-left');
        setTimeout(() => {
            menuMobile.style.display = 'none'; // Oculta o menu após a animação
        }, 500); // Tempo para aguardar a animação de saída
    });

    // Adiciona eventos de clique também para os links dentro do menu mobile
    document.querySelectorAll('.menu-mobile .nav-links-two li a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o comportamento padrão do link
            // Recarrega o conteúdo baseado no link
            const id = link.id;
            if (id === 'apresentacao-link') {
                loadContent('/pages/apresentacao/apresentacao.html', '/pages/apresentacao/apresentacao.css');
            } else if (id === 'funcionalidades-link') {
                loadContent('/pages/funcionalidades/funcionalidades.html', '/pages/funcionalidades/funcionalidades.css');
            } else if (id === 'sobre-link') {
                loadContent('/pages/sobre/sobre.html', '/pages/sobre/sobre.css');
            } else if (id === 'contato-link') {
                loadContent('/pages/contato/contato.html', '/pages/contato/contato.css');
            }

            // Fecha o menu após a seleção
            menuMobile.classList.remove('slide-in-right');
            menuMobile.classList.add('slide-out-left');
            setTimeout(() => {
                menuMobile.style.display = 'none'; // Oculta o menu após a animação
            }, 500); // Tempo para aguardar a animação de saída
        });
    });
});
