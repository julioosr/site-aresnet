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
            })
            .catch(error => {
                mainContent.innerHTML = `<p>${error.message}</p>`;
                // Remove a animação de saída em caso de erro
                mainContent.classList.remove('slide-out-left');
            });
    }, 500); // Tempo da animação de saída
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

// Adiciona eventos de clique para as novas páginas
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
