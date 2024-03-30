document.addEventListener('DOMContentLoaded', function () {
    const showFormButton = document.getElementById('showFormButton');
    const videoFormContainer = document.getElementById('videoFormContainer');
    const videoForm = document.getElementById('videoForm');
    
    // Adiciona um evento de clique ao botão "Adicionar"
    showFormButton.addEventListener('click', function () {
        // Alterna a exibição do contêiner do formulário
        if (videoFormContainer.style.display === 'none') {
            videoFormContainer.style.display = 'block';
        } else {
            videoFormContainer.style.display = 'none';
        }
    });

    // Adiciona um evento de envio ao formulário
    videoForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário

        // Restante do seu código de envio de formulário...

        // Após o envio bem-sucedido, oculta o contêiner do formulário novamente
        videoFormContainer.style.display = 'none';
    });

    // Função para carregar os vídeos da API e exibir na lista
    function loadVideos() {
        fetch('http://localhost:3333/videos')
            .then(response => response.json())
            .then(videos => {
                const videoList = document.getElementById('videoList');
                videoList.innerHTML = ''; // Limpa a lista antes de atualizar
    
                videos.forEach(video => {
                    const listItem = document.createElement('li');
                    const title = document.createElement('span');
                    title.textContent = video.title;
                    const description = document.createElement('p');
                    description.textContent = video.description;
                    const duration = document.createElement('span');
                    duration.textContent = ` (${video.duration} segundos)`;
    
                    listItem.appendChild(title);
                    listItem.appendChild(description);
                    listItem.appendChild(duration);
    
                    videoList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Erro ao carregar os vídeos:', error));
    }

    // Carrega os vídeos ao carregar a página
    loadVideos();

    // Adiciona um evento de submit ao formulário para adicionar um novo vídeo
    document.getElementById('videoForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            duration: document.getElementById('duration').value
        };
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:3333/videos', requestData)
            .then(response => {
                if (response.ok) {
                    loadVideos();
                    this.reset();
                } else {
                    console.error('Erro ao adicionar vídeo:', response.statusText);
                }
            })
            .catch(error => console.error('Erro ao adicionar vídeo:', error));
    });
});