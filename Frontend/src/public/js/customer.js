let allUsers = []; // Lưu tất cả người dùng từ API

/**
 * Lấy danh sách người dùng từ API
 */
async function getCustomer() {
    try {
        const response = await axios.get('http://localhost:8080/api/User/users');
        if (response.status === 200) {
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
    // Lọc ra những người dùng không bị khóa (role !== -1) và đang hoạt động
    const activeUsers2 = users.filter(user => user.role !== -1 && user.role !== 1); // Người dùng không bị khóa (role !== -1)
    // Lọc ra người dùng bị khóa (role = -1) và cập nhật vào phần tử 'locked-user'
    const lockedUsers = users.filter(user => user.role === -1);

    // Cập nhật lên giao diện
    document.querySelector('.total-user').textContent = activeUsers1.length;
    document.querySelector('.active-user').textContent = activeUsers2.length;
    document.querySelector('.locked-user').textContent = lockedUsers.length;
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
            <div class="user__admin--table--row ${user.role === -1 ? 'locked' : ''}">
                <div class="user__admin--table--data ${user.role === -1 ? 'locked-column' : ''}">
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
 * Hàm xử lý khi nhấn nút "Khóa"
 */
async function lockUser(userId) {
    try {
        // Kiểm tra xem người dùng đã bị khóa chưa
        const userRow = document.querySelector(`input[value="${userId}"]`).closest('.user__admin--table--row');
        if (userRow && userRow.classList.contains('locked')) {
            alert('Người dùng này đã bị khóa trước đó!');
            return;
        }

        const response = await axios.put(`http://localhost:8080/api/User/lock/${userId}`);

        if (response.status === 200) {
            alert('Khóa tài khoản thành công!');

            // Tìm dòng tương ứng với userId và thêm lớp 'locked'
            if (userRow) {
                userRow.classList.add('locked');
            }
        } else {
            alert(`Có lỗi xảy ra: ${response.status} - ${response.data?.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
        alert('Không thể khóa tài khoản. Vui lòng thử lại!');
    }
}

/**
 * Hàm xử lý khóa người dùng khi nhấn nút "Khóa"
 */
function handleLockUser() {
    // Lấy radio button đã được chọn
    const selectedRadio = document.querySelector('input[name="userSelection"]:checked');

    if (!selectedRadio) {
        alert('Vui lòng chọn người dùng để khóa!');
        return;
    }

    const userId = selectedRadio.value;

    // Kiểm tra nếu người dùng đã bị khóa (role = -1)
    const user = allUsers.find(user => user.id == userId);
    if (user && user.role === -1) {
        alert('Người dùng này đã bị khóa!');
        return location.reload();
    }

    const confirmLock = confirm(`Bạn có chắc chắn muốn khóa tài khoản với ID: ${userId}?`);
    if (!confirmLock) return;

    // Gọi hàm lockUser để khóa tài khoản
    lockUser(userId);
}

/**
 * Hàm xử lý khi nhấn nút "Làm mới"
 */
async function refreshUser(userId) {
    try {
        // Lấy thông tin người dùng từ danh sách allUsers
        const user = allUsers.find(u => u.id == userId);

        if (user && user.role === 0) {
            alert('Người dùng đang hoạt động!');
            return location.reload(); // Không làm gì thêm, chỉ dừng lại ở đây
        }

        const response = await axios.put(`http://localhost:8080/api/User/refresh/${userId}`);

        if (response.status === 200) {
            alert('Làm mới thành công!');

            // Cập nhật lại giao diện người dùng sau khi làm mới
            const userRow = document.querySelector(`input[value="${userId}"]`).closest('.user__admin--table--row');
            if (userRow) {
                userRow.classList.remove('locked'); // Nếu có lớp 'locked', bỏ lớp đó
            }

            // Sau khi cập nhật, có thể tải lại danh sách người dùng để đồng bộ dữ liệu
            getCustomer();

        } else {
            alert(`Có lỗi xảy ra: ${response.status} - ${response.data?.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
        alert('Không thể làm mới tài khoản. Vui lòng thử lại!');
    }
}

/**
 * Hàm xử lý khi nhấn nút "Làm mới"
 */
function handleRefreshUser() {
    // Lấy radio button đã được chọn
    const selectedRadio = document.querySelector('input[name="userSelection"]:checked');

    if (!selectedRadio) {
        alert('Vui lòng chọn người dùng để làm mới!');
        return;
    }

    const userId = selectedRadio.value;

    // Xác nhận trước khi làm mới
    const confirmRefresh = confirm(`Bạn có chắc chắn muốn làm mới tài khoản với ID: ${userId}?`);
    if (!confirmRefresh) return;

    // Gọi hàm refreshUser để cập nhật role = 0
    refreshUser(userId);
}

/**
 * Khởi tạo khi tải trang
 */
document.addEventListener('DOMContentLoaded', () => {
    getCustomer(); // Tải danh sách người dùng
    handleEvents(); // Gán sự kiện

    // Gán sự kiện cho nút "Khóa"
    const lockButton = document.querySelector('.action__button.action__look');
    lockButton.addEventListener('click', handleLockUser);

    // Gán sự kiện cho nút "Làm mới"
    const refreshButton = document.querySelector('.action__button.action__refresh');
    refreshButton.addEventListener('click', handleRefreshUser);
});