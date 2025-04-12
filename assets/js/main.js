document.addEventListener('DOMContentLoaded', function() {
  // Dark Mode Functionality
  const toggleModeBtn = document.getElementById('toggleModeBtn');
  const enableDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (enableDarkMode) {
    document.body.classList.add('dark-mode');
  }

  toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  // Navigation System
  const pages = {
    navHawthorn: 'mainContent',
    navDaftar: 'formContent',
    navCarian: 'searchContent',
    navKemaskini: 'updateContent',
    navLaporan: 'reportContent',
    navBantuan: 'helpContent'
  };

  document.querySelectorAll('.navigation li').forEach(navItem => {
    navItem.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all nav items
      document.querySelectorAll('.navigation li').forEach(item => {
        item.classList.remove('active');
      });
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Hide all pages
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      
      // Show selected page
      const pageId = pages[this.id];
      if (pageId) {
        document.getElementById(pageId).classList.add('active');
      }
    });
  });

  // Form Handling
  const registrationForm = document.getElementById('registrationForm');
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simpan ke localStorage (contoh sahaja)
      let patients = JSON.parse(localStorage.getItem('patients')) || [];
      patients.push(data);
      localStorage.setItem('patients', JSON.stringify(patients));
      
      // Reset form
      this.reset();
      
      // Show success message
      alert('Rekod pesakit berjaya disimpan!');
      console.log('Data saved:', data);
    });
  }

  // Initialize - Show default page
  document.getElementById('mainContent').classList.add('active');
});
