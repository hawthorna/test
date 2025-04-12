// Tukar antara mod biasa dan dark mode
document.getElementById('toggleModeBtn').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

// Fungsi untuk paparan utama
document.getElementById('hawthornA').addEventListener('click', function () {
  document.querySelector('.main-content').style.display = 'block';
  // Sembunyikan borang atau bahagian lain
  document.querySelector('.form-container').style.display = 'none';
});

// Jika mahu sembunyikan bahagian lain bila klik pada ikon lain
document.getElementById('daftarBaru').addEventListener('click', function () {
  document.querySelector('.main-content').style.display = 'none';
  document.querySelector('.form-container').style.display = 'block'; // Paparkan borang
});
