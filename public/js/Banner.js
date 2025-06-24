// Ultra-optimized banner script for LCP improvement
(function() {
    'use strict';
    
    // Cache DOM elements
    let progressBar, circle, timeLabel;
    let isInitialized = false;
    let imageCache = new Map();
    
    // Throttle function for performance
    function throttle(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    }
    
    // Initialize DOM cache
    function initDOMCache() {
      if (!isInitialized) {
        progressBar = document.querySelector(".hero-progress-bar");
        circle = document.querySelector(".autoplay-progress svg circle");
        timeLabel = document.querySelector(".autoplay-progress span");
        isInitialized = true;
      }
    }
    
    // Optimized image preloader with WebP support
    function preloadImage(url) {
      return new Promise((resolve, reject) => {
        if (imageCache.has(url)) {
          resolve(imageCache.get(url));
          return;
        }
        
        const img = new Image();
        img.onload = () => {
          imageCache.set(url, img);
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      });
    }
    
    // Optimized progress update
    const updateProgress = throttle(function(progress, time) {
      if (circle) {
        const offset = 125.6 * (1 - progress);
        circle.style.strokeDashoffset = offset;
      }
      if (timeLabel) {
        timeLabel.textContent = `${Math.ceil(time / 1000)}s`;
      }
    }, 16); // ~60fps
    
    // Optimized progress bar reset
    function resetProgressBar() {
      if (progressBar) {
        progressBar.style.width = "0%";
        progressBar.style.transition = "none";
        // Force reflow efficiently
        progressBar.offsetHeight;
      }
    }
    
    // Optimized progress bar start
    function startProgressBar() {
      if (progressBar) {
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
          progressBar.style.transition = "width 5s linear";
          progressBar.style.width = "100%";
        });
      }
    }
    
    // Optimized image loading with fade-in effect
    async function loadSlideImage(bgElement) {
      if (!bgElement || !bgElement.dataset.bg) return;
      
      try {
        await preloadImage(bgElement.dataset.bg);
        bgElement.style.backgroundImage = `url('${bgElement.dataset.bg}')`;
        bgElement.setAttribute('data-loaded', 'true');
      } catch (error) {
        console.warn('Failed to load image:', bgElement.dataset.bg);
      }
    }
    
    // Initialize Swiper with ultra-optimized settings
    function initSwiper() {
      initDOMCache();
      
      const swiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 600, // Faster transitions
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        // Ultra performance optimizations
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        preloadImages: false,
        lazy: false, // Disable lazy loading for better control
        updateOnWindowResize: true,
        resizeObserver: true,
        preventInteractionOnTransition: true,
        
        on: {
          init() {
            // Preload first slide image immediately
            const firstSlide = this.slides[this.activeIndex];
            const firstBgElement = firstSlide?.querySelector('.hero-bg');
            if (firstBgElement) {
              loadSlideImage(firstBgElement);
            }
            
            // Preload next 2 slides in background
            setTimeout(() => {
              for (let i = 1; i <= 2; i++) {
                const nextIndex = (this.activeIndex + i) % this.slides.length;
                const nextSlide = this.slides[nextIndex];
                const nextBgElement = nextSlide?.querySelector('.hero-bg');
                if (nextBgElement) {
                  loadSlideImage(nextBgElement);
                }
              }
            }, 100);
          },
          
          autoplayTimeLeft(s, time, progress) {
            updateProgress(progress, time);
          },
          
          slideChangeTransitionStart() {
            resetProgressBar();
          },
          
          slideChangeTransitionEnd() {
            startProgressBar();
            
            // Preload next slide image
            const nextIndex = (this.activeIndex + 1) % this.slides.length;
            const nextSlide = this.slides[nextIndex];
            const nextBgElement = nextSlide?.querySelector('.hero-bg');
            if (nextBgElement && !nextBgElement.style.backgroundImage) {
              loadSlideImage(nextBgElement);
            }
          },
          
          slideChange() {
            const activeSlide = this.slides[this.activeIndex];
            const bgElement = activeSlide?.querySelector('.hero-bg');
            
            if (bgElement && !bgElement.style.backgroundImage) {
              loadSlideImage(bgElement);
            }
          }
        }
      });
      
      return swiper;
    }
    
    // Initialize when DOM is ready with performance optimization
    function init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwiper);
      } else {
        // Use requestIdleCallback for better performance
        if (window.requestIdleCallback) {
          requestIdleCallback(initSwiper);
        } else {
          setTimeout(initSwiper, 0);
        }
      }
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      progressBar = circle = timeLabel = null;
      isInitialized = false;
      imageCache.clear();
    });
    
    // Start initialization
    init();
    
  })();