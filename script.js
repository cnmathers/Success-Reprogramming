// === Typewriter ===
document.addEventListener("DOMContentLoaded", () => {
  const subtext = document.querySelector(".subtext");
  const text = subtext.textContent;
  subtext.textContent = "";

function startTypewriter () {
  const subtext = document.querySelector(".subtext");
  const text = subtext.textContent;
  subtext.textContent = "";
}

  let i = 0;
  const speed = 30;

  function typeWriter() {
    if (i < text.length) {
      subtext.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});

// Trigger AFTER intro fade (example: 6s)
setTimeout(() => {
  startTypewriter();
}, 6000);

// === Matrix Code Rain Full-Screen Intro ===
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Full screen setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = "999";
canvas.style.pointerEvents = "none";
canvas.style.opacity = "1";
canvas.style.transition = "opacity 2s ease-in-out";

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = window.innerWidth < 768 ? 14 : 20;
    this.canvasHeight = canvasHeight;
  }

  draw(context) {
    const char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
    context.fillText(char, this.x * this.fontSize, this.y * this.fontSize);

    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.fontSize = 20;
    this.columns = Math.floor(this.canvasWidth / this.fontSize);
    this.symbols = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = Math.floor(width / this.fontSize);
    this.symbols = [];
    this.init();
    ctx.font = this.fontSize + "px monospace";
  }
}

const effect = new Effect(canvas.width, canvas.height);
ctx.font = this.fontSize + "px monospace";
ctx.textAlign = "left";
ctx.textBaseline = "top";  // Ensures predictable Y spacing

let animationFrameId;
let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#6a0dad";
    effect.symbols.forEach(s => s.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  animationFrameId = requestAnimationFrame(animate);
}

// === Start Animation ===
animate(0);

// === Function to end intro (skip or auto) ===
function endIntro() {
  const canvas = document.getElementById("matrixCanvas");
  const siteContent = document.getElementById("siteContent");
  const skipBtn = document.getElementById("skipIntro");

  canvas.style.opacity = "0";
  cancelAnimationFrame(animationFrameId);
  if (siteContent) siteContent.style.opacity = "1";
  if (skipBtn) skipBtn.style.display = "none";

  const bgImage = document.querySelector(".hero-bg-image");
  if (bgImage) bgImage.style.opacity = "1";
}

// === Auto-end intro after 8s ===
setTimeout(() => {
  endIntro();
}, 8000);

// === Skip Intro Button ===
const skipBtn = document.getElementById("skipIntro");
if (skipBtn) {
  skipBtn.addEventListener("click", () => {
    endIntro();
  });
}

// === Handle Screen Resize ===
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});

const modeToggle = document.getElementById('modeToggle');
const root = document.documentElement;

// Load stored theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
  modeToggle.checked = true;
} else {
  root.setAttribute('data-theme', 'dark');
  modeToggle.checked = false;
}

modeToggle.addEventListener('change', () => {
  const newTheme = modeToggle.checked ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
