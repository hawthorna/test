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

let sheetData = [];
let header = [];
// URL Google Sheets dalam format CSV
const spreadsheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYhFI5Tzsbfvy9ncpPNRJxSVWh1Ln2p2KyXqgGe__mL-n6O7-e113vf0oFxti24g/pub?output=csv";

// Ambil data dari Google Sheets
async function fetchData() {
  try {
    const response = await fetch(spreadsheetURL);
    const dataText = await response.text();
    const rows = dataText.trim().split("\n").map(row => row.split(","));

    header = rows[1];               // Baris pertama sebagai header
    sheetData = rows.slice(2);      // Data bermula dari baris kedua
  } catch (err) {
    console.error("Terdapat ralat semasa mengambil data:", err);
  }
}

// Fungsi utiliti untuk elak XSS atau data kosong
function selamat(text) {
  return (text || "").toString().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Fungsi untuk paparkan ringkasan carian
function paparkanRingkasan(data) {
  const container = document.getElementById("searchContent");
  container.innerHTML = "";
  container.style.display = "block";

  if (data.length === 0) {
    container.innerHTML = "<p>Tiada data dijumpai.</p>";
    return;
  }

  data.forEach(({ row, index }) => {
    const nama = selamat(row[6]);
    const ic = selamat(row[8]);
    const tarikhKemasukan = selamat(row[23]);

    const item = document.createElement("div");
    item.classList.add("result-item");
    item.innerHTML = `
      <strong>${nama}</strong> (${ic})<br>
      Tarikh Kemasukan: ${tarikhKemasukan}<br>
      <button onclick="paparkanPenuh(${index})">Lihat Penuh</button>
    `;
    container.appendChild(item);
  });
}

// Fungsi untuk paparkan maklumat penuh dalam bentuk jadual
function paparkanPenuh(index) {
  const row = sheetData[index];
  if (!row) return;

  let html = "<h3>Maklumat Penuh Pesakit</h3>";
  html += "<table class='table-penuh'>";

  header.forEach((tajuk, i) => {
    html += `
      <tr>
        <td><strong>${selamat(tajuk)}</strong></td>
        <td>${selamat(row[i]).replace(/\n/g, "<br>")}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <div style="text-align:right; margin-top: 10px;">
      <button onclick="window.print()">Cetak</button>
    </div>
  `;

  document.getElementById("hasil").innerHTML = html;
  document.getElementById("searchContent").style.display = "none";
}

// Fungsi carian berdasarkan nama / ic
function cariData() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const searchContent = document.getElementById("searchContent");

  if (!query) {
    searchContent.innerHTML = "";
    searchContent.style.display = "none";
    document.getElementById("hasil").innerHTML = "";
    return;
  }

  const hasilCarian = sheetData
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => {
      const nama = row[6]?.toLowerCase() || "";
      const ic = row[8]?.toLowerCase() || "";
      return nama.includes(query) || ic.includes(query);
    });

  paparkanRingkasan(hasilCarian);
}

// Mula proses bila data berjaya dimuatkan
fetchData().then(() => {
  document.getElementById("searchInput").addEventListener("input", cariData);
});

// Fungsi Kemaskini
function paparSenaraiKemaskini() {
  const container = document.getElementById("updateContent");
  container.innerHTML = "<h4>Senarai Pesakit (Kemaskini)</h4>";

  const senarai = document.createElement("div");
  senarai.classList.add("results-list");

  // Buang baris 0 dan 1 (header & slice)
  const dataTanpaHeader = sheetData.slice(2);

  // Terbalikkan susunan
  const dataTerbalik = [...dataTanpaHeader].reverse();

  dataTerbalik.forEach((row, indexTerbalik) => {
    const indexAsal = sheetData.length - 1 - indexTerbalik;

    const nama = selamat(row[6]);
    const ic = selamat(row[8]);
    const tarikh = selamat(row[23]);

    const item = document.createElement("div");
    item.classList.add("result-item");
    item.innerHTML = `
      <strong>${nama}</strong> (${ic})<br>
      Tarikh Kemasukan: ${tarikh}<br>
      <button onclick="bukaKemaskini(${indexAsal})">Kemaskini</button>
    `;

    senarai.appendChild(item);
  });

  container.appendChild(senarai);
}
