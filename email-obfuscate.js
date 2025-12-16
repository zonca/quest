(() => {
  const reversedBase64Emails = {
    info: 't92YuEGbs9mahxGdzVWdxB0bm5Wa', // reverse of base64('info@questlajolla.com')
    claudia: 't92YuEGbs9mahxGdzVWdxBUYpRWdhx2Y' // reverse of base64('claudia@questlajolla.com')
  };

  const decodeEmail = (key) => {
    const encoded = reversedBase64Emails[key];
    if (!encoded) return null;
    const reversed = encoded.split('').reverse().join('');
    try {
      const padded = reversed.padEnd(Math.ceil(reversed.length / 4) * 4, '=');
      return atob(padded);
    } catch (e) {
      return null;
    }
  };

  const setEmailLinks = () => {
    document.querySelectorAll('[data-email-key]').forEach((link) => {
      const key = link.getAttribute('data-email-key');
      const email = decodeEmail(key);
      if (!email) return;

      link.setAttribute('href', `mailto:${email}`);

      const emailText = link.querySelector('.email-text');
      if (emailText) {
        emailText.textContent = email;
      } else {
        link.textContent = email;
      }
    });
  };

  const setPhoneLinks = () => {
    document.querySelectorAll('[data-phone]').forEach((link) => {
      const phone = link.getAttribute('data-phone');
      if (!phone) return;
      const label = link.getAttribute('data-phone-label') || phone;

      link.setAttribute('href', `tel:${phone}`);

      const phoneText = link.querySelector('.phone-text');
      if (phoneText) {
        phoneText.textContent = label;
      }
    });
  };

  setEmailLinks();
  setPhoneLinks();
})();
