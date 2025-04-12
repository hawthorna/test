// assets/js/main.js

// Fungsi tukar mod gelap
const toggleModeBtn = document.getElementById("toggleModeBtn");
toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Elemen yang berkaitan
const navLinks = document.querySelectorAll(".navigation ul li");
const mainContent = document.querySelector(".main-content");
const formContainer = document.querySelector(".form-container");

// Simpan paparan asal untuk paparan utama
const defaultContent = mainContent.innerHTML;

// Tambah event listener pada semua ikon menu
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Buang kelas 'active' dari semua menu
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");

    const title = link.querySelector(".title").innerText.trim();

    if (title === "Hawthorn A") {
      showContent(mainContent, defaultContent);
      hideContent(formContainer);
    } else if (title === "Daftar Baru") {
      hideContent(mainContent);
      showContent(formContainer);
    } else {
      // Untuk menu lain – boleh ditambah nanti
      hideContent(mainContent);
      hideContent(formContainer);
    }
  });
});

// Fungsi tunjuk paparan dengan animasi
function showContent(element, newHTML = null) {
  if (newHTML) element.innerHTML = newHTML;
  element.style.display = "block";
  element.style.opacity = 0;
  element.style.transform = "translateY(20px)";
  setTimeout(() => {
    element.style.transition = "all 0.5s ease";
    element.style.opacity = 1;
    element.style.transform = "translateY(0)";
  }, 50);
}

// Fungsi sorok paparan dengan animasi
function hideContent(element) {
  element.style.transition = "all 0.3s ease";
  element.style.opacity = 0;
  element.style.transform = "translateY(20px)";
  setTimeout(() => {
    element.style.display = "none";
  }, 300);
}
// Navigasi Borang
document.getElementById('nextButton')?.addEventListener('click', function() {
  if(validatePart1()) {
    document.getElementById('formPart1').style.display = 'none';
    document.getElementById('formPart2').style.display = 'block';
  }
});

document.getElementById('prevButton')?.addEventListener('click', function() {
  document.getElementById('formPart2').style.display = 'none';
  document.getElementById('formPart1').style.display = 'block';
});

// Validasi Bahagian 1
function validatePart1() {
  const requiredFields = document.querySelectorAll('#formPart1 [required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if(!field.value.trim()) {
      field.style.borderColor = 'red';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  
  if(!isValid) alert('Sila isi semua maklumat wajib sebelum meneruskan.');
  return isValid;
}
