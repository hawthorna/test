// Fungsi utama yang akan dijalankan setelah DOM siap
document.addEventListener("DOMContentLoaded", function() {
  // ========== Dark Mode Toggle ==========
  const toggleModeBtn = document.getElementById("toggleModeBtn");
  if (toggleModeBtn) {
    toggleModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // ========== Navigation Handling ==========
  const navLinks = document.querySelectorAll(".navigation ul li");
  const mainContent = document.querySelector(".main-content");
  const formContainer = document.querySelector(".form-container");
  
  // Simpan paparan asal hanya jika elemen wujud
  const defaultContent = mainContent?.innerHTML || "";

  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      // Pastikan navLinks dan elemen lain wujud
      if (!navLinks || !mainContent || !formContainer) return;

      navLinks.forEach(item => item.classList.remove("active"));
      this.classList.add("active");

      const title = this.querySelector(".title")?.innerText.trim() || "";

      switch(title) {
        case "Hawthorn A":
          showContent(mainContent, defaultContent);
          hideContent(formContainer);
          break;
        case "Daftar Baru":
          hideContent(mainContent);
          showContent(formContainer);
          break;
        default:
          hideContent(mainContent);
          hideContent(formContainer);
      }
    });
  });

  // ========== Form Navigation ==========
  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');

  if (nextButton) {
    nextButton.addEventListener('click', function() {
      console.log('Butang Seterusnya ditekan');
      if (validatePart1()) {
        console.log('Bahagian 1 sah, memaparkan Bahagian 2');
        document.getElementById('formPart1').style.display = 'none';
        document.getElementById('formPart2').style.display = 'block';
      } else {
        console.log('Bahagian 1 tidak sah');
      }
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', function() {
      document.getElementById('formPart2').style.display = 'none';
      document.getElementById('formPart1').style.display = 'block';
    });
  }
});

// ========== Helper Functions ==========
function showContent(element, newHTML = null) {
  if (!element) return;
  
  if (newHTML) element.innerHTML = newHTML;
  element.style.display = "block";
  element.style.opacity = 0;
  element.style.transform = "translateY(20px)";
  
  requestAnimationFrame(() => {
    element.style.transition = "all 0.5s ease";
    element.style.opacity = 1;
    element.style.transform = "translateY(0)";
  });
}

function hideContent(element) {
  if (!element) return;
  
  element.style.transition = "all 0.3s ease";
  element.style.opacity = 0;
  element.style.transform = "translateY(20px)";
  
  setTimeout(() => {
    element.style.display = "none";
    element.style.transition = "";
  }, 300);
}

function validatePart1() {
  const formPart1 = document.getElementById('formPart1');
  if (!formPart1) {
    console.log('formPart1 tidak wujud');
    return false;
  }

  const requiredFields = formPart1.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      console.log(`Medan ${field.name} kosong`);
      field.style.borderColor = 'red';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (!isValid) {
    alert('Sila isi semua maklumat wajib sebelum meneruskan.');
  }

  return isValid;
}
