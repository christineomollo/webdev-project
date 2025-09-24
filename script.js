/* main.js — shared site behavior for BurBestie */
document.addEventListener('DOMContentLoaded', () => {
  // Date in footer
  const yearEls = document.querySelectorAll('#year, #yearAbout, #yearConnect, #yearSOS, #yearContact');
  yearEls.forEach(el => el && (el.textContent = new Date().getFullYear()));

  // Nav toggle (works for multiple pages)
  document.querySelectorAll('[id^="navToggle"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Dark mode toggle for any button with id starting with darkToggle
  const applyTheme = (isDark) => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('burbestie-dark', isDark ? '1' : '0');
  };
  const initial = localStorage.getItem('burbestie-dark') === '1';
  applyTheme(initial);
  document.querySelectorAll('[id^="darkToggle"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = !document.documentElement.classList.contains('dark');
      applyTheme(isDark);
      btn.setAttribute('aria-pressed', String(isDark));
    });
  });

  // Quote rotator on Home
  const quotes = [
    "You are stronger than you think.",
    "A Bestie is here to listen—always.",
    "Small steps are still progress, Bestie.",
    "You deserve care, safety, and joy."
  ];
  let qi = 0;
  const quoteEl = document.getElementById('quote');
  if (quoteEl) {
    setInterval(() => {
      qi = (qi + 1) % quotes.length;
      quoteEl.textContent = quotes[qi];
    }, 4200);
  }

  // Mock chat behavior (Connect page)
  const chatForm = document.getElementById('chatForm');
  if (chatForm) {
    const chatWindow = document.getElementById('chatWindow');
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('chatName').value || 'Bestie';
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text) return;
      const div = document.createElement('div');
      div.className = 'msg me';
      div.innerHTML = `<strong>${name}:</strong> ${escapeHtml(text)}`;
      chatWindow.appendChild(div);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      input.value = '';
      // mock reply
      setTimeout(() => {
        const r = document.createElement('div');
        r.className = 'msg other';
        r.innerHTML = `<strong>Bestie B:</strong> Sending you love 💕`;
        chatWindow.appendChild(r);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 900);
    });
  }

  // SOS big button action
  const bigSos = document.getElementById('bigSos');
  if (bigSos) {
    bigSos.addEventListener('click', () => {
      // Visual pop
      bigSos.classList.add('active');
      setTimeout(() => bigSos.classList.remove('active'), 700);
      // Show immediate help modal-like behavior: alert with resources (simple)
      const msg = `If a Bestie is in immediate danger, call your local emergency number right now.\n\nQuick resources:\n- Local Emergency: 112\n- Women's Helpline: 0800-123-456\n\nYou can also fill the anonymous report below.`;
      alert(msg);
    });
  }

  // Quick Exit: redirects immediately to a neutral site
  const quickExit = document.getElementById('quickExit');
  if (quickExit) {
    quickExit.addEventListener('click', (e) => {
      e.preventDefault();
      // Instant redirect to Google (neutral)
      window.location.href = 'https://www.google.com';
    });
  }

  // Report form submit (SOS)
  const reportForm = document.getElementById('reportForm');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = reportForm.elements['type'].value;
      const details = reportForm.elements['details'].value.trim();
      const msgEl = document.getElementById('reportMsg');
      if (!type) {
        msgEl.textContent = 'Please select a concern type.';
        msgEl.style.color = 'crimson';
        return;
      }
      // Here, you would send to server. For demo, we simulate success.
      msgEl.textContent = 'Report submitted (simulated). A Bestie will check in.';
      msgEl.style.color = 'green';
      reportForm.reset();
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();
      const msgEl = document.getElementById('contactMsg');
      if (!name || !email || !message) {
        msgEl.textContent = 'Please complete all fields.';
        msgEl.style.color = 'crimson';
        return;
      }
      // Basic email pattern
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!re.test(email)) {
        msgEl.textContent = 'Please enter a valid email.';
        msgEl.style.color = 'crimson';
        return;
      }
      msgEl.textContent = 'Thanks, Bestie — message sent (simulated).';
      msgEl.style.color = 'green';
      contactForm.reset();
    });
  }

  // Contact form for generic 'contactForm' (contact page earlier)
  const genericContact = document.getElementById('contactForm');
  if (genericContact) {
    // already handled above
  }

}); // DOMContentLoaded

// small helper to escape HTML
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, function(m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
}
