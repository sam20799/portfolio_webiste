// Loading screen animation
const hellos = ['Hello','Hola','こんにちは','नमस्ते'];
let currentIndex = 0;
const helloText = document.getElementById('helloText');
const loadingScreen = document.getElementById('loadingScreen');

function showNextHello() {
    if (currentIndex < hellos.length) {
        helloText.textContent = hellos[currentIndex];
        helloText.style.animation = 'none';
        void helloText.offsetWidth;  
        helloText.style.animation = 'fadeInOut 0.5s forwards';
        currentIndex++;
        setTimeout(showNextHello, 500);
    } else {
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 300);
    }
}
showNextHello();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const projectPreview = document.getElementById('projectPreview');

// Preload project preview images
function preloadImages() {
    const projectCards = document.querySelectorAll('.project-card[data-preview]');
    projectCards.forEach(card => {
        const previewUrl = card.getAttribute('data-preview');
        if (previewUrl && previewUrl.startsWith('http') || previewUrl.startsWith('Images/')) {
            const img = new Image();
            img.src = previewUrl;
        }
    });
}

// Preload images after page loads
window.addEventListener('load', preloadImages);

// Disable custom cursor on mobile
if (window.innerWidth <= 768) {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
    projectPreview.style.display = "none";
} else {
    // Desktop custom cursor behavior
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
}

// Project card interactions
const projectImages = {
    'sentiment': 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
    'chatbot': 'linear-gradient(135deg, rgba(106, 90, 205, 0.9), rgba(240, 147, 251, 0.9))',
    'image': 'linear-gradient(135deg, rgba(138, 123, 200, 0.9), rgba(240, 147, 251, 0.9))',
    'object': 'linear-gradient(135deg, rgba(118, 75, 162, 0.9), rgba(102, 126, 234, 0.9))',
    'analytics': 'linear-gradient(135deg, rgba(147, 112, 219, 0.9), rgba(102, 126, 234, 0.9))',
    'speech': 'linear-gradient(135deg, rgba(163, 102, 217, 0.9), rgba(118, 75, 162, 0.9))'
};

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursor.classList.add('arrow');
        const previewUrl = card.getAttribute('data-preview');
        if (previewUrl) {
            // Preload and show immediately
            projectPreview.style.backgroundImage = `url(${previewUrl})`;
            // Small delay to ensure image is set before showing
            requestAnimationFrame(() => {
                projectPreview.classList.add('show');
            });
        }
    });
    
    card.addEventListener('mouseleave', () => {
        cursor.classList.remove('arrow');
        card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        projectPreview.classList.remove('show');
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10; 
        const rotateY = ((x - centerX) / centerX) * -10;
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        projectPreview.style.left = (e.clientX + 20) + 'px';
        projectPreview.style.top = (e.clientY + 20) + 'px';
    });
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// About text animation
const text1 = "I'm Shubham, a passionate Machine Learning and AI developer focused on creating intelligent systems that solve real-world problems. With expertise in deep learning, natural language processing, and computer vision, I transform complex data into actionable insights.";
const text2 = "I believe in the power of artificial intelligence to revolutionize industries and improve lives. My work spans from developing neural networks to deploying production-ready AI solutions.";

const aboutText1 = document.getElementById('aboutText1');
const aboutText2 = document.getElementById('aboutText2');

function wrapWordsInSpans(text, container) {
    const words = text.split(' ');
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.dataset.index = index;
        container.appendChild(span);
        if (index < words.length - 1) {
            container.appendChild(document.createTextNode(' '));
        }
    });
}

wrapWordsInSpans(text1, aboutText1);
wrapWordsInSpans(text2, aboutText2);

const words = document.querySelectorAll('.word');

function revealWords() {
    const aboutSection = document.getElementById('about');
    const aboutRect = aboutSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Get the text containers
    const aboutText1Element = document.getElementById('aboutText1');
    const aboutText2Element = document.getElementById('aboutText2');
    
    if (!aboutText1Element || !aboutText2Element) return;
    
    const text1Rect = aboutText1Element.getBoundingClientRect();
    const text2Rect = aboutText2Element.getBoundingClientRect();
    
    // Start of first text and end of second text
    const textStart = text1Rect.top;
    const textEnd = text2Rect.bottom;
    
    // Define the reveal zone: from when first text enters viewport to when last text exits
    const startPoint = viewportHeight * 0.8; // Start revealing when text is 80% down viewport
    const endPoint = viewportHeight * 0.4;   // Finish revealing when text is 20% down viewport
    
    let scrollProgress = 0;
    
    if (textStart < startPoint && textEnd > endPoint) {
        // Calculate progress between start and end
        const totalDistance = (textEnd - textStart) + (startPoint - endPoint);
        const scrolled = startPoint - textStart;
        scrollProgress = Math.min(Math.max(scrolled / totalDistance, 0), 1);
    } else if (textEnd <= endPoint) {
        // All text has been scrolled through
        scrollProgress = 1;
    }
    
    // Calculate how many words should be revealed
    const wordsToReveal = Math.ceil(scrollProgress * words.length);
    
    words.forEach((word, index) => {
        if (index < wordsToReveal) {
            word.classList.add('revealed');
        } else {
            word.classList.remove('revealed');
        }
    });
}

window.addEventListener('scroll', revealWords);
window.addEventListener('resize', revealWords);
setTimeout(revealWords, 100);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 600;
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.className = 'form-status success';
            contactForm.reset();
        } else {
            formStatus.textContent = 'Oops! There was a problem sending your message.';
            formStatus.className = 'form-status error';
        }
    } catch (error) {
        formStatus.textContent = 'Oops! There was a problem sending your message.';
        formStatus.className = 'form-status error';
    }
});