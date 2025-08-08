const commentsContainer = document.getElementById('comments');
const videoPlayer = document.getElementById('videoPlayer');

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '44143d70f5msh156723cead33fa3p1dd850jsn984c7be27013',
    'x-rapidapi-host': 'youtube138.p.rapidapi.com'
  }
};

// extraer el id del video de YouTube
function extractVideoId(url) {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function loadVideo() {
  const input = document.getElementById('youtubeLink').value.trim();
  const videoId = extractVideoId(input);

  if (!videoId) {
    alert('ingrese un enlace de YouTube válido.');
    return;
  }
  videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;


  // Llamar a la API
  const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${videoId}&hl=en&gl=US`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();


    if (data.comments && data.comments.length > 0) {
      data.comments.forEach(item => {
        const { author, content } = item;

        const comment = document.createElement('div');
        comment.className = 'list-group-item';

        comment.innerHTML = `
          <div class="d-flex align-items-start">
            <img src="${author.avatar[0].url}" class="rounded-circle me-3" width="50" height="50" alt="${author.title}">
            <div>
              <h6 class="mb-1">${author.title}</h6>
              <p class="mb-1">${content}</p>
            </div>
          </div>
        `;

        commentsContainer.appendChild(comment);
      });
    } else {
      commentsContainer.innerHTML = '<p class="text-muted">No hay comentarios disponibles.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    commentsContainer.innerHTML = '<p class="text-danger">Error al cargar los comentarios.</p>';
  }
}
