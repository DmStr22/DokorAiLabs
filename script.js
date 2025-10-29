let currentSlide = 0;
const totalSlides = 3;
let autoplayInterval;
let isPlaying = true;
let currentLanguage = 'en';

const languageInfo = {
    en: { flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg' },
    es: { flag: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_España.svg' },
    ca: { flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg' }
};

const translations = {
    en: {
        title: "DokorAI Labs",
        slogan: "Causalistic AI for a causal world",
        footer: "Founder & CEO: Aleix Pérez Argelich · Status: Research & Development (R&D) / Proof of Concept (PoC) · Operational Entity: DokorAl Services, SL (For-Profit) · Sector: Causal AI R&D / Model Alignment Architecture<br>Contact: <a href='mailto:dokorailabs@proton.me'>dokorailabs@proton.me</a>"
    },
    es: {
        title: "DokorAI Labs",
        slogan: "IA Causalista para un mundo causal",
        footer: "Fundador y CEO: Aleix Pérez Argelich · Estado: Investigación y Desarrollo (I+D) / Prueba de Concepto (PoC) · Entidad Operativa: DokorAl Services, SL (Con Ánimo de Lucro) · Sector: I+D en IA Causal / Arquitectura de Alineación de Modelos<br>Contacto: <a href='mailto:dokorailabs@proton.me'>dokorailabs@proton.me</a>"
    },
    ca: {
        title: "DokorAI Labs",
        slogan: "IA Causalista per a un món causal",
        footer: "Fundador i CEO: Aleix Pérez Argelich · Estat: Recerca i Desenvolupament (R&D) / Prova de Concepte (PoC) · Entitat Operativa: DokorAl Services, SL (Amb Ànim de Lucre) · Sector: R&D en IA Causal / Arquitectura d'Alineació de Models<br>Contacte: <a href='mailto:dokorailabs@proton.me'>dokorailabs@proton.me</a>"
    }
};

function toggleLanguageMenu() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.toggle('open');
    }
}

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
    }
});

function changeLanguage(lang) {
    currentLanguage = lang;
    
    document.getElementById('currentFlag').innerHTML = `<img src="${languageInfo[lang].flag}" class="lang-flag-img">`;
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('slogan').textContent = translations[lang].slogan;
    document.getElementById('footer').innerHTML = translations[lang].footer;
    
    document.querySelectorAll('.lang-option').forEach((option, index) => {
        const langs = ['en', 'es', 'ca'];
        option.classList.toggle('active', langs[index] === lang);
    });
    
    document.getElementById('langDropdown').classList.remove('open');
    updateImages();
    updateCarousel();
    localStorage.setItem('preferredLanguage', lang);
}

function isMobilePortrait() {
    return window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
}

function updateImages() {
    const isMobile = isMobilePortrait();
    const mobileSuffix = isMobile ? '-mobile' : '';
    const langSuffix = `-${currentLanguage}`;
    
    for (let i = 1; i <= 3; i++) {
        const img = document.getElementById(`img${i}`);
        if (img) {
            const cacheBuster = `?v=${Date.now()}`; 
            const imagePath = `${i}${langSuffix}${mobileSuffix}.png${cacheBuster}`;
            img.src = imagePath;
        }
    }
}

function updateCarousel() {
    const slides = document.getElementById('slides');
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function toggleAutoplay() {
    const pauseBtn = document.getElementById('pauseBtn');
    if (isPlaying) {
        clearInterval(autoplayInterval);
        pauseBtn.textContent = '▶';
        isPlaying = false;
    } else {
        startAutoplay();
        pauseBtn.textContent = '❚❚';
        isPlaying = true;
    }
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 10000);
}

window.addEventListener('resize', updateImages);
window.addEventListener('orientationchange', updateImages);

window.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    currentLanguage = savedLang;
    
    document.getElementById('currentFlag').innerHTML = `<img src="${languageInfo[savedLang].flag}" class="lang-flag-img">`;
    document.getElementById('title').textContent = translations[savedLang].title;
    document.getElementById('slogan').textContent = translations[savedLang].slogan;
    document.getElementById('footer').innerHTML = translations[savedLang].footer;
    
    document.querySelectorAll('.lang-option').forEach((option, index) => {
        const langs = ['en', 'es', 'ca'];
        option.classList.toggle('active', langs[index] === savedLang);
    });
    
    updateImages();
    startAutoplay();
});