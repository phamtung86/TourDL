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

function initCalendar() {
    const monthNames = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
    ];

    let currentMonth = new Date().getMonth(); // Tháng hiện tại (0-11)
    let currentYear = new Date().getFullYear(); // Năm hiện tại

    // Tạo danh sách 5 tháng/năm
    function createMonthList() {
        const monthList = document.getElementById("monthList");
        monthList.innerHTML = ''; // Xóa nội dung cũ

        for (let i = 0; i < 5; i++) { // Hiển thị 5 tháng
            const monthIndex = (currentMonth + i) % 12; // Đảm bảo tháng lặp lại từ 0-11
            const yearOffset = Math.floor((currentMonth + i) / 12); // Tăng năm khi vượt qua tháng 11
            const year = currentYear + yearOffset;

            const li = document.createElement("li");
            li.textContent = `${monthNames[monthIndex]}/${year}`;
            li.dataset.month = monthIndex;
            li.dataset.year = year;

            li.addEventListener("click", () => {
                currentMonth = monthIndex;
                currentYear = year;
                renderCalendar(currentMonth, currentYear);
                updateActiveMonth();
            });

            monthList.appendChild(li);
        }

        updateActiveMonth(); // Đánh dấu tháng hiện tại khi khởi tạo
    }

    // Hiển thị lịch
    function renderCalendar(month, year) {
        // Cập nhật tiêu đề tháng
        document.getElementById("monthName").textContent = `Tháng ${monthNames[month]}/${year}`;

        const calendarDays = document.getElementById("calendarDays");
        calendarDays.innerHTML = ''; // Xóa nội dung cũ

        const firstDay = new Date(year, month, 1).getDay(); // Ngày đầu tiên trong tháng
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Số ngày trong tháng

        // Tạo các ô trống trước ngày đầu tiên
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty");
            calendarDays.appendChild(emptyDiv);
        }

        // Tạo các ngày trong tháng
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;
            dayDiv.classList.add("day");
            if (
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()
            ) {
                dayDiv.classList.add("current-day"); // Đánh dấu ngày hiện tại
            }
            calendarDays.appendChild(dayDiv);
        }
    }

    // Cập nhật lớp active cho tháng được chọn
    function updateActiveMonth() {
        const monthListItems = document.querySelectorAll("#monthList li");
        monthListItems.forEach((item) => {
            const month = parseInt(item.dataset.month);
            const year = parseInt(item.dataset.year);
            if (month === currentMonth && year === currentYear) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // Xử lý sự kiện nút điều hướng
    document.getElementById("prevMonth").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        createMonthList(); // Cập nhật danh sách tháng
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        createMonthList(); // Cập nhật danh sách tháng
        renderCalendar(currentMonth, currentYear);
    });

    // Khởi tạo lịch và danh sách tháng
    createMonthList();
    renderCalendar(currentMonth, currentYear);
}

// Gọi hàm khởi tạo
initCalendar();



