import './styles/main.scss';

type CV = {
  meta: { emailDestination: string; name: string; role: string; photo: string };
  about: string;
  skills: Array<{ name: string; level: string }>;
  projects: Array<{ title: string; description: string; image: string; link?: string }>;
};

async function loadCV() {
  const res = await fetch('/data/cv.json');
  const data: CV = await res.json();
  renderCV(data);
  setupContactForm(data.meta.emailDestination);
}

function renderCV(data: CV) {
  const nameEl = document.getElementById('name')!;
  const roleEl = document.getElementById('role')!;
  const aboutEl = document.getElementById('about')!;
  const skillsEl = document.getElementById('skills')!;
  const projectsEl = document.getElementById('projects')!;
  const photo = document.getElementById('profile-photo') as HTMLImageElement;

  nameEl.textContent = data.meta.name;
  roleEl.textContent = data.meta.role;
  aboutEl.innerHTML = `<h2>Sobre mí</h2><p>${data.about}</p>`;

  skillsEl.innerHTML = `<h2>Habilidades</h2><ul>${data.skills.map(s => `<li>${s.name} — ${s.level}</li>`).join('')}</ul>`;

  projectsEl.innerHTML = `<h2>Proyectos</h2><div class="projects">${data.projects.map(p => `
    <article class="project">
      <img src="${p.image}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      ${p.link ? `<a href="${p.link}" target="_blank">Ver</a>` : ''}
    </article>`).join('')}</div>`;

  photo.src = data.meta.photo;
}

function setupContactForm(emailDestination: string) {
  // Usaremos formsubmit.co: action debe apuntar a https://formsubmit.co/<tu-email>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  form.action = `https://formsubmit.co/${encodeURIComponent(emailDestination)}`;

  // Importa la validación / envío del archivo components/contactForm.ts o define aquí
  // Validación básica:
  form.addEventListener('submit', (e) => {
    const name = (document.getElementById('nameInput') as HTMLInputElement).value.trim();
    const email = (document.getElementById('emailInput') as HTMLInputElement).value.trim();
    const message = (document.getElementById('messageInput') as HTMLTextAreaElement).value.trim();
    const msgDiv = document.getElementById('contact-msg')!;

    if (!name || !email || !message) {
      e.preventDefault();
      msgDiv.textContent = 'Por favor completa todos los campos.';
      return;
    }
    // validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      msgDiv.textContent = 'Ingresa un correo válido.';
      return;
    }

    // Opcional: mostrar mensaje de envío y permitir que formsubmit redirija
    msgDiv.textContent = 'Enviando...';
    // formsubmit manejará el POST. Puedes agregar hidden inputs (_next, _captcha) si quieres.
    // Ejemplo para evitar captcha y redirigir:
    const nextInput = document.createElement('input');
    nextInput.type = 'hidden';
    nextInput.name = '_next';
    nextInput.value = window.location.href + '?sent=true';
    form.appendChild(nextInput);

    const captchaOff = document.createElement('input');
    captchaOff.type = 'hidden';
    captchaOff.name = '_captcha';
    captchaOff.value = 'false';
    form.appendChild(captchaOff);
    // No prevengas el submit; dejar que se envíe.
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadCV().catch(err => {
    console.error(err);
    document.body.insertAdjacentHTML('afterbegin', '<p style="color:red">Error cargando CV.</p>');
  });
});
