// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Gallery Tabs Functionality - Simplified for single "All" button
const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        galleryTabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Since we only have "all" category now, show all items
        galleryItems.forEach(item => {
            item.style.display = 'block';
        });
    });
});

// Initialize gallery to show all items
window.addEventListener('load', () => {
    galleryItems.forEach(item => {
        item.style.display = 'block';
    });
});

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const closeModal = document.querySelector('.close-modal');
const videoPlayBtns = document.querySelectorAll('.video-play-btn');

videoPlayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const videoId = btn.getAttribute('data-video');
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoModal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoPlayer.src = '';
});

// Close modal when clicking outside
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoPlayer.src = '';
    }
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(41, 47, 54, 0.95)';
        header.style.padding = '15px 0';
    } else {
        header.style.background = 'var(--dark)';
        header.style.padding = '20px 0';
    }
});

// Image animation on scroll
const animatedImages = document.querySelectorAll('.animated-img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animatedImages.forEach(img => {
    imageObserver.observe(img);
});

// Fixed Carousel Functionality
const carouselSlides = document.querySelector('.carousel-slides');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel-slide').length;

// Function to show specific slide
function showSlide(index) {
    // Calculate the translation percentage (100 / totalSlides)
    const translateX = -index * (100 / totalSlides);
    carouselSlides.style.transform = `translateX(${translateX}%)`;
    
    // Update active dot
    carouselDots.forEach(dot => dot.classList.remove('active'));
    if (carouselDots[index]) {
        carouselDots[index].classList.add('active');
    }
    
    currentSlide = index;
}

// Add click event to dots
carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Auto slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}, 5000);

// Initialize first slide
showSlide(0);
