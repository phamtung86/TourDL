async function getTotalOrderByType(type) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/TourOrders/TourOrdersByType/${type}`
    );
    if (response.status == 200) {
      document.getElementById('total-tour-order').innerHTML = response.data;
    } else {
      return;
    }
  } catch (error) {
    console.error('Lỗi khi lấy tổng số tour:', error);
  }
}

function getTotalTourByType(type) {
  document.getElementById('cart-title-total-tour-order').innerHTML =
    '| ' + changeUSToVN(type);
  getTotalOrderByType(type);
}

// Hàm lấy doanh thu
async function getRevenue(type) {
  try {
    const response = await axios.get(`${URL_API_SERVER_V1}/Revenue/${type}`);
    const revenue = response.data; // Lấy dữ liệu từ response
    if (response.status === 200) {
      const formattedRevenue = revenue.toLocaleString('en-US', {
        maximumFractionDigits: 3,
      });
      document.getElementById('revenue').innerHTML = formattedRevenue;
    } else {
      return;
    }
  } catch (error) {
    console.error('Lỗi khi lấy doanh thu:', error);
  }
}

function changeUSToVN(type) {
  switch (type) {
    case 'DAY':
      return 'Hôm nay';
    case 'MONTH':
      return 'Tháng';
    case 'YEAR':
      return 'Năm';
  }
}

// Hàm gọi getRevenue khi người dùng chọn giá trị từ dropdown
function getRevenueFromDropdown(type) {
  document.getElementById('card-title-status').innerHTML =
    '| ' + changeUSToVN(type);
  getRevenue(type);
}

async function getTopTour(type) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/TopTour?type=${type}`
    );

    if (response.status === 200) {
      const html =
        response.data.length > 0
          ? response.data
            .map((item) => {
              const formattedTotalPrice = item.totalPrice
                ? Number(item.totalPrice).toLocaleString('en-US', {
                  maximumFractionDigits: 3,
                })
                : '0';
              return `
                    <tr>
                        <td class="list-tour-data">${item.tour.id}</td>
                        <td class="list-tour-data"><img src="${item.tour.imageLink}" alt=""/></td>
                        <td class="list-tour-data">${item.tour.name}</td>
                        <td class="list-tour-data">${item.quantity}</td>
                        <td class="list-tour-data">${formattedTotalPrice} ₫</td>                                              
                    </tr>
                `;
            })
            .join('')
          : `
                <tr>
                    ${Array(5)
            .fill('<td class="list-tour-data">Không có dữ liệu</td>')
            .join('')}
                </tr>
            `;

      document.getElementById('list-top-tour').innerHTML = html;
    }
  } catch (error) {
    console.log('Lỗi trong quá trình lấy top tour ' + error);
  }
}

function getTopTourByType(type, e) {
  event.preventDefault();
  document.getElementById('card-top-tour-title').innerHTML =
    '| ' + changeUSToVN(type);
  getTopTour(type);
}
function chatArtsTourOrderByMonth() {
  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],  // Dữ liệu nhãn ban đầu là mảng rỗng
      datasets: [{
        label: 'Tour đặt',
        data: [],  // Dữ liệu ban đầu là mảng rỗng
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  fetch('http://localhost:8080/api/v1/TourOrders/statsbyMonth')  // Thay thế URL này bằng API thật
    .then(response => response.json())
    .then(data => {
      // 4. Cập nhật dữ liệu cho biểu đồ
      myChart.data.labels = data.month;  // Gán dữ liệu nhãn
      myChart.data.datasets[0].data = data.totalOrder;  // Gán dữ liệu biểu đồ

      // 5. Cập nhật lại biểu đồ sau khi thay đổi dữ liệu
      myChart.update();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
chatArtsTourOrderByMonth()

let revenueLineChart = null; // Khởi tạo biến này là null thay vì undefined

async function charArtsRevenueByType(type, event) {
  console.log(type);  // Kiểm tra type khi gọi hàm

  // Ngừng hành vi mặc định của thẻ <a>
  if (event) {
    event.preventDefault();
  }

  try {
    // Gọi API để lấy dữ liệu
    const response = await axios.get(`http://localhost:8080/api/v1/TourOrders/StatsRevenue/${type}`);
    
    // Trích xuất dữ liệu từ response
    const dataFromAPI = response.data;
    let labels;

    if (type === "DAY") {
      // Nếu là "DAY", hiển thị ngày (yyyy-mm-dd)
      labels = dataFromAPI.map(item => {
        const date = new Date(item.orderDate);
        return date.toISOString().split('T')[0]; // Chuyển đổi thành định dạng yyyy-mm-dd
      });
    } 
    
    if (type === "MONTH") {
      // Nếu là "MONTH", hiển thị tháng (Tháng 1, Tháng 2,...)
      labels = dataFromAPI.map(item => {
        return `Tháng ${item.month}`;
      });
    }

    // Tạo mảng doanh thu
    const revenueData = dataFromAPI.map(item => parseFloat(item.totalPrice));

    // Dữ liệu cho biểu đồ
    const data = {
      labels: labels,
      datasets: [{
        label: "Doanh thu (VNĐ)",
        data: revenueData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3
      }]
    };

    // Cấu hình biểu đồ
    const config = {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Doanh thu (VNĐ)"
            }
          },
          x: {
            title: {
              display: true,
              text: type === 'DAY' ? "Ngày" : "Tháng" // Tự động thay đổi tên trục X dựa trên type
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true,
            mode: 'nearest',
            intersect: false,
            callbacks: {
              title: function(tooltipItem) {
                return type === 'DAY' ? `Ngày: ${tooltipItem[0].label}` : `Tháng: ${tooltipItem[0].label}`; // Hiển thị ngày hoặc tháng trong tooltip
              },
              label: function(tooltipItem) {
                const value = tooltipItem.raw;
                return `${tooltipItem.dataset.label}: ${value.toLocaleString()} VNĐ`; // Hiển thị doanh thu
              }
            }
          }
        }
      }
    };

    // Nếu biểu đồ đã tồn tại, hủy bỏ nó
    if (revenueLineChart) {
      revenueLineChart.destroy(); // Hủy bỏ biểu đồ cũ trước khi tạo lại
    }

    // Render biểu đồ mới
    revenueLineChart = new Chart(
      document.getElementById('revenueLineChart'),
      config
    );

  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
}
window.onload = function() {
  document.getElementById('card-stats-revenue-title').innerHTML =  '| ' + changeUSToVN("MONTH");
  changeChartArtRevenue('MONTH');
};
function changeChartArtRevenue(type) {
  document.getElementById('card-stats-revenue-title').innerHTML =  '| ' + (changeUSToVN(type) === "Hôm nay" ? "Ngày" : changeUSToVN(type));
  charArtsRevenueByType(type);
}
