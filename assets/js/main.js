// Set up toggle dark mode button
const toggleModeBtn = document.getElementById('toggleModeBtn');
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Function to display content for "Hawthorn A"
document.querySelector('.navigation ul li a').addEventListener('click', function() {
  document.getElementById('formContent').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
  document.getElementById('mainContent').innerHTML = `
    <div class="logo-container">
      <img src="https://i.postimg.cc/L8PbJ7GJ/Logo-HPJB.png" alt="Logo Hospital" class="logo">
    </div>
    <h1>Bahagian Psikiatri Forensik Hospital Permai</h1>
    <p>Sistem Pengurusan Psikiatri Forensik (eSPPF)</p>
  `;
});

// Function to switch to "Daftar Baru" page
document.querySelector('.navigation ul li:nth-child(2) a').addEventListener('click', function() {
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('formContent').style.display = 'block';
  document.getElementById('formContent').innerHTML = `
    <form id="registrationForm">
      <h2>Daftar Baru</h2>
      <label>Consultant</label>
      <input type="text" name="consultant" required>

      <label>Specialist</label>
      <input type="text" name="specialist" required>

      <label>Admitting Approved Hospital</label>
      <input type="text" name="hospital" required>

      <label>Admission / Detention Order</label>
      <input type="text" name="order" required>

      <label>Name</label>
      <input type="text" name="name" required>

      <label>RN</label>
      <input type="text" name="rn" required>

      <label>IC Number</label>
      <input type="text" name="ic" required>

      <label>Case Number (boleh lebih dari satu)</label>
      <input type="text" name="case_number" placeholder="Pisahkan dengan koma jika lebih dari satu">

      <label>Age</label>
      <input type="number" name="age" required>

      <label>Gender</label>
      <select name="gender" required>
        <option value="">-- Pilih --</option>
        <option value="Lelaki">Lelaki</option>
        <option value="Perempuan">Perempuan</option>
      </select>

      <label>Race (Sila nyatakan)</label>
      <input type="text" name="race" required>

      <label>Nationality (Sila nyatakan)</label>
      <input type="text" name="nationality" required>

      <br><br>
      <button type="submit" title="Hantar maklumat pendaftaran">
        <ion-icon name="send-outline" style="vertical-align: middle;"></ion-icon>
        <span style="margin-left: 6px;">Hantar</span>
      </button>
    </form>
  `;
});

// Carian - Get and display search results based on Google Sheets data
async function fetchPatientData() {
  const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQYhFI5Tzsbfvy9ncpPNRJxSVWh1Ln2p2KyXqgGe__mL-n6O7-e113vf0oFxti24g/pub?output=csv");
  const data = await response.text();

  const rows = data.split("\n").map(row => row.split(","));
  const header = rows[0];
  const rowsData = rows.slice(1);

  return { header, rowsData };
}

// Function to handle search
async function handleSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const { header, rowsData } = await fetchPatientData();
