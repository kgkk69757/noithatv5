const products = {
    ban: ['Bàn ăn gỗ sồi', 'Bàn làm việc hiện đại', 'Bàn trà phòng khách', 'Bàn học sinh', 'Bàn trang điểm', 'Bàn góc nhỏ'],
    ghe: ['Ghế xoay văn phòng', 'Ghế ăn bọc da', 'Ghế thư giãn', 'Ghế bar cao', 'Ghế sofa đơn', 'Ghế gỗ cổ điển'],
    tu: ['Tủ quần áo 3 cánh', 'Tủ bếp gỗ tự nhiên', 'Tủ sách cao', 'Tủ giày dép', 'Tủ tivi hiện đại', 'Tủ đựng đồ đa năng'],
    giuong: ['Giường ngủ 1m8', 'Giường tầng trẻ em', 'Giường sofa đa năng', 'Giường gỗ sồi', 'Giường bọc nỉ', 'Giường kiểu Nhật'],
    sofa: ['Sofa 3 chỗ ngồi', 'Sofa góc chữ L', 'Sofa đơn thư giãn', 'Sofa giường', 'Sofa da thật', 'Sofa vải cao cấp'],
    den: ['Đèn chùm pha lê', 'Đèn bàn học', 'Đèn ngủ để bàn', 'Đèn trần LED', 'Đèn trang trí', 'Đèn đọc sách']
};

const categoryItems = document.querySelectorAll('.product-category-item');
const productDivs = document.querySelectorAll('.product-showcase-parent div');
const arrow = document.querySelector('.product-arrow-indicator');

function displayProducts(category) {
    const categoryProducts = products[category];

    productDivs.forEach((div, index) => {
        const titleElement = div.querySelector('.product-card-title p');
        if (index < categoryProducts.length && titleElement) {
            titleElement.textContent = categoryProducts[index];
        } else if (titleElement) {
            titleElement.textContent = `Sản phẩm ${index + 1}`;
        }
    });
}

function updateArrowPosition(activeItem) {
    const itemRect = activeItem.getBoundingClientRect();
    const categoriesRect = document.querySelector('.product-categories').getBoundingClientRect();
    
    // Tính toán vị trí top để bám theo viền dưới của .product-category-item
    const topPosition = (itemRect.bottom - categoriesRect.top) - 0;
    
    // Set arrow position để bám theo viền dưới của item được chọn
    arrow.style.height = '45px';
    arrow.style.width = itemRect.width + 'px';
    arrow.style.left = (itemRect.left - categoriesRect.left) + 'px';
    arrow.style.top = topPosition + 'px';
    arrow.style.transform = 'translateX(0)';
}
categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        categoryItems.forEach(cat => cat.classList.remove('active'));

        // Add active class to clicked item
        item.classList.add('active');

        // Update arrow position
        updateArrowPosition(item);

        // Display products for selected category
        const category = item.getAttribute('data-category');
        displayProducts(category);
    });
});

// Display initial products and set initial arrow position
displayProducts('ban');
setTimeout(() => {
    updateArrowPosition(document.querySelector('.product-category-item.active'));
}, 100);

document.addEventListener('DOMContentLoaded', function () {
    const categoryItems = document.querySelectorAll('.product-category-item');
    const showcaseParents = document.querySelectorAll('.product-showcase-parent');

    function switchCategory(targetCategory) {
        // Remove active class from all categories
        categoryItems.forEach(item => item.classList.remove('active'));

        // Hide all showcase parents
        showcaseParents.forEach(parent => parent.classList.remove('active'));

        // Add active class to clicked category
        const activeCategory = document.querySelector(`[data-category="${targetCategory}"]`);
        if (activeCategory) {
            activeCategory.classList.add('active');
        }

        // Show corresponding showcase parent
        const activeShowcase = document.querySelector(`.product-showcase-parent[data-category="${targetCategory}"]`);
        if (activeShowcase) {
            activeShowcase.classList.add('active');
        }
    }

    // Add click event listeners to category items
    categoryItems.forEach(item => {
        item.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            switchCategory(category);
        });
    });

    // Initialize with first category active
    if (categoryItems.length > 0) {
        const firstCategory = categoryItems[0].getAttribute('data-category');
        switchCategory(firstCategory);
    }
});