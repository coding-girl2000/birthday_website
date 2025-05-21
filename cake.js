// Confetti background
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 8 + 3,
    d: Math.random() * 3 + 1,
    color: `hsl(${Math.random() * 360}, 100%, 75%)`,
  });
}


function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
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
setInterval(drawParticles, 30);

// Flame logic
let blownFlames = 0;

function blowFlame(flame) {
    if (flame.style.opacity === "0") return;
  
    flame.style.opacity = "0";
    flame.style.pointerEvents = "none";
    blownFlames++;
  
    if (blownFlames === 5) {
      // Hide the "Blow out" message
      const blowMsg = document.getElementById("blow-msg");
      if (blowMsg) blowMsg.style.display = "none";
  
      // Show birthday message
      setTimeout(() => {
        document.getElementById("message-box").classList.remove("hidden");
      }, 500);
    }
  }
  

function goToNext() {
  window.location.href = "memorylane.html"; // Replace with your next page
}
