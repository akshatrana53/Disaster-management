document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.card-toggle');
  toggles.forEach(btn=>{
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      body.style.display = (body.style.display === 'block') ? 'none' : 'block';
      btn.classList.toggle('open');
    });
  });

  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) toTop.style.display = 'block';
    else toTop.style.display = 'none';

    // highlight nav links
    const sections = document.querySelectorAll('main section');
    sections.forEach(sec=>{
      const id = sec.id;
      const link = document.querySelector('.main-nav a[href="#'+id+'"]');
      if(!link) return;
      const rect = sec.getBoundingClientRect();
      if(rect.top <= 120 && rect.bottom >= 120) link.style.color = 'var(--accent)';
      else link.style.color = '';
    });
  });

  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Mobile nav toggle
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  if(navToggle) navToggle.addEventListener('click', () => nav.classList.toggle('hidden'));

  // Close mobile nav when link clicked
  document.querySelectorAll('.main-nav a').forEach(a=>{
    a.addEventListener('click', ()=> {
      if(window.innerWidth < 720 && nav) nav.classList.add('hidden');
    });
  });

  /* ===== Modals: contact + privacy ===== */
  const contactBtn = document.getElementById('contactBtn');
  const privacyBtn = document.getElementById('privacyBtn');
  const contactModal = document.getElementById('contactModal');
  const privacyModal = document.getElementById('privacyModal');

  function openModal(modal){
    if(!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // trap basic focus
    const focusable = modal.querySelector('button, [href], input, textarea, select') || modal;
    if(focusable) focusable.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal){
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if(contactBtn) contactBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    openModal(contactModal);
  });
  if(privacyBtn) privacyBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    openModal(privacyModal);
  });

  // close buttons and overlay click
  document.querySelectorAll('.modal-close').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });
  document.querySelectorAll('.modal').forEach(mod => {
    mod.addEventListener('click', (e)=>{
      if(e.target === mod) closeModal(mod);
    });
  });

  // Contact form submit (simulated)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      const errEl = contactForm.querySelector('.form-error');
      const successEl = contactForm.querySelector('.form-success');
      errEl.style.display = 'none';
      successEl.style.display = 'none';

      // basic validation
      if(!name || !email || !message){
        errEl.textContent = 'Please fill in all fields.';
        errEl.style.display = 'block';
        return;
      }
      // simple email check
      if(!/^\S+@\S+\.\S+$/.test(email)){
        errEl.textContent = 'Please enter a valid email address.';
        errEl.style.display = 'block';
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      const prevText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      // simulate async send
      setTimeout(()=>{
        submitBtn.disabled = false;
        submitBtn.textContent = prevText;
        contactForm.reset();
        successEl.style.display = 'block';

        // auto-close after brief moment
        setTimeout(()=>{
          successEl.style.display = 'none';
          closeModal(contactModal);
        }, 1400);
      }, 1000);
    });
  }

});