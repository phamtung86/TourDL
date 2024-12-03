// Variables
// HTML
const tourList = document.querySelector('.tour-list__item-container');
// Other
let PAGE_NUMBER = -1;
// Function get api
//* Lấy dữ liệu tours từ API
let resTourList = async () => {
  try {
    let res = await axios.get(
      `${URL_API_SERVER_V1}/tours/page?pageNumber=1&size=10&sort=id,asc`
    );
    res = res.data;
    return { status: 0, data: res };
  } catch (error) {
    return { status: 3, message: 'Hệ thống website hiện đang bị lỗi' };
  }
};
// Function render HTML
let renderTourList = async () => {
  let res = await resTourList();
  if (res.status !== 0) {
    alert(res.message);
    tourList.innerHTML = ``;
  }
  let data = res.data;
  PAGE_NUMBER = data.totalPages; // Gán số trang -> khi scroll gọi lại số lần api
  let tours = data.content;
  let toursHTML = ``; // Biến để lưu trữ dữ liệu chuyển đổi HTML
  // Lưu dữ liệu tour từ API
  tours.forEach((tour) => {
    // Tạo HTML lịch nối vào tour
    calendars = tour.calendar;
    let calendarsHTML = ``;
    calendars.forEach((calendar) => {
      const date = new Date(calendar.calendarStartDate);
      const day = date.getUTCDate(); // Lấy ngày theo UTC
      const month = date.getUTCMonth() + 1; // Tháng (bắt đầu từ 0)
      calendarsHTML += `<li class="tour-list__item-day">${day
        .toString()
        .padStart(2, '0')}/${month.toString().padStart(2, '0')}</li>`;
    });
    // Xác định loại tour để hiển thị
    tourType = tour.tourType.tourTypeId;
    tourTypeClass = '';
    switch (tourType) {
      case 1:
        tourTypeClass = '--thrifty';
        break;
      case 2:
        tourTypeClass = '--good-price';
        break;
      case 3:
        tourTypeClass = '--standard';
        break;
      case 4:
        tourTypeClass = '--high';
        break;
      default:
        tourType = '--good-price';
        break;
    }
    toursHTML += `
      <div class="tour-list__item">
        <div class="tour-list__item-img">
          <img
            src="${tour.tourImageLink}"
            alt="Ảnh minh họa tour"
            class="tour-img"
          />
          <span class="tour-list__item-type ${tourTypeClass}">
            ${tour.tourType.tourTypeName}
          </span>
        </div>
        <div class="tour-list__item-info">
          <div class="tour-list__item--top">
            <h5 class="tour-list__item-heading">
              Đà nẵng - Rừng dừa bảy mẫu - Hội an Đà nẵng - Rừng dừa
              bảy mẫu - Hội an Đà nẵng - Rừng dừa bảy mẫu - Hội an
            </h5>
            <ul class="tour-list__item-box">
              <li class="tour-list__item-col">
                <span class="icon"
                  ><i class="fa-solid fa-ticket"></i>
                </span>
                <span> Mã tour: </span>
                <span class="tour-list__item-value"> ${tour.tourId} 
                </span>
              </li>
              <li class="tour-list__item-col">
                <span class="icon">
                  <i class="fa-solid fa-location-dot"></i>
                </span>
                <span> Khởi hành:</span>
                <span class="tour-list__item-value">
                  ${tour.tourDestination}
                </span>
              </li>
              <li class="tour-list__item-col">
                <span class="icon">
                  <i class="fa-solid fa-clock"></i>
                </span>
                <span> Thời gian:</span>
                <span class="tour-list__item-value"> 3D4Đ</span>
              </li>
              <li class="tour-list__item-col">
                <span class="icon">
                  <i class="fa-solid fa-plane"></i>
                </span>
                <span> Phương tiện:</span>
                <span class="tour-list__item-value"> ${tour.transport.name}
                </span>
              </li>
              <li class="tour-list__item-col --calendar">
                <span class="icon">
                  <i class="fa-solid fa-calendar-days"></i>
                </span>
                <span>Ngày khởi hành:</span>
                <div class="tour-list__item-day-container">
                  <span class="tour-list__button --left">
                    <i class="fa-solid fa-caret-left"></i>
                  </span>
                  <ul class="tour-list__item-startDay">
                    ${calendarsHTML}
                  </ul>
                  <span class="tour-list__button --right active">
                    <i class="fa-solid fa-caret-right"></i>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="tour-list__item--bottom">
            <p class="tour-list__item-price">
              <span>Giá từ:</span> <br />
              ${Intl.NumberFormat('vi-VN').format(tour.tourPrice)} &#x20AB;
            </p>
            <a href="#" class="tour-list__item-btn-detail">
              Xem chi tiết
            </a>
          </div>
        </div>
      </div>
    `;
  });
  tourList.innerHTML += toursHTML; // Hiển thị dữ liệu tour
};

// Hàm tải HTML vào trong trang website
const loadHTML = async () => {
  await renderTourList(); // Tải tours
};

// Event action
window.addEventListener('scroll', () => {
  console.log(tourList.scrollTop + tourList.clientHeight);
});

// Hiển thị dữ liệu sau khi đã tải trang
window.onload = () => {
  loadHTML();
};
