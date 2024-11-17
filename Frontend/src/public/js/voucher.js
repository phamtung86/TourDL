let vouchers = []; // Mảng lưu trữ dữ liệu voucher sau khi tải về từ API

function changeTypeVoucher(type) {
    switch (type) {
        case 0: return "Phần trăm";
        case 1: return "Tiền";
    }
}

function formatDate(dateString) {
    const date = new Date(dateString); // Chuyển chuỗi thành Date
    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Ho_Chi_Minh' 
    });
}

// Hàm tải danh sách voucher từ API
async function getVouchers() {
    const response = await axios.get(`${URL_API_SERVER_V1}/vouchers`);
    if (response.status === 200) {
        vouchers = response.data; // Lưu dữ liệu voucher vào biến toàn cục
        document.querySelector(".voucher__admin--report--value").innerHTML = vouchers.length;

        // Hiển thị tất cả voucher khi lần đầu tải
        renderVouchers(vouchers);
    }
}

// Hàm render voucher ra giao diện
function renderVouchers(data) {
    const htmlContainer = document.querySelector('.voucher__admin--table--body');
    const html = data.map((voucher) => {
        return `
            <div class="voucher__admin--table--rows" key=${voucher.id}>
                <div class="voucher__admin--table--data">
                    <input type="radio" name='select__voucher' />
                </div>
                <div class="voucher__admin--table--data">${voucher.id}</div>
                <div class="voucher__admin--table--data">${voucher.voucherName}</div>
                <div class="voucher__admin--table--data">${changeTypeVoucher(voucher.type)}</div>
                <div class="voucher__admin--table--data">${voucher.value}</div>
                <div class="voucher__admin--table--data">${formatDate(voucher.startDate)}</div>
                <div class="voucher__admin--table--data">${formatDate(voucher.expiryDate)}</div>
                </div>
        `;
    }).join('');

    htmlContainer.innerHTML = html;
}

// Hàm xử lý tìm kiếm voucher
function searchVouchers(keyword) {
    const filteredVouchers = vouchers.filter(voucher =>
        voucher.id.toString().includes(keyword) || // Tìm theo mã
        voucher.voucherName.toLowerCase().includes(keyword.toLowerCase()) // Tìm theo tên
    );
    renderVouchers(filteredVouchers); // Render kết quả tìm kiếm
}

// Gán sự kiện tìm kiếm cho ô nhập liệu
const searchInput = document.querySelector('.action__search--text');
searchInput.addEventListener('input', (event) => {
    const keyword = event.target.value.trim();
    searchVouchers(keyword);
});

getVouchers();

function handleAddNewVoucher() {
    const btnAddNew = document.querySelector(".action__add");
    
}