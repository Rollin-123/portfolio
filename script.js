document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const sectionOrder = ['hero', 'about', 'skills', 'projects', 'contact'];
    let currentSectionIndex = 0;
    
    // Set active section
    function setActiveSection(sectionId) {
        // Find section index
        const targetIndex = sectionOrder.indexOf(sectionId);
        if (targetIndex === -1) return;
        
        // Update sections
        sections.forEach(section => {
            section.classList.remove('active', 'prev', 'next');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Update current index
        currentSectionIndex = targetIndex;
    }
    
    // Navigate to next/previous section
    function navigateToSection(index) {
        if (index < 0 || index >= sectionOrder.length) return;
        setActiveSection(sectionOrder[index]);
    }
    
    // Initialize with first section active
    setActiveSection(sectionOrder[0]);
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            setActiveSection(targetSection);
        });
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Je vous répondrai très rapidement.');
            contactForm.reset();
        });
    }
    
    // Animate skills on section appear
    function animateSkills() {
        const skills = document.querySelectorAll('.skill-progress');
        skills.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0';
            gsap.to(skill, {
                width: width,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.3
            });
        });
    }
    
    // Observer for section animations
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class' && 
                mutation.target.classList.contains('active')) {
                if (mutation.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    });
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section, {
            attributes: true
        });
    });
    
    // Swipe functionality with Hammer.js
    const sectionsContainer = document.querySelector('.sections-container');
    const mc = new Hammer(sectionsContainer);
    
    // Enable horizontal swipe
    mc.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    
    // Handle swipe events
    mc.on('swipeleft', function() {
        navigateToSection(currentSectionIndex + 1);
    });
    
    mc.on('swiperight', function() {
        navigateToSection(currentSectionIndex - 1);
    });
});