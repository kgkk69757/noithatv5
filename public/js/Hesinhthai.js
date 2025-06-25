// Simple ecosystem animations
document.addEventListener('DOMContentLoaded', function () {
    // Simple intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe all ecosystem cards
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Button interactions
    const buttons = document.querySelectorAll('.service-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Service button clicked');
        });
    });

    // Phone number click to call
    const phoneNumbers = document.querySelectorAll('.phone-number');
    phoneNumbers.forEach(phone => {
        phone.addEventListener('click', () => {
            const phoneText = phone.querySelector('span').textContent;
            const cleanPhone = phoneText.replace(/\s/g, '');
            window.open(`tel:${cleanPhone}`, '_self');
        });

        phone.style.cursor = 'pointer';
    });
});
