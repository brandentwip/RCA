// Form handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    setContactFormDefaults();

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
      const interest = document.getElementById('interest') ? document.getElementById('interest').value : '';
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validation
      if (!name || !email || !subject || !message) {
        showMessage('Please fill in all required fields', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }

      // UI elements for loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnText = submitBtn ? submitBtn.querySelector('span') : null;
      const spinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

      // Set loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';
      if (spinner) spinner.style.display = 'inline-block';

      // EmailJS configuration keys - update these with your live credentials
      const serviceId = 'service_jamt6rd';
      const templateId = 'template_u7bhbgs';

      // Check if credentials are still placeholder keys
      const isSandboxMode = serviceId.includes('YOUR_') || templateId.includes('YOUR_');

      if (isSandboxMode) {
        console.warn('EmailJS Sandbox Mode: Simulation in progress. To send live emails, replace the credentials in public/js/main.js and public/contact.html.');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        showMessage('Sandbox Success: Your message was simulated successfully! Set live EmailJS credentials in main.js to send real emails.', 'success');
        contactForm.reset();

        // Reset loading state
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (spinner) spinner.style.display = 'none';
        return;
      }

      try {
        // Send email via EmailJS
        const templateParams = {
          from_name: name,
          from_email: email,
          phone: phone,
          interest: interest,
          subject: subject,
          message: message
        };

        const response = await emailjs.send(
          serviceId,
          templateId,
          templateParams
        );

        if (response.status === 200) {
          showMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
          contactForm.reset();
        } else {
          showMessage('Failed to send message. Please try again.', 'error');
        }
      } catch (error) {
        console.error('EmailJS Error:', error);
        showMessage('An error occurred while sending. Please verify your EmailJS setup or try again later.', 'error');
      } finally {
        // Reset loading state
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (spinner) spinner.style.display = 'none';
      }
    });
  }

  // Set active nav link
  setActiveNav();
});

function setContactFormDefaults() {
  const params = new URLSearchParams(window.location.search);
  const interestParam = params.get('interest');

  if (interestParam !== 'careers') {
    return;
  }

  const interest = document.getElementById('interest');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  if (interest) {
    interest.value = 'Looking For Career Opportunities';
  }

  if (subject && !subject.value.trim()) {
    subject.value = 'Career application';
  }

  if (message && !message.value.trim()) {
    message.value = 'I would like to apply for a career opportunity at RCA and Co LLP.';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(message, type) {
  const messageDiv = document.getElementById('formMessage');
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;

    if (type === 'success') {
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }
  }
}

function setActiveNav() {
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('active');
    }
  });
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      if (nav) {
        nav.classList.toggle('open');
      }
    });
  }

  // Close menu on link click
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav) {
        nav.classList.remove('open');
      }
    });
  });
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
