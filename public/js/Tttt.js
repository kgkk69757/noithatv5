class TouchSlider {
    constructor(element) {
        this.slider = document.getElementById(element);
        if (!this.slider) return;
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velocity = 0;
        this.momentum = 0.95;
        this.init();
    }

    init() {
        // Mouse events for drag
        this.slider.addEventListener('mousedown', this.handleStart.bind(this));
        this.slider.addEventListener('mouseleave', this.handleEnd.bind(this));
        this.slider.addEventListener('mouseup', this.handleEnd.bind(this));
        this.slider.addEventListener('mousemove', this.handleMove.bind(this));

        // Touch events for mobile
        this.slider.addEventListener('touchstart', this.handleStart.bind(this));
        this.slider.addEventListener('touchend', this.handleEnd.bind(this));
        this.slider.addEventListener('touchmove', this.handleMove.bind(this));

        // Mouse wheel scrolling - improved
        this.slider.addEventListener('wheel', this.handleWheel.bind(this));

        // Prevent context menu and text selection
        this.slider.addEventListener('contextmenu', (e) => e.preventDefault());
        this.slider.addEventListener('selectstart', (e) => e.preventDefault());
    }

    handleStart(e) {
        this.isDown = true;
        this.slider.style.cursor = 'grabbing';
        this.slider.style.userSelect = 'none';

        const x = e.pageX || e.touches[0].pageX;
        this.startX = x - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
        this.velocity = 0;

        e.preventDefault();
    }

    handleEnd() {
        this.isDown = false;
        this.slider.style.cursor = 'grab';
        this.slider.style.userSelect = '';

        // Add momentum scrolling
        if (Math.abs(this.velocity) > 0.5) {
            this.applyMomentum();
        }
    }

    handleMove(e) {
        if (!this.isDown) return;
        e.preventDefault();

        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - this.startX) * 2.5; // Increased sensitivity
        const newScrollLeft = this.scrollLeft - walk;

        this.velocity = this.slider.scrollLeft - newScrollLeft;
        this.slider.scrollLeft = newScrollLeft;
    }

    handleWheel(e) {
        e.preventDefault();

        // Horizontal scrolling with mouse wheel
        const scrollAmount = e.deltaY * 1.2; // Increased sensitivity
        this.slider.scrollLeft += scrollAmount;

        // Add smooth scrolling
        this.slider.style.scrollBehavior = 'auto';
    }

    applyMomentum() {
        if (Math.abs(this.velocity) > 0.1) {
            this.slider.scrollLeft -= this.velocity;
            this.velocity *= this.momentum;
            requestAnimationFrame(() => this.applyMomentum());
        }
    }
}

// Arrow key navigation
function addKeyboardNavigation(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    document.addEventListener('keydown', (e) => {
        if (e.target.closest(`#${sliderId}`)) {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    slider.scrollLeft -= 200;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    slider.scrollLeft += 200;
                    break;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    new TouchSlider('videoSlider');
    new TouchSlider('tiktokSlider');

    // Add keyboard navigation
    addKeyboardNavigation('videoSlider');
    addKeyboardNavigation('tiktokSlider');
});

// Simple media slider functionality
document.addEventListener('DOMContentLoaded', function () {
    // Simple touch slider for video and tiktok lists
    function initTouchSlider(elementId) {
        const slider = document.getElementById(elementId);
        if (!slider) return;

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch events
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Wheel scrolling
        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            slider.scrollLeft += e.deltaY;
        });
    }

    // Initialize sliders
    initTouchSlider('videoSlider');
    initTouchSlider('tiktokSlider');
});
