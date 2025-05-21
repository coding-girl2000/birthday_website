// Confetti Background Animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];
for (let i = 0; i < 100; i++) {
  confettiParticles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 8 + 3,
    d: Math.random() * 3 + 1,
    color: `hsl(${Math.random() * 360}, 100%, 75%)`,
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
    ctx.fill();
    p.y += p.d;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}
setInterval(drawConfetti, 30);

function revealPhoto(element) {
  const img = element.querySelector('img');
  const originalSrc = img.getAttribute('data-original');
  const previewSrc = img.getAttribute('data-preview') || img.src;

  const isRevealed = element.classList.contains('revealed');

  // Start fade out
  img.style.opacity = '0';

  setTimeout(() => {
    if (isRevealed) {
      // Go back to Ghibli image
      img.src = previewSrc;
      element.classList.remove('revealed');
    } else {
      // Reveal real photo
      img.setAttribute('data-preview', previewSrc);
      img.src = originalSrc;
      element.classList.add('revealed');
    }

    // Fade back in
    setTimeout(() => {
      img.style.opacity = '1';
    }, 50);
  }, 200);
}
