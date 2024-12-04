// Lấy tất cả các nút điều hướng
var link = "/dashboard"
let btnNavLink = document.querySelectorAll('.nav__link');

// Gán sự kiện click cho các nút điều hướng
btnNavLink.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.stopPropagation();
    
    // Lấy đường dẫn từ thuộc tính data-link
    link = event.currentTarget.dataset.link;

    // Lưu đường dẫn vào localStorage để duy trì trạng thái checked
    localStorage.setItem('activeLink', link);

    // Điều hướng tới đường dẫn tương ứng
    window.location.href = `${link}`;
  });
});

// Khôi phục trạng thái checked từ localStorage khi trang tải lại
document.addEventListener('DOMContentLoaded', () => {
  const activeLink = localStorage.getItem('activeLink');

  if (activeLink) {
    // Tìm nút có data-link trùng khớp với giá trị được lưu
    const activeButton = document.querySelector(`.nav-button[data-link="${activeLink}"]`);
    if (activeButton) {
      // Thêm class checked cho nút đó
      activeButton.classList.add('checked');
    }
  }
});

// Đảm bảo mỗi nút chỉ có một trạng thái checked
document.querySelectorAll('.nav-button').forEach((button) => {
  button.addEventListener('click', () => {
    // Xóa class checked từ tất cả các nút
    document.querySelectorAll('.nav-button').forEach((btn) => btn.classList.remove('checked'));

    // Thêm class checked cho nút vừa click
    button.classList.add('checked');
  });
});
