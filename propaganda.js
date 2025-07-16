//Historias1
const stories = document.querySelectorAll(".story-content");
const bars = document.querySelectorAll(".progress-bar");
const container = document.getElementById("storyContainer");

let current = 0;
const duration = 5000; // 5 segundos

function showStory(index) {
  stories.forEach(story => story.classList.remove("active"));
  bars.forEach(bar => bar.classList.remove("active"));

  stories[index].classList.add("active");
  bars[index].classList.add("active");
}

function nextStory() {
  current = (current + 1) % stories.length;
  showStory(current);
}

function prevStory() {
  current = (current - 1 + stories.length) % stories.length;
  showStory(current);
}

// Inicializar
showStory(current);

// Timer automático
let timer = setInterval(nextStory, duration);

// Reinicia el timer al interactuar
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextStory, duration);
}
 
// Navegación por clic
container.addEventListener("click", (e) => {
  const clickX = e.clientX - container.getBoundingClientRect().left;
  const width = container.offsetWidth;

  // Ignora clicks en el botón de Discord
  if (e.target.closest('.discord-button')) return;

  if (clickX < width / 2) {
    prevStory();
  } else {
    nextStory();
  }

  resetTimer();
});

//Historias2
//Historias2 (CORREGIDO)
const storiesLg = document.querySelectorAll(".story2-content");
const barsLg = document.querySelectorAll(".progress2-bar");
const containerLg = document.getElementById("story2Container");

let currentLg = 0;
const durationLg = 5000; // 5 segundos

function showStoryLg(index) {
  storiesLg.forEach(story => story.classList.remove("active"));
  barsLg.forEach(bar => bar.classList.remove("active"));

  storiesLg[index].classList.add("active");
  barsLg[index].classList.add("active");
}

function nextStoryLg() {
  currentLg = (currentLg + 1) % storiesLg.length;
  showStoryLg(currentLg);
}

function prevStoryLg() {
  currentLg = (currentLg - 1 + storiesLg.length) % storiesLg.length;
  showStoryLg(currentLg);
}

showStoryLg(currentLg);

let timerLg = setInterval(nextStoryLg, durationLg);

function resetTimerLg() {
  clearInterval(timerLg);
  timerLg = setInterval(nextStoryLg, durationLg);
}

containerLg.addEventListener("click", (e) => {
  const clickX = e.clientX - containerLg.getBoundingClientRect().left;
  const width = containerLg.offsetWidth;

  if (e.target.closest('.discord-lg-button')) return;

  if (clickX < width / 2) {
    prevStoryLg();
  } else {
    nextStoryLg();
  }

  resetTimerLg();
});
