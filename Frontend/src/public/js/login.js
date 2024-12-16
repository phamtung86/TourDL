document
  .querySelector('.toggle-password')
  .addEventListener('click', function () {
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

document
  .querySelector('form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message'); // Thêm thông báo lỗi nếu có

    // Tạo đối tượng dữ liệu để gửi tới API
    const loginData = {
      emailOrUserName: username, // username từ form
      password: password,
    };

    try {
      // Gửi yêu cầu đăng nhập đến API bằng axios
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        loginData
      );

      if (response.status === 200) {
        // Đăng nhập thành công, lấy dữ liệu JWT từ response
        const jwtResponse = response.data.data;
        // Lưu token vào SessionStorage
        sessionStorage.setItem('jwt', jwtResponse.token);
        sessionStorage.setItem('userID', jwtResponse.userId);
        sessionStorage.setItem('username', jwtResponse.userName);
        // Giải mã token JWT để lấy thông tin người dùng
        const decodedToken = jwt_decode(jwtResponse.token); // Sử dụng jwtResponse.token thay vì jwtToken
        // Kiểm tra role trong token và điều hướng người dùng
        if (decodedToken.roles && decodedToken.roles.includes('ROLE_ADMIN')) {
          // Nếu role là ROLE_ADMIN, điều hướng đến trang dashboard
          window.location.href = '/dashboard';
        } else if (
          decodedToken.roles &&
          decodedToken.roles.includes('ROLE_USER')
        ) {
          // Nếu role là ROLE_USER, điều hướng đến trang chính
          window.location.href = '/';
        } else {
          // Nếu không có role hợp lệ, điều hướng về trang lỗi hoặc trang khác
          window.location.href = '/error';
        }
      }
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại
      console.error('Login failed', error);
      const errorData = error.response ? error.response.data : null;
      if (errorData) {
        alert(errorData.message || 'Đăng nhập thất bại');
      }
    }
  });
