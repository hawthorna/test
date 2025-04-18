document.addEventListener("DOMContentLoaded", function () {
  // ========== Dark Mode ==========
  const toggleModeBtn = document.getElementById("toggleModeBtn");
  if (toggleModeBtn) {
    toggleModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // ========== Navigasi Sidebar ==========
  document.querySelectorAll('.navigation li').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelector('.navigation li.active').classList.remove('active');
    item.classList.add('active');
  });
});

const navLinks = document.querySelectorAll(".navigation ul li");
const mainContent = document.querySelector(".mainContent");
const formContent = document.querySelector(".formContent");
const searchContent = document.querySelector(".searchContent");
const updateContent = document.querySelector(".updateContent");
const reportContainer = document.querySelector(".reportContainer");
const helpContent = document.querySelector(".helpContent");
const defaultContent = mainContent?.innerHTML || "";

console.log("mainContent:", mainContent);
console.log("formContent:", formContent);
console.log("searchContent:", searchContent);
console.log("updateContent:", updateContent);
console.log("reportContainer:", reportContainer);
console.log("helpContent:", helpContent);

navLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Gunakan semakan berdasarkan elemen kandungan yang betul
    if (!navLinks || !mainContent || !formContent || !searchContent || !updateContent || !reportContainer || !helpContent) return;

    // Buang 'active' dari semua
    navLinks.forEach(item => item.classList.remove("active"));
    this.classList.add("active");

    const title = this.querySelector(".title")?.innerText.trim() || "";

    switch (title) {
      case "Hawthorn A":
        showContent(mainContent, defaultContent);
        hideContent(formContent);
        hideContent(searchContent);
        hideContent(updateContent);
        hideContent(reportContainer);
        hideContent(helpContent);
        break;
      case "Daftar Baru":
        hideContent(mainContent);
        showContent(formContent);
        hideContent(searchContent);
        hideContent(updateContent);
        hideContent(reportContainer);
        hideContent(helpContent);
        break;
      case "Carian":
        showContent(searchContent);
        hideContent(mainContent);
        hideContent(formContent);
        hideContent(updateContent);
        hideContent(reportContainer);
        hideContent(helpContent);
        break;
      case "Kemaskini":
        hideContent(mainContent);
        hideContent(formContent);
        hideContent(searchContent);
        showContent(updateContent);
        hideContent(reportContainer);
        hideContent(helpContent);
        break;
      case "Laporan":
        hideContent(mainContent);
        hideContent(formContent);
        hideContent(searchContent);
        hideContent(updateContent);
        showContent(reportContainer);
        hideContent(helpContent);
        break;
      case "Bantuan":
        hideContent(mainContent);
        hideContent(formContent);
        hideContent(searchContent);
        hideContent(updateContent);
        hideContent(reportContainer);
        showContent(helpContent);
        break;
      default:
        hideContent(mainContent);
        hideContent(formContent);
        hideContent(searchContent);
        hideContent(updateContent);
        hideContent(reportContainer);
        hideContent(helpContent);
    }
  });
});

  // ========== Borang Daftar ========== 
  const totalParts = 5; // jumlah bahagian
  let currentPart = 1;

  function showPart(partNumber) {
    for (let i = 1; i <= totalParts; i++) {
      const part = document.getElementById(`formPart${i}`);
      if (part) {
        part.style.display = i === partNumber ? "block" : "none";
      }
    }
  }

  // Untuk semua butang "Seterusnya"
  for (let i = 1; i < totalParts; i++) {
    const nextBtn = document.getElementById(`nextButton${i}`);
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        // Optional: Tambah validateFormPart(i) kalau nak validasi setiap bahagian
        currentPart = i + 1;
        showPart(currentPart);
      });
    }
  }

  // Untuk semua butang "Sebelumnya"
  for (let i = 2; i <= totalParts; i++) {
    const prevBtn = document.getElementById(`prevButton${i}`);
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        currentPart = i - 1;
        showPart(currentPart);
      });
    }
  }

  function showContent(element, content = null) {
  if (element) {
    element.style.display = "block";
    if (content !== null) {
      element.innerHTML = content;
    }
  }
}

function hideContent(element) {
  if (element) {
    element.style.display = "none";
  }
}

  // Papar bahagian pertama masa mula-mula
  showPart(currentPart);
});

// ========== Carian Pesakit ==========

let data = [], sheetData = [], header = [], headersGabung = [];

const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYhFI5Tzsbfvy9ncpPNRJxSVWh1Ln2p2KyXqgGe__mL-n6O7-e113vf0oFxti24g/pub?output=.csv";

// Ambil data dari Google Sheets
async function fetchData() {
  try {
    const response = await fetch(csvUrl);
    const dataText = await response.text();
    data = Papa.parse(dataText).data;

    const header1 = data[1];
    const header2 = data[2];

    headersGabung = header1.map((h1, i) => {
      const h2 = header2[i] ? ` (${header2[i]})` : "";
      return `${h1}${h2}`;
    });

    header = header2;
    sheetData = data.slice(2);

    console.log("Data dimuat:", sheetData.length, "baris");
  } catch (err) {
    console.error("Terdapat ralat semasa mengambil data:", err);
  }
}

// Fungsi utiliti
function selamat(data, index) {
  return data[index] ? data[index] : "-";
}

// Fungsi paparkan ringkasan
function paparkanRingkasan(data) {
  const container = document.getElementById("searchContent");
  container.innerHTML = "";
  container.style.display = "block";

  if (data.length === 0) {
    container.innerHTML = "<p>Tiada data dijumpai.</p>";
    return;
  }

  data.forEach(item => {
    const row = item.row;
    const indexAsal = item.index;
    const nama = row[6];
    const ic = row[8];
    const tarikhKemasukan = row[23];

    const div = document.createElement("div");
    div.classList.add("result-item");
    div.innerHTML = `
      <strong>${nama}</strong> (${ic})<br>
      Tarikh Kemasukan: ${tarikhKemasukan}<br>
      <button onclick="paparkanPenuh(${indexAsal})">Lihat Penuh</button>
    `;
    container.appendChild(div);
  });
}

// Fungsi paparkan penuh
function paparkanPenuh(index) {
  const row = sheetData[index];
  if (!row) {
    console.warn("Row tak wujud pada index:", index);
    return;
  }

  if (!data || data.length < 3) {
    console.error("Data tak cukup atau belum dimuatkan");
    return;
  }

  const header1 = data[1];
  const header2 = data[2];

  let html = "<h3>Maklumat Penuh Pesakit</h3><div class='column-container'>";
  row.forEach((value, i) => {
    html += `
      <div class="column-block">
        <div class="column-header">
          <strong>${header1[i] || "-"}</strong><br>
          <small>${header2[i] || "-"}</small>
        </div>
        <div class="column-data">${(value || "").toString().replace(/\n/g, "<br>")}</div>
      </div>
    `;
  });

  html += `</div>
    <div style="text-align:right; margin-top: 10px;">
      <button onclick="window.print()">Cetak</button>
    </div>`;

  const hasilElem = document.getElementById("hasil");
  if (hasilElem) {
    hasilElem.innerHTML = html;
  } else {
    console.error('Elemen dengan ID "hasil" tak jumpa.');
  }

  const searchContent = document.getElementById("searchContent");
  if (searchContent) {
    searchContent.style.display = "none";
  }
}

// Fungsi carian
function cariData() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const searchContent = document.getElementById("searchContent");

  if (!query) {
    searchContent.innerHTML = "";
    searchContent.style.display = "none";
    document.getElementById("hasil").innerHTML = "";
    return;
  }

  const hasilCarian = [];

  sheetData.forEach((row, i) => {
    const nama = row[6]?.toLowerCase() || "";
    const ic = row[8]?.toLowerCase() || "";
    if (nama.includes(query) || ic.includes(query)) {
      hasilCarian.push({ row, index: i });
    }
  });

  paparkanRingkasan(hasilCarian);
}

// Aktifkan carian selepas data dimuatkan
fetchData().then(() => {
  document.getElementById("searchInput").addEventListener("input", cariData);
});
