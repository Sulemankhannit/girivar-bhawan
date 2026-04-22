document.addEventListener('DOMContentLoaded', () => {
  const leaveForm = document.getElementById('leaveForm');
  if (leaveForm) {
    const outDateInput = document.getElementById('outDate');
    const returnDateInput = document.getElementById('returnDate');
    if (outDateInput && returnDateInput) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      const minDateTime = now.toISOString().slice(0, 16);
      outDateInput.min = minDateTime;
      returnDateInput.min = minDateTime;
      outDateInput.addEventListener('change', () => {
        returnDateInput.min = outDateInput.value || minDateTime;
      });
    }
    leaveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const requiredFields = leaveForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = 'var(--border-light)';
        }
      });
      const parentNumber = document.getElementById('parentNumber').value;
      if (parentNumber && !/^\d{10}$/.test(parentNumber)) {
        isValid = false;
        document.getElementById('parentNumber').style.borderColor = 'red';
        alert('Please enter a valid 10-digit Parent\'s Number.');
      }
      const outDate = new Date(document.getElementById('outDate').value);
      const returnDate = new Date(document.getElementById('returnDate').value);
      if (outDate && returnDate && returnDate < outDate) {
        isValid = false;
        alert('Return date cannot be earlier than out date.');
      }
      if (isValid) {
        alert('Leave application submitted successfully for review.');
        leaveForm.reset();
      }
    });
  }
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rollNo = document.getElementById('rollNo').value;
      const password = document.getElementById('password').value;
      if (rollNo && password) {
        alert(`Login simulated successfully for ${rollNo}.`);
      } else {
        alert('Please provide valid credentials.');
      }
    });
  }
});
