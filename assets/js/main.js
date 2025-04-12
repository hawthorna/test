// Butang Tukar Mod
const toggleBtn = document.getElementById("toggleModeBtn");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Tukar Paparan Menu
const navHawthorn = document.getElementById("navHawthorn");
const navDaftar = document.getElementById("navDaftar");

const mainContent = document.getElementById("mainContent");
const formContent = document.getElementById("formContent");

navHawthorn.addEventListener("click", () => {
  mainContent.style.display = "block";
  formContent.style.display = "none";
});

navDaftar.addEventListener("click", () => {
  mainContent.style.display = "none";
  formContent.style.display = "block";
});
