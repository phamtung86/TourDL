function handleSubmit(event) {
    event.preventDefault(); // Ngừng hành động mặc định của form

    // Lấy userId từ URL (Giả sử đường dẫn có dạng: /user/edit/{id})
    const userId = window.location.pathname.split('/').pop();

    // Lấy dữ liệu từ các trường input trong form
    const updatedCustomer = {
        userName: document.getElementById('customerAccount').value,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phoneNumber: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value
    };

    // Kiểm tra xem tất cả các trường đã có giá trị chưa
    if (!updatedCustomer.userName || !updatedCustomer.name || !updatedCustomer.email || !updatedCustomer.phoneNumber || !updatedCustomer.address) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Gửi yêu cầu cập nhật thông tin người dùng qua API
    axios.put(`/user/edit/${userId}`, updatedCustomer)
        .then(response => {
            alert('Cập nhật thông tin thành công!');
            // Chuyển hướng hoặc thực hiện hành động sau khi cập nhật thành công
            window.location.href = '/user/list'; // Hoặc trang khác
        })
        .catch(error => {
            console.error(error);
            alert('Lỗi khi cập nhật thông tin khách hàng.');
        });
}

// Thêm sự kiện submit vào form
document.getElementById('customerForm').addEventListener('submit', handleSubmit);
