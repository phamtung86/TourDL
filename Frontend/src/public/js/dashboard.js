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
