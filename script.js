// Scroll para mudar header
window.addEventListener("scroll", function () {
    const header = document.querySelector(".site-header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// Abrir ou fechar a timeline
function toggleTimeline(element) {
    element.classList.toggle('open');
}

// Scroll suave até uma seção da timeline
function scrollToTimeline(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Ativação dos cards por ano
const years = document.querySelectorAll('.years span');
const cards = document.querySelectorAll('.card');

years.forEach(year => {
    year.addEventListener('click', () => {
        const target = year.getAttribute('data-date');

        cards.forEach(card => {
            card.classList.remove('active');
            if (card.getAttribute('data-content') === target) {
                card.classList.add('active');
            }
        });
    });
});

// Abrir modal (imagem ou vídeo) — atualizado com classe extra
function openModal(title, description, media, isVideo = false, extraClass = '') {
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
  
    modalTitle.textContent = title;
    modalDescription.textContent = description;
  
    // Limpa conteúdo anterior
    modalImage.style.display = 'none';
    modalImage.src = '';
    modalImage.className = ''; // limpa todas as classes anteriores
  
    const existingVideo = document.getElementById('modalVideo');
    if (existingVideo) existingVideo.remove();
  
    if (isVideo) {
      const video = document.createElement('video');
      video.src = media;
      video.id = 'modalVideo';
      video.controls = true;
      if (extraClass) {
        video.classList.add(extraClass); // aplica a classe, se tiver
      }
      document.querySelector('.modal-container').appendChild(video);
    } else {
      modalImage.style.display = 'block';
      modalImage.src = media;
      if (extraClass) {
        modalImage.classList.add(extraClass); // aplica a classe na imagem
      }
    }
  
    modal.style.display = 'flex';
  }
  
// Fechar modal
function closeModal() {
    const modal = document.getElementById('mediaModal');
    modal.style.display = 'none';

    // Remove vídeo se estiver aberto
    const video = document.getElementById('modalVideo');
    if (video) video.remove();
}

// Fechar modal clicando fora
window.onclick = function (event) {
    const modal = document.getElementById('mediaModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Navegação do carrossel com loop contínuo (sem voltar para o começo ou fim)
const prevBtns = document.querySelectorAll('.carousel-btn.prev');
const nextBtns = document.querySelectorAll('.carousel-btn.next');

prevBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => scrollCarousel('prev', index));
});

nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => scrollCarousel('next', index));
});

function scrollCarousel(direction, index) {
    const row = document.querySelectorAll('.carousel-row')[index];
    const cards = row.querySelectorAll('.media-card');
    const totalCards = cards.length;
    const cardWidth = cards[0].offsetWidth + 16; // Ajuste de largura do card + gap entre eles
    const scrollWidth = row.scrollWidth; // Total de largura do conteúdo da rolagem
    const rowWidth = row.offsetWidth; // Largura visível do carrossel (parte visível da rolagem)

    // Controlando a rolagem para a direita (next)
    if (direction === 'next') {
        if (row.scrollLeft + rowWidth >= scrollWidth) {
            // Se atingiu o final da rolagem, move para a primeira imagem suavemente
            row.scrollLeft = 0;
        } else {
            // Senão, avança para a próxima imagem
            row.scrollLeft += cardWidth;
        }
    } 
    // Controlando a rolagem para a esquerda (prev)
    else if (direction === 'prev') {
        if (row.scrollLeft <= 0) {
            // Se atingiu o início da rolagem, vai para a última imagem
            row.scrollLeft = (totalCards - 1) * cardWidth;
        } else {
            // Senão, vai para a imagem anterior
            row.scrollLeft -= cardWidth;
        }
    }
}