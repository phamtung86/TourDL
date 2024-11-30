let allUsers = []; // Lưu tất cả người dùng từ API để sử dụng khi tìm kiếm

async function getCustomer() {
    try {
        const response = await axios.get('http://localhost:8080/api/User/users');

        if (response.status !== 200 || !response.data) {
            console.error(`API không trả dữ liệu hợp lệ. Status: ${response.status}`);
            alert('Không thể tải dữ liệu từ máy chủ!');
            return;
        }

        allUsers = Array.isArray(response.data) ? response.data : []; // Lưu dữ liệu người dùng

        // Lọc người dùng có role = 0
        const activeUsers = allUsers.filter(user => user.role === 0);

        // Cập nhật số lượng người dùng có role = 0 vào báo cáo
        document.querySelector('.total-user').textContent = activeUsers.length;

        // Hiển thị tất cả người dùng ban đầu
        filterUsers('');
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);

        const tableBody = document.querySelector('.user__admin--table--body');
        tableBody.innerHTML = `
          <div class="error-message">Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.</div>
        `;
    }
}

function filterUsers(searchTerm) {
    const tableBody = document.querySelector('.user__admin--table--body');
    tableBody.innerHTML = ''; // Xóa nội dung cũ

    const filteredUsers = allUsers.filter(user =>
        user.id.toString().includes(searchTerm) ||
        user.userName.toLowerCase().includes(searchTerm)
    );

    if (filteredUsers.length === 0) {
        tableBody.innerHTML = `<div class="empty-message">Không tìm thấy người dùng phù hợp.</div>`;
        return;
    }

    filteredUsers.forEach(user => {
        // Kiểm tra role, nếu role = 1 thì bỏ qua (không render)
        if (user.role === 1) {
            return; // Bỏ qua người dùng có role = 1
        }

        const row = document.createElement('div');
        row.classList.add('user__admin--table--row');

        row.innerHTML = `
      <div class="user__admin--table--data">
        <input type="radio" name="userSelection" value="${user.id}" />
      </div>
      <div class="user__admin--table--data">${user.id}</div>
      <div class="user__admin--table--data">${user.userName}</div>
      <div class="user__admin--table--data">${user.name}</div>
      <div class="user__admin--table--data">${user.email}</div>
      <div class="user__admin--table--data">${user.phoneNumber}</div>
      <div class="user__admin--table--data">${user.address}</div>
    `;

        tableBody.appendChild(row);
    });
}

// Hàm gọi khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    // Hàm xử lý khi trang được tải
    const initialize = () => {
        getCustomer(); // Tải danh sách customer

        // Lắng nghe sự kiện click trên nút "Sửa"
        document.querySelector('.action__edit').addEventListener('click', handleEditClick);

        // Lắng nghe sự kiện input trong ô tìm kiếm
        document.querySelector('.action__search--text').addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase(); // Lấy giá trị nhập vào và chuyển thành chữ thường
            filterUsers(searchTerm); // Lọc người dùng dựa trên từ khóa tìm kiếm
        });
    };

    // Gọi hàm initialize khi DOM content được tải xong
    initialize();
});

// Hàm xử lý sự kiện khi nhấn nút "Sửa"
function handleEditClick() {
    // Lấy radio button đã được chọn
    const selectedRadio = document.querySelector('input[name="userSelection"]:checked');

    if (selectedRadio) {
        const userId = selectedRadio.value; // Lấy ID của người dùng đã chọn

        // Xử lý sự kiện khi nhấn "Sửa", ví dụ chuyển hướng đến trang chỉnh sửa
        window.location.href = `/user/edit/${userId}`;

        // Hoặc có thể mở một form chỉnh sửa (ví dụ)
        // openEditForm(userId);
    } else {
        alert('Vui lòng chọn một người dùng để sửa.');
    }
}







