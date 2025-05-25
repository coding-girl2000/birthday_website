(() => {
  let currentAudio = null;
  let currentProgressId = null;
  let currentBarId = null;
  let currentTimeId = null;
  let updateInterval = null;

  const allAudios = ['song1', 'song2', 'song3', 'song4','song5', 'song6','song7','song8','song9','song10'];

  window.playSong = function (id) {
    const audio = document.getElementById(id);

    if (currentAudio && currentAudio === audio) {
      const icon = document.querySelector(`#btn-${id} .play-icon, #btn-${id} .pause-icon`);
      if (audio.paused) {
        audio.play();
        icon.classList.remove('play-icon');
        icon.classList.add('pause-icon');
        startProgressUpdates(id);
      } else {
        audio.pause();
        icon.classList.remove('pause-icon');
        icon.classList.add('play-icon');
        stopProgressUpdates();
      }
      return;
    }

    allAudios.forEach(audioId => {
      const a = document.getElementById(audioId);
      a.pause();
      a.currentTime = 0;
      const btn = document.querySelector(`#btn-${audioId} .play-icon, #btn-${audioId} .pause-icon`);
      if (btn) {
        btn.classList.remove('pause-icon');
        btn.classList.add('play-icon');
      }
      document.getElementById(`progress-${audioId}`).classList.add('hidden');
    });

    currentAudio = audio;
    currentProgressId = `progress-${id}`;
    currentBarId = `bar-${id}`;
    currentTimeId = `time-${id}`;

    document.getElementById(currentProgressId).classList.remove('hidden');
    audio.play();
    startProgressUpdates(id);

    const icon = document.querySelector(`#btn-${id} .play-icon`);
    if (icon) {
      icon.classList.remove('play-icon');
      icon.classList.add('pause-icon');
    }
  };

  function startProgressUpdates(id) {
    stopProgressUpdates();
    updateInterval = setInterval(() => {
      if (!currentAudio) return;

      const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
      document.getElementById(currentBarId).style.width = `${percent}%`;

      const current = formatTime(currentAudio.currentTime);
      const total = formatTime(currentAudio.duration);
      document.getElementById(currentTimeId).innerText = `${current} / ${total}`;

      if (currentAudio.ended) {
        document.getElementById(currentProgressId).classList.add('hidden');
        stopProgressUpdates();

        const icon = document.querySelector(`#btn-${id} .pause-icon`);
        if (icon) {
          icon.classList.remove('pause-icon');
          icon.classList.add('play-icon');
        }
      }
    }, 300);
  }

  function stopProgressUpdates() {
    clearInterval(updateInterval);
    updateInterval = null;
  }

  window.seek = function (event, id) {
    const audio = document.getElementById(id);
    const bar = event.currentTarget;
    const clickX = event.offsetX;
    const width = bar.clientWidth;
    const duration = audio.duration;

    if (!isNaN(duration)) {
      const newTime = (clickX / width) * duration;
      audio.currentTime = newTime;
    }
  };

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  // Confetti Setup
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

  // ===== VIDEO POPUP FEATURE =====
  window.showVideo = function () {
  // Pause the currently playing audio (if any)
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    const icon = document.querySelector(`#btn-${currentAudio.id} .pause-icon`);
    if (icon) {
      icon.classList.remove('pause-icon');
      icon.classList.add('play-icon');
    }
  }

  // Show the video overlay and play the video
  const overlay = document.getElementById('videoOverlay');
  const video = document.getElementById('crazyVideo');
  overlay.classList.remove('hidden');
  video.play();
};


  window.closeVideo = function () {
    const overlay = document.getElementById('videoOverlay');
    const video = document.getElementById('crazyVideo');
    video.pause();
    video.currentTime = 0;
    overlay.classList.add('hidden');
  };
})();
