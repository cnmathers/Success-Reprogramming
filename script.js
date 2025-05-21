// === Typewriter ===
function startTypewriter() {
  const titleEl = document.getElementById("typewriterTitle");
  const taglineEl = document.querySelector(".subtext");

  const titleText = titleEl.textContent.trim();
  titleEl.textContent = ""; // Wipe visible content before typing
  titleEl.style.visibility = "visible"; // Show it now
  const taglineText = taglineEl.getAttribute("data-text");

  let titleIndex = 0;
  let taglineIndex = 0;

  function typeTitle() {
    if (titleIndex < titleText.length) {
      titleEl.textContent += titleText.charAt(titleIndex);
      titleIndex++;
      setTimeout(typeTitle, 75);
    } else {
      // Once title is fully typed, add glow
      titleEl.classList.add("glow-finish");

      // Start tagline after title finishes
      setTimeout(() => typeTagline(), 500);
    }
  }

  function typeTagline() {
    if (taglineIndex < taglineText.length) {
      taglineEl.textContent += taglineText.charAt(taglineIndex);
      taglineIndex++;
      setTimeout(typeTagline, 30);
    }
  }

  typeTitle();
}


// === Matrix Code Rain ===
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

ctx.textAlign = "center";
ctx.textBaseline = "top";

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
  }

  draw(context) {
    const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    const glowColor = "#6a0dad"; // Your brand purple

    // First pass: blurred glow
    context.save();
    context.fillStyle = glowColor;
    context.shadowColor = glowColor;
    context.shadowBlur = 20;
    context.globalAlpha = 0.4;
    context.fillText(char, this.x * this.fontSize, this.y * this.fontSize);
    context.restore();
  
    // Second pass: sharp character
    context.save();
    context.fillStyle = glowColor;
    context.globalAlpha = 1;
    context.fillText(char, this.x * this.fontSize, this.y * this.fontSize);
    context.restore();
    this.y = (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.975) ? 0 : this.y + 1;
  }
}

class Effect {
  constructor(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.fontSize = this.getFontSize();
    this.columns = Math.floor(this.canvasWidth / this.fontSize);
    this.symbols = [];
    this.initialize();
  }

  getFontSize() {
    if (window.innerWidth < 480) return 18;
    if (window.innerWidth < 768) return 22;
    return 26;
  }

  initialize() {
    this.symbols = [];
    for (let i = 0; i < this.columns; i++) {
      this.symbols.push(new Symbol(i, Math.floor(Math.random() * -50), this.fontSize, this.canvasHeight));
    }
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.fontSize = this.getFontSize();
    this.columns = Math.floor(this.canvasWidth / this.fontSize);
    ctx.font = this.fontSize + "px monospace";
    this.initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
ctx.font = effect.fontSize + "px monospace";

let lastTime = 0;
const fps = 30;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#6a0dad";
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  animationFrameId = requestAnimationFrame(animate);
}
let animationFrameId = requestAnimationFrame(animate);

// === End Intro ===
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

  // START TYPEWRITER ONLY AFTER RAIN ENDS
  startTypewriter();
}

setTimeout(() => {
  endIntro();
}, 8000);

const skipBtn = document.getElementById("skipIntro");
if (skipBtn) {
  skipBtn.addEventListener("click", endIntro);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  effect.resize(canvas.width, canvas.height);
});

// === Theme Toggle ===
const modeToggle = document.getElementById('modeToggle');
const root = document.documentElement;

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
