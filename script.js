// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const closeSidebarBtn = document.querySelector('.close-sidebar');
const sidebar = document.querySelector('.sidebar');

// Function to open sidebar
function openSidebar() {
    sidebar.classList.add('active');
}

// Function to close sidebar
function closeSidebar() {
    sidebar.classList.remove('active');
}

// Event Listeners for sidebar
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openSidebar();
    });
}

if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSidebar();
    });
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnToggle = mobileMenuToggle.contains(e.target);
    
    if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Close sidebar when clicking on a link (mobile)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// Prevent clicks inside sidebar from closing it
sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Scroll reveal animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Check if skills section is in view and animate
function checkSkillsInView() {
    const skillsSection = document.getElementById('skills');
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const sectionHeight = skillsSection.offsetHeight;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - sectionHeight/3) {
        animateSkillBars();
        window.removeEventListener('scroll', checkSkillsInView);
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Event listeners
window.addEventListener('scroll', scrollReveal);
window.addEventListener('scroll', checkSkillsInView);
window.addEventListener('load', scrollReveal);

// Initialize animations
setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
    });
}, 500); 