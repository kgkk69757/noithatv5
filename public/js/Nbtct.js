function animateNumber(element, targetText, duration = 2000) {
    const isPlus = targetText.startsWith('+');
    const isPercentage = targetText.includes('%');
    const isTextOnly = isNaN(parseInt(targetText.replace(/\D/g, ''))) ||
        targetText.includes('KHÔNG') ||
        targetText === "" ||
        targetText === "0" ||
        element.getAttribute('data-type') === 'text';

    // If it's text-only content or empty, don't animate numbers
    if (isTextOnly) {
        element.textContent = targetText;
        // Add text-specific styling
        if (element.getAttribute('data-type') === 'text') {
            element.style.fontSize = getComputedStyle(element).getPropertyValue('--text-font-size') || '24px';
        }
        return;
    }

    const number = parseInt(targetText.replace(/\D/g, ''));
    const step = Math.ceil(number / (duration / 16));
    let current = 0;

    const updateNumber = () => {
        current += step;
        if (current > number) {
            current = number;
        }

        let displayValue = current.toString();
        if (isPlus) displayValue = '+' + current;
        if (isPercentage) displayValue = current + '%';

        element.textContent = displayValue;

        if (current < number) {
            requestAnimationFrame(updateNumber);
        }
    };

    updateNumber();
}

function startCountAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const targetText = stat.getAttribute('data-number') || stat.textContent;
        const displayText = stat.textContent.trim();
        const isTextType = stat.getAttribute('data-type') === 'text';

        // If display text is empty or is text-only, don't animate
        if (!displayText ||
            displayText.includes('KHÔNG') ||
            isNaN(parseInt(displayText.replace(/\D/g, ''))) ||
            displayText === "0" ||
            isTextType) {
            return;
        }

        // Reset display for animation
        if (targetText.startsWith('+')) {
            stat.textContent = '+0';
        } else if (targetText.includes('%')) {
            stat.textContent = '0%';
        } else {
            stat.textContent = '0';
        }

        animateNumber(stat, targetText);
    });
}

// Create observer to trigger animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCountAnimation();
            // Unobserve after triggering to prevent multiple animations
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of the element is visible
});

// Start observing the stats section
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
