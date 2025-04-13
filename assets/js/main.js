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

// Global variable to store patient data
let patientData = [];


});

// Load and parse CSV data
function loadPatientData() {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYhFI5Tzsbfvy9ncpPNRJxSVWh1Ln2p2KyXqgGe__mL-n6O7-e113vf0oFxti24g/pub?output=csv';
  
  fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n');
      const headers = rows[0].split(',').map(h => h.trim());
      
      patientData = rows.slice(1).map(row => {
        const cells = row.split(',');
        const patient = {};
        headers.forEach((document.addEventListener("DOMContentLoaded", function() {
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
  const searchContent = document.querySelector(".search-container"); // <<< Tambah ni sini

  const defaultContent = mainContent?.innerHTML || "";

  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      if (!navLinks || !mainContent || !formContainer || !searchContent) return;

      navLinks.forEach(item => item.classList.remove("active"));
      this.classList.add("active");

      const title = this.querySelector(".title")?.innerText.trim() || "";

      switch(title) {
        case "Hawthorn A":
          showContent(mainContent, defaultContent);
          hideContent(formContainer);
          hideContent(searchContent);
          break;
        case "Daftar Baru":
          hideContent(mainContent);
          showContent(formContainer);
          hideContent(searchContent);
          break;
        case "Carian":
          showContent(searchContent);
          hideContent(mainContent);
          hideContent(formContainer);
          break;
        default:
          hideContent(mainContent);
          hideContent(formContainer);
          hideContent(searchContent);
      }
    });
  });

  // ... (yang lain: form, CSV, carian, dsb)
});header, index) => {
          patient[header] = cells[index] ? cells[index].trim() : '';
        });
        return patient;
      });
      
      console.log('Patient data loaded:', patientData);
    })
    .catch(error => console.error('Error loading patient data:', error));
}

// Search functionality
document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

function performSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const results = patientData.filter(patient => {
    const name = patient['Name']?.toLowerCase() || '';
    const ic = patient['IC Number']?.toLowerCase() || '';
    return name.includes(query) || ic.includes(query);
  });
  
  displaySearchResults(results);
}

function displaySearchResults(results) {
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = '';
  
  if (results.length === 0) {
    resultsDiv.innerHTML = '<p class="no-results">Tiada rekod ditemui</p>';
    return;
  }
  
  results.forEach(patient => {
    const item = document.createElement('div');
    item.className = 'result-item';
    item.innerHTML = `
      <h3>${patient['Name'] || 'Nama tidak tersedia'}</h3>
      <p>No. KP: ${patient['IC Number'] || 'Tiada maklumat'}</p>
      <p>Tarikh Kemasukan: ${patient['Date of Admission'] || 'Tiada tarikh'}</p>
    `;
    
    item.addEventListener('click', () => showPatientDetail(patient));
    resultsDiv.appendChild(item);
  });
}

// Show detailed patient view
function showPatientDetail(patient) {
  const detailContent = document.getElementById('detailContent');
  detailContent.innerHTML = '';
  
  Object.entries(patient).forEach(([key, value]) => {
    const row = document.createElement('div');
    row.className = 'detail-row';
    row.innerHTML = `
      <div class="detail-label">${key}</div>
      <div class="detail-value">${value || 'Tiada maklumat'}</div>
    `;
    detailContent.appendChild(row);
  });
  
  document.getElementById('searchResults').style.display = 'none';
  document.getElementById('searchDetail').style.display = 'block';
}

// Back button functionality
document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('searchDetail').style.display = 'none';
  document.getElementById('searchResults').style.display = 'block';
});
