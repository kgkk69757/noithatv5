// Cuộn slide vô hạn cho .vertical-scroller, tách biệt logic desktop và tablet/mobile

// Đặt currentMode ở phạm vi global để có thể truy cập từ bất kỳ đâu
let currentMode = null;

document.addEventListener('DOMContentLoaded', function () {
    // Lấy phần tử scroller và wrapper
    let scroller = document.querySelector('.vertical-scroller');
    if (!scroller) return;
    let wrapper = scroller.querySelector('.vertical-slider-wrapper');
    if (!wrapper) return;

    // Nhân đôi các slide để tạo hiệu ứng cuộn vô hạn
    const slides = Array.from(wrapper.children);
    const slideCount = slides.length;
    slides.forEach(slide => {
        wrapper.appendChild(slide.cloneNode(true));
    });

    // Đợi tất cả ảnh trong slide load xong mới khởi tạo drag
    const images = wrapper.querySelectorAll('img');
    let loaded = 0;
    images.forEach(img => {
        if (img.complete) loaded++;
        else img.addEventListener('load', () => {
            loaded++;
            if (loaded === images.length) setupByDevice();
        });
    });
    // Nếu không có ảnh hoặc ảnh đã load xong
    if (images.length === 0 || loaded === images.length) {
        setupByDevice(); // Đảm bảo currentMode đã được khai báo
    }

    // Hàm loại bỏ toàn bộ event listener cũ bằng cách clone node
    function removeAllListeners() {
        const newScroller = scroller.cloneNode(true);
        scroller.parentNode.replaceChild(newScroller, scroller);
        scroller = newScroller; // Cập nhật biến scroller
        return scroller;
    }

    // Kéo dọc cho desktop (cả chuột và cảm ứng)
    function enableVerticalDrag(scroller, wrapper, slides, slideCount) {
        wrapper.style.flexDirection = 'column';
        let offset = 0;
        let size = 0;
        let totalSize = 0;

        // Biến lưu trạng thái kéo
        let touchStart = null, lastTouchOffset = 0;
        let isMouseDown = false, mouseStart = null;

        // Biến cho tự động cuộn
        let autoScrollTimer = null;
        let isAutoScrollEnabled = true;
        let autoScrollSpeed = 0.5; // Giảm tốc độ cuộn tự động xuống mức mặc định
        let isUserInteracting = false;

        // Cập nhật lại layout và kích thước khi resize
        function updateLayout() {
            wrapper.style.flexDirection = 'column';
            // Tính lại kích thước sau khi resize
            size = slides[0].getBoundingClientRect().height + parseInt(getComputedStyle(slides[0]).marginBottom || 0);
            totalSize = size * slideCount;
            // Đảm bảo offset nằm trong giới hạn sau khi resize
            if (offset >= totalSize) offset = offset % totalSize;
            if (offset < 0) offset = (offset % totalSize + totalSize) % totalSize;
            wrapper.style.transform = `translateY(-${offset}px)`;
        }

        // Sử dụng debounce cho resize để tránh gọi quá nhiều lần
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateLayout, 100);
        });

        // Thêm chức năng tự động cuộn
        function startAutoScroll() {
            if (!isAutoScrollEnabled || isUserInteracting) return;
            // Đảm bảo dừng timer cũ trước khi tạo timer mới
            stopAutoScroll();
            autoScrollTimer = setInterval(() => {
                offset += autoScrollSpeed;
                // Sửa lỗi reset offset để tránh tăng tốc độ
                if (offset >= totalSize) {
                    offset = offset - totalSize; // Thay vì set về 0
                }
                // Đảm bảo không có transition
                wrapper.style.transition = 'none';
                wrapper.style.transform = `translateY(-${offset}px)`;
            }, 16); // ~60fps
        }

        function stopAutoScroll() {
            if (autoScrollTimer) {
                clearInterval(autoScrollTimer);
                autoScrollTimer = null;
            }
        }

        // Dừng auto scroll khi hover hoặc tương tác
        scroller.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoScroll();
        });

        scroller.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            setTimeout(startAutoScroll, 500); // Delay 500ms trước khi tự động cuộn lại
        });

        // Kéo bằng cảm ứng (chỉ dọc)
        scroller.addEventListener('touchstart', function (e) {
            if (e.touches.length !== 1) return;
            isUserInteracting = true;
            stopAutoScroll();
            updateLayout();
            touchStart = e.touches[0].clientY;
            lastTouchOffset = offset;
        });
        scroller.addEventListener('touchmove', function (e) {
            if (touchStart === null || e.touches.length !== 1) return;
            e.preventDefault(); // Ngăn cuộn trang mặc định
            let current = e.touches[0].clientY;
            let delta = touchStart - current;
            let newOffset = lastTouchOffset + delta;
            // Xử lý cuộn vô hạn
            if (newOffset < 0) newOffset = totalSize + newOffset;
            if (newOffset >= totalSize) newOffset = newOffset - totalSize;
            offset = newOffset;
            wrapper.style.transform = `translateY(-${offset}px)`;
        });
        scroller.addEventListener('touchend', function () {
            touchStart = null;
            isUserInteracting = false;
            setTimeout(startAutoScroll, 1000); // Delay 1s sau khi touch
        });

        // Kéo bằng chuột (chỉ dọc)
        scroller.addEventListener('mousedown', function (e) {
            e.preventDefault();
            updateLayout(); // Cập nhật layout trước khi bắt đầu kéo
            isMouseDown = true;
            mouseStart = e.clientY;
            lastTouchOffset = offset;
            document.body.style.userSelect = 'none'; // Ngăn chọn văn bản khi kéo
            scroller.style.cursor = 'grabbing'; // Đổi con trỏ chuột
            isUserInteracting = true;
            stopAutoScroll();
        });
        window.addEventListener('mousemove', function (e) {
            if (!isMouseDown) return;
            e.preventDefault(); // Ngăn kéo mặc định của trình duyệt
            let current = e.clientY;
            let delta = mouseStart - current;
            let newOffset = lastTouchOffset + delta;
            // Xử lý cuộn vô hạn
            if (newOffset < 0) newOffset = totalSize + newOffset;
            if (newOffset >= totalSize) newOffset = newOffset - totalSize;
            offset = newOffset;
            wrapper.style.transform = `translateY(-${offset}px)`;
        });
        window.addEventListener('mouseup', function () {
            if (isMouseDown) {
                isMouseDown = false;
                document.body.style.userSelect = ''; // Bỏ ngăn chọn văn bản
                scroller.style.cursor = ''; // Trả lại con trỏ chuột mặc định
                isUserInteracting = false;
                setTimeout(startAutoScroll, 500); // Delay 500ms sau khi mouse up
            }
        });

        // Thêm chức năng cuộn bằng bánh xe chuột - cuộn vô hạn liên tục
        scroller.addEventListener('wheel', function (e) {
            e.preventDefault();
            updateLayout();

            let delta = e.deltaY > 0 ? 1 : -1;
            let scrollSpeed = Math.abs(e.deltaY) * 0.5;

            let newOffset = offset + (delta * scrollSpeed);

            if (newOffset < 0) newOffset = totalSize + newOffset;
            if (newOffset >= totalSize) newOffset = newOffset - totalSize;

            offset = newOffset;

            // Đảm bảo không có transition
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateY(-${offset}px)`;

            isUserInteracting = true;
            stopAutoScroll();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 1000);
        }, { passive: false });

        // Khởi tạo layout ban đầu và bắt đầu auto scroll
        updateLayout();
        startAutoScroll();
    }

    // Kéo ngang cho tablet/mobile (cả chuột và cảm ứng)
    function enableHorizontalDrag(scroller, wrapper, slides, slideCount) {
        wrapper.style.flexDirection = 'row';
        let offset = 0;
        let size = 0;
        let totalSize = 0;

        // Biến lưu trạng thái kéo
        let touchStart = null, lastTouchOffset = 0;
        let isMouseDown = false, mouseStart = null;

        // Biến cho tự động cuộn ngang
        let autoScrollTimer = null;
        let isAutoScrollEnabled = true;
        let autoScrollSpeed = 0.5; // Giảm tốc độ cuộn tự động xuống mức mặc định
        let isUserInteracting = false;

        // Cập nhật lại layout và kích thước khi resize
        function updateLayout() {
            wrapper.style.flexDirection = 'row';
            // Tính lại kích thước sau khi resize
            size = slides[0].getBoundingClientRect().width + parseInt(getComputedStyle(slides[0]).marginRight || 0);
            totalSize = size * slideCount;
            // Đảm bảo offset nằm trong giới hạn sau khi resize
            if (offset >= totalSize) offset = offset % totalSize;
            if (offset < 0) offset = (offset % totalSize + totalSize) % totalSize;
            wrapper.style.transform = `translateX(-${offset}px)`;
        }

        // Sử dụng debounce cho resize để tránh gọi quá nhiều lần
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateLayout, 100);
        });

        // Thêm chức năng tự động cuộn ngang
        function startAutoScroll() {
            if (!isAutoScrollEnabled || isUserInteracting) return;
            // Đảm bảo dừng timer cũ trước khi tạo timer mới
            stopAutoScroll();
            autoScrollTimer = setInterval(() => {
                offset += autoScrollSpeed;
                // Sửa lỗi reset offset để tránh tăng tốc độ
                if (offset >= totalSize) {
                    offset = offset - totalSize; // Thay vì set về 0
                }
                // Đảm bảo không có transition
                wrapper.style.transition = 'none';
                wrapper.style.transform = `translateX(-${offset}px)`;
            }, 16); // ~60fps
        }

        function stopAutoScroll() {
            if (autoScrollTimer) {
                clearInterval(autoScrollTimer);
                autoScrollTimer = null;
            }
        }

        // Dừng auto scroll khi hover hoặc tương tác
        scroller.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoScroll();
        });

        scroller.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            setTimeout(startAutoScroll, 500);
        });

        // Kéo bằng cảm ứng (chỉ ngang)
        scroller.addEventListener('touchstart', function (e) {
            if (e.touches.length !== 1) return;
            isUserInteracting = true;
            stopAutoScroll();
            updateLayout();
            touchStart = e.touches[0].clientX;
            lastTouchOffset = offset;
        });
        scroller.addEventListener('touchmove', function (e) {
            if (touchStart === null || e.touches.length !== 1) return;
            e.preventDefault(); // Ngăn cuộn trang mặc định
            let current = e.touches[0].clientX;
            let delta = touchStart - current;
            let newOffset = lastTouchOffset + delta;
            // Xử lý cuộn vô hạn
            if (newOffset < 0) newOffset = totalSize + newOffset;
            if (newOffset >= totalSize) newOffset = newOffset - totalSize;
            offset = newOffset;
            wrapper.style.transform = `translateX(-${offset}px)`;
        });
        scroller.addEventListener('touchend', function () {
            touchStart = null;
            isUserInteracting = false;
            setTimeout(startAutoScroll, 1000);
        });

        // Kéo bằng chuột (chỉ ngang)
        scroller.addEventListener('mousedown', function (e) {
            e.preventDefault();
            updateLayout(); // Cập nhật layout trước khi bắt đầu kéo
            isMouseDown = true;
            mouseStart = e.clientX;
            lastTouchOffset = offset;
            document.body.style.userSelect = 'none'; // Ngăn chọn văn bản khi kéo
            scroller.style.cursor = 'grabbing'; // Đổi con trỏ chuột
            isUserInteracting = true;
            stopAutoScroll();
        });
        window.addEventListener('mousemove', function (e) {
            if (!isMouseDown) return;
            e.preventDefault(); // Ngăn kéo mặc định của trình duyệt
            let current = e.clientX;
            let delta = mouseStart - current;
            let newOffset = lastTouchOffset + delta;
            // Xử lý cuộn vô hạn
            if (newOffset < 0) newOffset = totalSize + newOffset;
            if (newOffset >= totalSize) newOffset = newOffset - totalSize;
            offset = newOffset;
            wrapper.style.transform = `translateX(-${offset}px)`;
        });
        window.addEventListener('mouseup', function () {
            if (isMouseDown) {
                isMouseDown = false;
                document.body.style.userSelect = ''; // Bỏ ngăn chọn văn bản
                scroller.style.cursor = ''; // Trả lại con trỏ chuột mặc định
                isUserInteracting = false;
                setTimeout(startAutoScroll, 500);
            }
        });

        // Thêm chức năng cuộn ngang bằng bánh xe chuột cho tablet/mobile
        scroller.addEventListener('wheel', function (e) {
            e.preventDefault();
            updateLayout();

            let delta = e.deltaY > 0 ? 1 : -1;
            let scrollSpeed = Math.abs(e.deltaY) * 0.3;

            let newOffset = offset + (delta * scrollSpeed);

            if (newOffset < 0) newOffset = totalSize + newOffset;
            if (newOffset >= totalSize) newOffset = newOffset - totalSize;

            offset = newOffset;

            // Đảm bảo không có transition
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateX(-${offset}px)`;

            isUserInteracting = true;
            stopAutoScroll();
            setTimeout(() => {
                isUserInteracting = false;
                startAutoScroll();
            }, 1000);
        }, { passive: false });

        // Khởi tạo layout ban đầu và bắt đầu auto scroll
        updateLayout();
        startAutoScroll();
    }

    // Hàm chính: chọn chế độ và khởi tạo lại khi resize, mỗi lần chỉ đăng ký 1 loại logic
    function setupByDevice() {
        let isTablet = window.innerWidth <= 991.98;
        // Xóa toàn bộ listener cũ bằng cách clone node (giúp tách biệt logic)
        let newScroller = removeAllListeners();
        // Cập nhật lại wrapper và slides sau khi clone
        let newWrapper = newScroller.querySelector('.vertical-slider-wrapper');
        // Lấy lại chỉ các slide gốc để tính toán kích thước chính xác
        const originalSlides = Array.from(newWrapper.children).slice(0, slideCount);

        if (isTablet) {
            // Kéo ngang cho iPad trở xuống
            enableHorizontalDrag(newScroller, newWrapper, originalSlides, slideCount);
            currentMode = 'horizontal';
        } else {
            // Kéo dọc cho desktop
            enableVerticalDrag(newScroller, newWrapper, originalSlides, slideCount);
            currentMode = 'vertical';
        }

        // Theo dõi resize để chuyển chế độ nếu cần, mỗi lần chuyển sẽ clear toàn bộ logic cũ
        window.onresize = function () {
            let isNowTablet = window.innerWidth <= 991.98;
            if ((isNowTablet && currentMode !== 'horizontal') || (!isNowTablet && currentMode !== 'vertical')) {
                setupByDevice();
            }
        };
    }
});
