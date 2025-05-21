// Confetti background
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

for (let i = 0; i < 100; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 10 + 5,
    d: Math.random() * 5 + 1,
    color: `hsl(${Math.random() * 360}, 100%, 75%)`,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    ctx.beginPath();
    ctx.fillStyle = h.color;
    ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2, false);
    ctx.fill();
    h.y += h.d;
    if (h.y > canvas.height) {
      h.y = 0;
      h.x = Math.random() * canvas.width;
    }
  });
}

setInterval(draw, 30);

function startSurprise() {
    window.location.href = "cake.html";
  }

  function playSong() {
    const audio = document.getElementById('birthday-audio');
    audio.play();
    localStorage.setItem("playSong", "true");
  }
  