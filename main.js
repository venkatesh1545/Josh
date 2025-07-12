// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Simple validation
  if (!name || !email) {
    alert('Please fill in your name and email (required fields).');
    return;
  }
  
  // Simulate form submission
  alert('Thank you for contacting me! I will get back to you soon.');
  contactForm.reset();
});

// Animate on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.project-card, .recommendation-card, .contact-item');
animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// CV download functionality
const cvButton = document.querySelector('.cta-button');
cvButton.addEventListener('click', () => {
  // Create a simple CV download simulation
  const link = document.createElement('a');
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`
RAYAN ADLRARD
Front-end Developer & UX Designer

Contact Information:
Email: rayan.adlrard@example.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA

Skills:
- HTML5 & CSS3
- JavaScript (ES6+)
- React.js
- Vue.js
- Node.js
- UI/UX Design
- Responsive Design
- Version Control (Git)

Experience:
- 5+ years in web development
- Specializing in front-end technologies
- Strong focus on user experience
- Collaborated with cross-functional teams

This is a simplified CV. For a complete version, please contact me directly.
  `);
  link.download = 'Rayan_Adlrard_CV.txt';
  link.click();
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Typing effect for hero section
const heroTitle = document.querySelector('.hero-text h1');
const heroSubtitle = document.querySelector('.hero-text h2');

function typeWriter(element, text, speed = 100) {
  element.textContent = '';
  let i = 0;
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    typeWriter(heroTitle, "I'm Rayan Adlrard", 100);
    setTimeout(() => {
      typeWriter(heroSubtitle, "Front-end Developer", 100);
    }, 2000);
  }, 500);
});

// Smooth reveal animation for hero illustration
const heroIllustration = document.querySelector('.hero-illustration');
setTimeout(() => {
  heroIllustration.style.opacity = '1';
  heroIllustration.style.transform = 'translateX(0)';
}, 3000);

// Initial setup
heroIllustration.style.opacity = '0';
heroIllustration.style.transform = 'translateX(50px)';
heroIllustration.style.transition = 'opacity 1s ease, transform 1s ease';

// Recommendations Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.recommendation-card');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.recommendations-container');
const totalSlides = slides.length;
const visibleSlides = 3; // Show 3 cards at a time
const maxSlides = totalSlides - visibleSlides + 1;

function showSlide(index) {
  // Remove active class from all dots
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Calculate transform based on current slide
  const slideWidth = 320 + 24; // card width + gap
  const transform = -index * slideWidth;
  
  container.style.transform = `translateX(${transform}px)`;
  
  // Add active class to current dot
  if (dots[index]) {
    dots[index].classList.add('active');
  }
  
  currentSlide = index;
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Auto-play carousel
function autoPlay() {
  currentSlide = (currentSlide + 1) % maxSlides;
  showSlide(currentSlide);
}

// Initialize carousel
showSlide(0);

// Auto-play every 5 seconds
setInterval(autoPlay, 5000);
