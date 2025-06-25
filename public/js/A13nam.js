// Simple 13nam section functionality
document.addEventListener('DOMContentLoaded', function () {
    // YouTube video player
    window.playYouTubeVideo = function (videoId) {
        if (!videoId) {
            console.error('No video ID provided');
            return;
        }

        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        window.open(videoUrl, '_blank');
    };

    // Simple intersection observer for cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe cards
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
});

function showVideoModal(videoId) {
    if (!videoId) {
        console.error('No video ID provided');
        return;
    }

    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubePlayer');

    // Set iframe src với autoplay
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    // Show modal
    modal.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubePlayer');

    // Stop video by removing src
    iframe.src = '';

    // Hide modal
    modal.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});

// Prevent modal from closing when clicking on video content
document.addEventListener('DOMContentLoaded', function () {
    const modalContent = document.querySelector('.video-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }
});

// Handle browser back button
window.addEventListener('popstate', function () {
    const modal = document.getElementById('videoModal');
    if (modal && modal.classList.contains('active')) {
        closeVideoModal();
    }
});

function playVideo(videoId) {
    if (!videoId) {
        console.error('No video ID provided');
        return;
    }

    const thumbnail = document.getElementById('videoThumbnail');
    const iframe = document.getElementById('youtubeIframe');

    if (thumbnail && iframe) {
        // Ẩn thumbnail với animation
        thumbnail.style.opacity = '0';

        // Sau khi animation hoàn tất, ẩn thumbnail và hiện iframe
        setTimeout(() => {
            thumbnail.style.display = 'none';
            iframe.style.display = 'block';
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        }, 300);
    }
}

// Optional: Reset video khi cần thiết
function resetVideo() {
    const thumbnail = document.getElementById('videoThumbnail');
    const iframe = document.getElementById('youtubeIframe');

    if (thumbnail && iframe) {
        iframe.style.display = 'none';
        iframe.src = '';
        thumbnail.style.display = 'block';
        thumbnail.style.opacity = '1';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('A13nam component loaded');

    // Optional: Add keyboard support
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const videoId = videoContainer.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (videoId) {
                    playVideo(videoId);
                }
            }
        });

        // Make it focusable for keyboard navigation
        videoContainer.setAttribute('tabindex', '0');
    }
});