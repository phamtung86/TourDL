let allUsers = []; // Lưu tất cả người dùng từ API

/**
 * Lấy danh sách người dùng từ API
 */
async function getCustomer() {
    try {
        const response = await axios.get('http://localhost:8080/api/User/users');
        if (response.status === 200 && Array.isArray(response.data)) {
            allUsers = response.data;
            updateReport(allUsers); // Cập nhật báo cáo
            renderUsers(allUsers); // Hiển thị người dùng
        } else {
            console.error("API không trả dữ liệu hợp lệ.");
            alert("Không thể tải dữ liệu từ máy chủ.");
        }
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        showErrorMessage("Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.");
    }
}

/**
 * Cập nhật báo cáo số lượng người dùng
 */
function updateReport(users) {
    const activeUsers1 = users.filter(user => user.role === 0);
    document.querySelector('.total-user').textContent = activeUsers1.length;

    // Lọc ra những người dùng không bị khóa (role !== -1) và đang hoạt động
    const activeUsers2 = users.filter(user => user.role !== -1 && user.role !== 1); // Người dùng không bị khóa (role !== -1)

    // Cập nhật số lượng người dùng đang hoạt động trên giao diện
    document.querySelector('.active-user').textContent = activeUsers2.length;
}

/**
 * Hiển thị danh sách người dùng lên giao diện
 */
function renderUsers(users) {
    const tableBody = document.querySelector('.user__admin--table--body');
    tableBody.innerHTML = ''; // Xóa nội dung cũ

    const rows = users
        .filter(user => user.role !== 1) // Lọc bỏ người dùng có role = 1
        .map(user => `
            <div class="user__admin--table--row">
                <div class="user__admin--table--data">
                    <input type="radio" name="userSelection" value="${user.id}" />
                </div>
                <div class="user__admin--table--data">${user.id}</div>
                <div class="user__admin--table--data">${user.userName}</div>
                <div class="user__admin--table--data">${user.name}</div>
                <div class="user__admin--table--data">${user.email}</div>
                <div class="user__admin--table--data">${user.phoneNumber}</div>
                <div class="user__admin--table--data">${user.address}</div>
            </div>
        `).join('');

    tableBody.innerHTML = rows || '<div class="empty-message">Không tìm thấy người dùng phù hợp.</div>';
}

/**
 * Hiển thị thông báo lỗi
 */
function showErrorMessage(message) {
    const tableBody = document.querySelector('.user__admin--table--body');
    tableBody.innerHTML = `<div class="error-message">${message}</div>`;
}

/**
 * Tìm kiếm người dùng theo từ khóa
 */
function filterUsers(keyword) {
    const filteredUsers = allUsers.filter(user =>
        user.id.toString().includes(keyword) ||
        user.userName.toLowerCase().includes(keyword.toLowerCase())
    );
    renderUsers(filteredUsers);
}

/**
 * Gán các sự kiện DOM
 */
function handleEvents() {
    // Sự kiện tìm kiếm
    const searchInput = document.querySelector('.action__search--text');
    searchInput.addEventListener('input', (event) => {
        const keyword = event.target.value.trim();
        filterUsers(keyword);
    });
}

/**
 * Khởi tạo khi tải trang
 */
document.addEventListener('DOMContentLoaded', () => {
    getCustomer(); // Tải danh sách người dùng
    handleEvents(); // Gán sự kiện
});
