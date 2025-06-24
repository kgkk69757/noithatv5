// Accordion functionality
function toggleAccordion() {
    const extraContent = document.getElementById('extraContent');
    const toggleText = document.getElementById('toggleText');
    
    if (extraContent.style.display === 'none' || extraContent.style.display === '') {
        extraContent.style.display = 'block';
        toggleText.textContent = 'Thu gọn';
    } else {
        extraContent.style.display = 'none';
        toggleText.textContent = 'Xem thêm';
    }
}

// Dropdown functionality
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show');
}

// Select location with branch data
function selectLocation(city, address = '', phone = '') {
    const selectedLocation = document.getElementById('selectedLocation');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    selectedLocation.textContent = city;
    dropdownMenu.classList.remove('show');
    
    // Find branch data
    const branch = window.branchesData?.find(b => b.city === city);
    
    if (branch) {
        // Update UI with branch information
        console.log('Selected branch:', branch);
        
        // You can add more functionality here like:
        // - Update map markers
        // - Show branch details
        // - Update contact information display
        
        // Example: Show branch info in console
        console.log(`Chi nhánh: ${branch.name}`);
        console.log(`Địa chỉ: ${branch.address}`);
        console.log(`Điện thoại: ${branch.phone}`);
        console.log(`Email: ${branch.email}`);
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.location-dropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (!dropdown.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Hide extra content initially
    const extraContent = document.getElementById('extraContent');
    if (extraContent) {
        extraContent.style.display = 'none';
    }
    
    // Log available branches
    if (window.branchesData) {
        console.log('Available branches:', window.branchesData);
    }
});