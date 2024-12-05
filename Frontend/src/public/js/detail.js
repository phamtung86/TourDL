// Hàm ẩn tabs ngay khi tải trang
function hideTabsOnLoad(tabs) {
    window.onload = () => {
        tabs.style.opacity = '0';
        tabs.style.visibility = 'hidden';
    };
}

// Hàm xử lý hiển thị hoặc ẩn tabs khi cuộn trang
function handleScroll(tabs, scrollThreshold) {
    let lastScrollTop = 0; // Lưu vị trí cuộn trước đó

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > scrollThreshold) {
            // Khi cuộn xuống vượt ngưỡng => Hiển thị tabs
            tabs.style.opacity = '1';
            tabs.style.visibility = 'visible';
        } else {
            // Khi ở đầu trang hoặc chưa vượt ngưỡng => Ẩn tabs
            tabs.style.opacity = '0';
            tabs.style.visibility = 'hidden';
        }

        lastScrollTop = currentScroll;
    });
}

// Hàm xử lý cuộn mượt khi click vào tab
function enableSmoothScroll(tabsLinks, tabs) {
    tabsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định (cuộn ngay lập tức)

            // Lấy giá trị href (VD: #tour-info)
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Cuộn đến vị trí nội dung
            if (targetElement) {
                const headerHeight = tabs.offsetHeight; // Chiều cao header cố định
                const offsetTop = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth', // Cuộn mượt
                });
            }
        });
    });
}

// Hàm khởi tạo tất cả chức năng
function initStickyTabs(scrollThreshold = 150) {
    const tabs = document.querySelector('.tabs-detail');
    const tabsLinks = document.querySelectorAll('.tabs-detail_container a');

    if (!tabs || tabsLinks.length === 0) return; // Kiểm tra nếu không có phần tử thì thoát

    hideTabsOnLoad(tabs); // Ẩn tabs ngay khi tải trang
    handleScroll(tabs, scrollThreshold); // Hiển thị/ẩn tabs khi cuộn
    enableSmoothScroll(tabsLinks, tabs); // Kích hoạt cuộn mượt khi click
}

// Gọi hàm khởi tạo
initStickyTabs(150); // Tham số: Ngưỡng cuộn tối thiểu để tabs hiện
