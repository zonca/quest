(() => {
  const setEmailLinks = () => {
    document.querySelectorAll('[data-email-user][data-email-domain]').forEach((link) => {
      const user = link.getAttribute('data-email-user');
      const domain = link.getAttribute('data-email-domain');
      if (!user || !domain) return;

      const email = `${user}@${domain}`;
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
