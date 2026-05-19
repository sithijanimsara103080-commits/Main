/**
 * RADAPASA ASTRONOMY SOCIETY - MAIN JAVASCRIPT
 * =============================================
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initMobileMenu();
  initSmoothScroll();
  initCountingAnimation();
});

/**
 * Scroll Animations - Intersection Observer
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // For scroll-item elements
        if (entry.target.classList.contains('scroll-item')) {
          entry.target.style.animationPlayState = 'running';
        }
        // For animate-on-scroll elements
        if (entry.target.classList.contains('animate-on-scroll')) {
          entry.target.classList.add('animate');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-item elements
  document.querySelectorAll('.scroll-item').forEach(el => {
    observer.observe(el);
  });

  // Observe all animate-on-scroll elements
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuOpenBtn = document.getElementById('mobile-menu-open');
  const menuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

  if (menuOpenBtn && mobileMenu) {
    menuOpenBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    });
  }

  if (menuCloseBtn && mobileMenu) {
    menuCloseBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  }

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Counting Animation for Stats
 */
function initCountingAnimation() {
  const statElements = document.querySelectorAll('[data-count]');
  
  if (statElements.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));
        const suffix = target.getAttribute('data-suffix') || '';
        
        animateCount(target, 0, countTo, 2000, suffix);
        countObserver.unobserve(target);
      }
    });
  }, observerOptions);

  statElements.forEach(el => {
    countObserver.observe(el);
  });
}

/**
 * Animate counting from start to end
 */
function animateCount(element, start, end, duration, suffix) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOut);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

/**
 * Lucide Icons Initialization
 */
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
