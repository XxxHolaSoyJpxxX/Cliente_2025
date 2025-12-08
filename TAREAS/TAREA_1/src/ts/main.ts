// Interfaces
interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface CVData {
  personal: Personal;
  contactEmail: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

// Clase principal
class CVApp {
  private cvData: CVData | null = null;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      await this.loadCVData();
      this.renderCV();
      this.initContactForm();
      this.hideLoading();
    } catch (error) {
      console.error('Error al inicializar la aplicación:', error);
      this.showError('Error al cargar los datos del CV');
    }
  }

  private async loadCVData(): Promise<void> {
    try {
      const response = await fetch('data/cv-data.json');
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
      }
      this.cvData = await response.json();
    } catch (error) {
      console.error('Error al cargar datos:', error);
      throw error;
    }
  }

  private renderCV(): void {
    if (!this.cvData) return;

    this.renderPersonalInfo();
    this.renderExperience();
    this.renderEducation();
    this.renderSkills();
    this.renderProjects();
    this.renderCertifications();
  }

  private renderPersonalInfo(): void {
    if (!this.cvData) return;
    const { personal } = this.cvData;

    this.setTextContent('name', personal.name);
    this.setTextContent('title', personal.title);
    this.setTextContent('summary', personal.summary);
    this.setTextContent('email', personal.email);
    this.setTextContent('phone', personal.phone);
    this.setTextContent('location', personal.location);
    this.setTextContent('footer-name', personal.name);

    const linkedinLink = document.getElementById('linkedin') as HTMLAnchorElement;
    const githubLink = document.getElementById('github') as HTMLAnchorElement;

    if (linkedinLink) linkedinLink.href = personal.linkedin;
    if (githubLink) githubLink.href = personal.github;
  }

  private renderExperience(): void {
    if (!this.cvData) return;
    const container = document.getElementById('experience');
    if (!container) return;

    container.innerHTML = this.cvData.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3 class="timeline-title">${this.escapeHtml(exp.title)}</h3>
          <h4 class="timeline-subtitle">${this.escapeHtml(exp.company)}</h4>
          <p class="timeline-period">${this.escapeHtml(exp.period)}</p>
          <p class="timeline-description">${this.escapeHtml(exp.description)}</p>
          ${exp.achievements && exp.achievements.length > 0 ? `
            <ul class="timeline-list">
              ${exp.achievements.map(achievement => 
                `<li>${this.escapeHtml(achievement)}</li>`
              ).join('')}
            </ul>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  private renderEducation(): void {
    if (!this.cvData) return;
    const container = document.getElementById('education');
    if (!container) return;

    container.innerHTML = this.cvData.education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <h3 class="timeline-title">${this.escapeHtml(edu.degree)}</h3>
          <h4 class="timeline-subtitle">${this.escapeHtml(edu.institution)}</h4>
          <p class="timeline-period">${this.escapeHtml(edu.period)}</p>
          <p class="timeline-description">${this.escapeHtml(edu.description)}</p>
        </div>
      </div>
    `).join('');
  }

  private renderSkills(): void {
    if (!this.cvData) return;
    const container = document.getElementById('skills');
    if (!container) return;

    container.innerHTML = this.cvData.skills.map(skillCat => `
      <div class="skill-category">
        <h3 class="skill-category__title">${this.escapeHtml(skillCat.category)}</h3>
        <div class="skill-tags">
          ${skillCat.items.map(skill => 
            `<span class="skill-tag">${this.escapeHtml(skill)}</span>`
          ).join('')}
        </div>
      </div>
    `).join('');
  }

  private renderProjects(): void {
    if (!this.cvData) return;
    const container = document.getElementById('projects');
    if (!container) return;

    container.innerHTML = this.cvData.projects.map(project => `
      <div class="project-card">
        <h3 class="project-card__title">${this.escapeHtml(project.name)}</h3>
        <p class="project-card__description">${this.escapeHtml(project.description)}</p>
        <div class="project-card__tech">
          ${project.technologies.map(tech => 
            `<span class="tech-tag">${this.escapeHtml(tech)}</span>`
          ).join('')}
        </div>
        <a href="${this.escapeHtml(project.link)}" target="_blank" rel="noopener" class="project-card__link">
          Ver proyecto →
        </a>
      </div>
    `).join('');
  }

  private renderCertifications(): void {
    if (!this.cvData) return;
    const container = document.getElementById('certifications');
    if (!container) return;

    container.innerHTML = this.cvData.certifications.map(cert => `
      <div class="cert-item">
        <div class="cert-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
          </svg>
        </div>
        <div class="cert-content">
          <h4 class="cert-name">${this.escapeHtml(cert.name)}</h4>
          <p class="cert-issuer">${this.escapeHtml(cert.issuer)}</p>
          <p class="cert-date">${this.escapeHtml(cert.date)}</p>
        </div>
      </div>
    `).join('');
  }

  private initContactForm(): void {
    const form = document.getElementById('contactForm') as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleFormSubmit(e));

    // Validación en tiempo real
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input as HTMLInputElement | HTMLTextAreaElement);
      });
      input.addEventListener('input', () => {
        this.clearFieldError(input as HTMLInputElement | HTMLTextAreaElement);
      });
    });
  }

  private async handleFormSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = this.getFormData(form);
    const errors = this.validateForm(formData);

    if (Object.keys(errors).length > 0) {
      this.displayFormErrors(errors);
      return;
    }

    try {
      await this.sendEmail(formData);
      this.showFormSuccess('¡Mensaje enviado con éxito! Te responderé pronto.');
      form.reset();
    } catch (error) {
      this.showFormError('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
  }

  private getFormData(form: HTMLFormElement): ContactFormData {
    return {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    };
  }

  private validateForm(formData: ContactFormData): FormErrors {
    const errors: FormErrors = {};

    if (!formData.name || formData.name.length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.email = 'Por favor, ingresa un correo electrónico válido';
    }

    if (!formData.subject || formData.subject.length < 3) {
      errors.subject = 'El asunto debe tener al menos 3 caracteres';
    }

    if (!formData.message || formData.message.length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    return errors;
  }

  private validateField(field: HTMLInputElement | HTMLTextAreaElement): void {
    const name = field.name;
    const value = field.value.trim();
    let error = '';

    switch (name) {
      case 'name':
        if (!value || value.length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        }
        break;
      case 'email':
        if (!value || !this.isValidEmail(value)) {
          error = 'Por favor, ingresa un correo electrónico válido';
        }
        break;
      case 'subject':
        if (!value || value.length < 3) {
          error = 'El asunto debe tener al menos 3 caracteres';
        }
        break;
      case 'message':
        if (!value || value.length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres';
        }
        break;
    }

    if (error) {
      this.showFieldError(name, error);
      field.classList.add('form-input--error');
    } else {
      this.clearFieldError(field);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private displayFormErrors(errors: FormErrors): void {
    Object.keys(errors).forEach(fieldName => {
      this.showFieldError(fieldName, errors[fieldName]);
      const field = document.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.classList.add('form-input--error');
      }
    });
  }

  private showFieldError(fieldName: string, message: string): void {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  private clearFieldError(field: HTMLInputElement | HTMLTextAreaElement): void {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
    field.classList.remove('form-input--error');
  }

  private async sendEmail(formData: ContactFormData): Promise<void> {
    if (!this.cvData) return;

    // Usando FormSubmit.co
    const form = document.createElement('form');
    form.action = `https://formsubmit.co/${this.cvData.contactEmail}`;
    form.method = 'POST';
    form.style.display = 'none';

    const fields: { [key: string]: string } = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      '_captcha': 'false',
      '_template': 'table'
    };

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  private showFormSuccess(message: string): void {
    const statusElement = document.getElementById('formStatus');
    if (statusElement) {
      statusElement.className = 'form-status form-status--success';
      statusElement.innerHTML = `
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        ${this.escapeHtml(message)}
      `;
      statusElement.style.display = 'flex';

      setTimeout(() => {
        statusElement.style.display = 'none';
      }, 5000);
    }
  }

  private showFormError(message: string): void {
    const statusElement = document.getElementById('formStatus');
    if (statusElement) {
      statusElement.className = 'form-status form-status--error';
      statusElement.innerHTML = `
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        ${this.escapeHtml(message)}
      `;
      statusElement.style.display = 'flex';

      setTimeout(() => {
        statusElement.style.display = 'none';
      }, 5000);
    }
  }

  private setTextContent(id: string, text: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private hideLoading(): void {
    const loading = document.getElementById('loading');
    if (loading) {
      setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
          loading.style.display = 'none';
        }, 300);
      }, 500);
    }
  }

  private showError(message: string): void {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.innerHTML = `
        <div style="text-align: center; color: #e53e3e;">
          <h2>Error</h2>
          <p>${this.escapeHtml(message)}</p>
        </div>
      `;
    }
  }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  new CVApp();
});