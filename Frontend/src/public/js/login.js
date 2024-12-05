document.querySelector('.toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const icon = this;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.name = 'eye-outline'; // Đổi icon thành "mở mắt"
    } else {
        passwordInput.type = 'password';
        icon.name = 'eye-off-outline'; // Đổi icon thành "đóng mắt"
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Ngăn không reload trang

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Kiểm tra đầu vào
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.");
            return;
        }

        try {
            // Gửi yêu cầu POST với Axios
            const response = await axios.post("http://localhost:8080/api/User/users", {
                username: username,
                password: password
            });

            // Xử lý phản hồi từ server
            if (response.data.success) {
                alert("Đăng nhập thành công!");
                window.location.href = "/dashboard"; // Chuyển hướng nếu cần
            } else {
                alert(response.data.message || "Sai thông tin đăng nhập.");
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi:", error);
            alert("Không thể kết nối đến server. Vui lòng thử lại sau.");
        }
    });
});
