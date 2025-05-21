// Typewriter effect
const text = `My BUBU,

Happy Birthday, my love.
It’s wild to think that on this exact day, the world gave me the person who would become my favorite hello, my softest place to fall, and the one who somehow just gets me.

I still remember that day, 'Cho toke sunset dekhabo', that train journey. That moment is burned into my heart, because it was the beginning of everything.

You have this way of making even the worst days feel okay — with just a look, a laugh, or that ridiculous joke you know I pretend to hate but secretly love. You are strong, kind, endlessly patient, and effortlessly funny. I hope you know how rare you are.

There’s something about waking up knowing you’re mine that makes everything feel right. You’re not just someone I love — you’re the home I never knew I was missing.

And here’s something I don’t always say out loud:
I admire you. The way you show up for the people you love. The way you chase what you believe in. The way you’ve let me in, even when it wasn’t easy. I notice it all, and I love you more because of it.

So on your birthday, I want to celebrate everything that makes you, you.
Not just the laughs and the kisses and the comfort — but the beautiful, messy, complicated, magical you.

You are my safe place, my greatest adventure, and my always.
Let’s keep building this life together — full of late-night talks, quiet mornings, and dreams we haven’t even dreamed yet.

I love you more than words can hold.
Happy Birthday, Mr. Rik Halder.

Yours, completely.
Neku ❤️`;

const messageElement = document.getElementById("typed-message");
const surpriseBtn = document.getElementById("surprise-btn");

let index = 0;

function typeWriter() {
  if (index < text.length) {
    messageElement.innerHTML += text.charAt(index) === '\n' ? '<br>' : text.charAt(index);
    index++;
    setTimeout(typeWriter, 30); // typing speed
  } else {
    // Show the button
    surpriseBtn.classList.remove("hidden");
  }
}

window.onload = typeWriter;


// Confetti background (reuse from previous pages)
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
