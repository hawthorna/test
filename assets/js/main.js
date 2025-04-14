document.addEventListener("DOMContentLoaded", function () {
  // ========== Dark Mode ==========
  const toggleModeBtn = document.getElementById("toggleModeBtn");
  if (toggleModeBtn) {
    toggleModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // ========== Navigasi Sidebar ==========
  const navLinks = document.querySelectorAll(".navigation ul li");
  const mainContent = document.querySelector(".main-content");
  const formContainer = document.querySelector(".form-container");
  const searchContent = document.getElementById("searchContent");
  const defaultContent = mainContent?.innerHTML || "";

  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      if (!navLinks || !mainContent || !formContainer || !searchContent) return;

      navLinks.forEach(item => item.classList.remove("active"));
      this.classList.add("active");

      const title = this.querySelector(".title")?.innerText.trim() || "";

      switch (title) {
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

  // ========== Borang Daftar Baru ==========
  document.addEventListener("DOMContentLoaded", function () {
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

  // Papar bahagian pertama masa mula-mula
  showPart(currentPart);
});

  // ========== Carian Pesakit ==========
let spreadsheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYhFI5Tzsbfvy9ncpPNRJxSVWh1Ln2p2KyXqgGe__mL-n6O7-e113vf0oFxti24g/pub?output=csv";
    let sheetData = [];
    let header = [];

    async function fetchData() {
        try{
            let response = await fetch(spreadsheetURL);
            let dataText = await response.text();
            let rows = dataText.trim().split("\n");
            header = rows[0].split(",");
            sheetData = rows.slice(1).map(row => row.split(","));
        } catch(err){
            console.error("Terdapat ralat semasa mengambil data:", err);
        }
    }

    function cariData() {
        let query = document.getElementById("carian").value.toLowerCase().trim();
        let tarikhMula = document.getElementById("tarikh-mula").value;
        let tarikhAkhir = document.getElementById("tarikh-akhir").value;

        console.log("Carian:", query);
        console.log("Tarikh Mula:", tarikhMula);
        console.log("Tarikh Akhir:", tarikhAkhir);

    let hasilCarian = sheetData.filter(row => {
        let tarikhKemasukan = row[24];

    // Jika tiada tarikh kemasukan, terus tolak
        if (!tarikhKemasukan) return false;

    // Semak format tarikh (DD/MM/YYYY)
       let tarikhFormatBetul = tarikhKemasukan.match(/\d{2}\/\d{2}\/\d{4}/);
       if (!tarikhFormatBetul) return false;

    // Tukar kepada objek Date
       let [day, month, year] = tarikhKemasukan.split("/");
       let tarikhObj = new Date(`${year}-${month}-${day}`);

    // Tapis ikut julat
       if (tarikhMula && tarikhObj < new Date(tarikhMula)) return false;
       if (tarikhAkhir && tarikhObj > new Date(tarikhAkhir)) return false;

    // Tapis ikut carian (jika ada)
       if (query) {
           let adaCarian = row.some(col => col.toLowerCase().includes(query));
           if (!adaCarian) return false;
    }

       console.log("LULUS ->", tarikhObj);
       return true;
 
    });

    paparkanData(hasilCarian);

    }

    function paparkanData(data) {
    let htmlContent = `<table>
                        <tr>
                            <th>No.</th>
                            <th>Consultant</th>
                            <th>Specialist</th>
                            <th>Admitting Approved Hospital</th>
                            <th>Admission/ Detention Order</th>
                            <th>Name</th>
                            <th>RN</th>
                            <th>IC Number</th>
                            <th>Case Number</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Race (Specify)</th>
                            <th>Nationality (Specify)</th>
                            <th></th>
                            <th>Referring State/ Territory</th>
                            <th>Referring Court/ AGC/ Authority</th>
                            <th>Referring Court/ AGC/ Authority (Specify)</th>
                            <th>Charges (specify)</th>
                            <th>Number of Charges (Specify)</th>
                            <th>Victim (Violent or Sexual Offences)</th>
                            <th></th>
                            <th>Date of First Court Order</th>
                            <th>Admission Date</th>
                            <th>Discharge Date</th>
                            <th>Report Dated</th>
                            <th>Admission Date to Report Date</th>
                            <th></th>
                            <th>Marital Status</th>
                            <th>Employment at Time of Offence</th>
                            <th>Residential Status Before Alleged Offence</th>
                            <th>Education Level (Completed)</th>
                            <th></th>
                            <th>Past Medical History: Medical Comorbidity</th>
                            <th>Past Medical History: DM</th>
                            <th>Past Medical History: Hypertension</th>
                            <th>Past Medical History: Dyslipidemia</th>
                            <th>Past Medical History: Traumatic Brain Injury</th>
                            <th>Past Medical History: Others (Specify)</th>
                            <th>Family History of Mental Illness</th>
                            <th>Past Psychiatric Contact</th>
                            <th>Number of Past Psychiatric Admission</th>
                            <th>Defaulted Psychiatric Treatment Before Alleged Offence </th>
                            <th>Past Forensic (Conviction) History</th>
                            <th>History of 342 CPC Admission</th>
                            <th>Number of Previous 342 Admission</th>
                            <th>History of 344/ 348 CPC Admission</th>
                            <th></th>
                            <th>Type of Substance Used Before (Life Time): Use of Illicit Substance</th>
                            <th>Type of Substance Used Before (Life Time): Alcohol</th>
                            <th>Type of Substance Used Before (Life Time): Stimulant</th>
                            <th>Type of Substance Used Before (Life Time): Cannabis</th>
                            <th>Type of Substance Used Before (Life Time): Opiod</th>
                            <th>Type of Substance Used Before (Life Time): Inhalant</th>
                            <th>Type of Substance Used Before (Life Time): Hallucinogen</th>
                            <th>Type of Substance Used Before (Life Time): Sedatives</th>
                            <th>Type of Substance Used Before (Life Time): Kratum</th>
                            <th>Type of Substance Used Before (Life Time): Others (Specify)</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Use of Illicit Substance</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Alcohol</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Stimulants</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Cannabis</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Opioid</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Inhalant</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Hallucinogen</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Sedatives</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Kratum</th>
                            <th>Type of Substance Used Before (Past 1 Year Prior to Alleged Offence): Others (Specify)</th>
                            <th>Urine Drug Testing (Screening) on Admission: Meth</th>
                            <th>Urine Drug Testing (Screening) on Admission: Amp</th>
                            <th>Urine Drug Testing (Screening) on Admission: THC</th>
                            <th>Urine Drug Testing (Screening) on Admission: Benzo</th>
                            <th>Urine Drug Testing (Screening) on Admission: Morphine</th>
                            <th>Urine Drug Testing (Screening) on Admission: MDMA</th>
                            <th>Urine Drug Testing (Screening) on Admission: Ketamine</th>
                            <th>Urine Drug Testing (Screening) on Admission: Others (Specify) </th>
                            <th></th>
                            <th>Referral to Clinical Psychologist: MMPI</th>
                            <th>Referral to Clinical Psychologist: WAIS</th>
                            <th>Referral to Clinical Psychologist: CTONI</th>
                            <th>Referral to Clinical Psychologist: KBNA</th>
                            <th>Referral to Clinical Psychologist: TOMM</th>
                            <th>Referral to Clinical Psychologist: SIRS</th>
                            <th>Referral to Clinical Psychologist: SIMS</th>
                            <th>Referral to Clinical Psychologist: Others (Specify)</th>
                            <th>Neuroimaging</th>
                            <th>EEG</th>
                            <th>Home or Site Visit Done </th>
                            <th></th>
                            <th>ECT</th>
                            <th>Physical Aggression Towards Others In the Ward</th>
                            <th>Victim of Aggression in the Ward</th>
                            <th>Self-Harm in The Ward</th>
                            <th>Restraint </th>
                            <th></th>
                            <th>Final Diagnosis 1 </th>
                            <th>Final Diagnosis 2 </th>
                            <th>Final Diagnosis 3 </th>
                            <th>Final Diagnosis 4 </th>
                            <th>Final Diagnosis 5</th>
                            <th>Legal Insanity </th>
                            <th>Fitness to Plead</th>
                            <th></th>
                            <th>Psychotropics on Discharge (Specify)</th>
                            <th>Psychiatric Follow Up on Discharge (Specify Which Hospital)</th>                                
                        </tr>`;

        if(data.length === 0){
            htmlContent +="<tr><td colspan='"+header.length+"'>Tiada data ditemui.</td></tr>";
        } else {
            data.forEach(row => {
            htmlContent += `<tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${row[4]}</td>
                <td>${row[6]}</td>
                <td>${row[7]}</td>
                <td>${row[8]}</td>
                <td>${row[9]}</td>
                <td>${row[10]}</td>
                <td>${row[11]}</td>
                <td>${row[12]}</td>
                <td>${row[13]}</td>
                <td>${row[14]}</td>
                <td>${row?.[15] ?? ""}</td>
                <td>${row[16]}</td>
                <td>${row[17]}</td>
                <td>${row[18]}</td>
                <td>${row[19]}</td>
                <td>${row[20]}</td>
                <td>${row[21]}</td>
                <td>${row?.[22] ?? ""}</td>
                <td>${row[23]}</td>
                <td>${row[34]}</td>
                <td>${row[25]}</td>
                <td>${row[26]}</td>
                <td>${row[27]}</td>
                <td>${row?.[28] ?? ""}</td>
                <td>${row[29]}</td>
                <td>${row[30]}</td>
                <td>${row[31]}</td>
                <td>${row[32]}</td>
                <td>${row?.[33] ?? ""}</td>
                <td>${row[34]}</td>
                <td>${row[35]}</td>
                <td>${row[36]}</td>
                <td>${row[37]}</td>
                <td>${row[38]}</td>
                <td>${row[39]}</td>
                <td>${row[40]}</td>
                <td>${row[41]}</td>
                <td>${row[42]}</td>
                <td>${row[43]}</td>
                <td>${row[44]}</td>
                <td>${row[45]}</td>
                <td>${row[46]}</td>
                <td>${row[47]}</td>
                <td>${row?.[48] ?? ""}</td>
                <td>${row[49]}</td>
                <td>${row[50]}</td>
                <td>${row[51]}</td>
                <td>${row[52]}</td>
                <td>${row[53]}</td>
                <td>${row[54]}</td>
                <td>${row[55]}</td>
                <td>${row[56]}</td>
                <td>${row[57]}</td>
                <td>${row[58]}</td>
                <td>${row[59]}</td>
                <td>${row[60]}</td>
                <td>${row[61]}</td>
                <td>${row[62]}</td>
                <td>${row[63]}</td>
                <td>${row[64]}</td>
                <td>${row[65]}</td>
                <td>${row[66]}</td>
                <td>${row[67]}</td>
                <td>${row[68]}</td>
                <td>${row[69]}</td>
                <td>${row[70]}</td>
                <td>${row[71]}</td>
                <td>${row[72]}</td>
                <td>${row[73]}</td>
                <td>${row[74]}</td>
                <td>${row[75]}</td>
                <td>${row[76]}</td>
                <td>${row?.[77] ?? ""}</td>
                <td>${row[78]}</td>
                <td>${row[79]}</td>
                <td>${row[80]}</td>
                <td>${row[81]}</td>
                <td>${row[82]}</td>
                <td>${row[83]}</td>
                <td>${row[84]}</td>
                <td>${row[85]}</td>
                <td>${row[86]}</td>
                <td>${row[87]}</td>
                <td>${row[88]}</td>
                <td>${row?.[89] ?? ""}</td>
                <td>${row[90]}</td>
                <td>${row[91]}</td>
                <td>${row[92]}</td>
                <td>${row[93]}</td>
                <td>${row[94]}</td>
                <td>${row?.[95] ?? ""}</td>
                <td>${row[96]}</td>
                <td>${row[97]}</td>
                <td>${row[98]}</td>
                <td>${row[99]}</td>
                <td>${row[100]}</td>
                <td>${row[101]}</td>
                <td>${row[102]}</td>
                <td>${row?.[103] ?? ""}</td>
                <td>${(row?.[104] || "").replace(/\n/g, "<br>")}</td>
                <td>${row[105]}</td>
            </tr>`;
            });
        }
        htmlContent += "</table>";
        document.getElementById("hasil").innerHTML = htmlContent;
    }

