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

document.querySelector(".btn-submit").addEventListener("click", async (event) => {
    event.preventDefault(); // Ngăn form reload trang
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            email,
            password
        });

        // Lưu token vào localStorage (nếu cần)
        localStorage.setItem("token", response.data.data.token);

        alert("Đăng nhập thành công!");
        window.location.href = "/"; // Điều hướng đến trang home
    } catch (error) {
        alert(error.response.data.message || "Đăng nhập thất bại, vui lòng thử lại!");
    }
});