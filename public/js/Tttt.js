// Tttt.js - Simple Media Section with Swiper Integration

// Media Section Manager Class
class MediaSectionManager {
  constructor() {
    this.videoSwiper = null;
    this.tiktokSwiper = null;
    this.observer = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    try {
      this.initializeSwiper();
      this.setupIntersectionObserver();
      this.logStatistics();
      this.isInitialized = true;
    } catch (error) {
      console.error('MediaSectionManager initialization failed:', error);
    }
  }

  initializeSwiper() {
    // Initialize Video Swiper
    this.videoSwiper = new Swiper('.tttt-video-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      on: {
        init: function() {
          console.log('📹 Video Swiper initialized');
        },
        slideChange: function() {
          console.log('📹 Video slide changed to:', this.activeIndex);
        }
      }
    });

    // Initialize TikTok Swiper
    this.tiktokSwiper = new Swiper('.tttt-tiktok-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      on: {
        init: function() {
          console.log('🎵 TikTok Swiper initialized');
        },
        slideChange: function() {
          console.log('🎵 TikTok slide changed to:', this.activeIndex);
        }
      }
    });
  }
  
  setupIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: add in-view class to all cards immediately
      document.querySelectorAll('.tttt-media-card').forEach(card => {
        card.classList.add('in-view');
      });
      return;
    }

    const options = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Unobserve after adding class for performance
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all media cards
    const mediaCards = document.querySelectorAll('.tttt-media-card');
    if (mediaCards.length === 0) {
      console.warn('No media cards found for intersection observer');
      return;
    }
    
    mediaCards.forEach(card => {
      this.observer.observe(card);
    });
  }

  logStatistics() {
    try {
      const videoCount = document.querySelectorAll('.tttt-video-card').length;
      const tiktokCount = document.querySelectorAll('.tttt-tiktok-card').length;
      const totalCards = document.querySelectorAll('.tttt-media-card').length;
      
      console.log('📊 Tttt Media Statistics:');
      console.log(`   📹 YouTube Videos: ${videoCount}`);
      console.log(`   🎵 TikTok Videos: ${tiktokCount}`);
      console.log(`   📱 Total Media Cards: ${totalCards}`);
      
      // Performance metrics
      if (performance && performance.now) {
        console.log(`   ⚡ Initialization time: ${performance.now().toFixed(2)}ms`);
      }
    } catch (error) {
      console.error('Error logging statistics:', error);
    }
  }
}

// Cleanup function
function cleanup() {
    // Clean up Swiper instances
    if (window.mediaManager && window.mediaManager.videoSwiper) {
        window.mediaManager.videoSwiper.destroy(true, true);
    }
    if (window.mediaManager && window.mediaManager.tiktokSwiper) {
        window.mediaManager.tiktokSwiper.destroy(true, true);
    }
    
    // Clean up intersection observer
    if (window.mediaManager && window.mediaManager.observer) {
        window.mediaManager.observer.disconnect();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Store instances globally for cleanup
        window.mediaManager = new MediaSectionManager();
        window.mediaManager.init();
        
        console.log('✅ Tttt component initialized successfully');
    } catch (error) {
        console.error('❌ Failed to initialize Tttt component:', error);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);
window.addEventListener('pagehide', cleanup);
