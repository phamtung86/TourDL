let tours = []; // Mảng lưu trữ dữ liệu tour sau khi tải về từ API
let toursById = [];
let page = 0;
let size = 5;
let sort = 'id,asc';
//Xử lí button nextPage,prevPage
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
prev.addEventListener("click",prePage);
next.addEventListener("click",nextPage);
//Tổng số tour
async function totalTour(){
    const response = await axios.get("http://localhost:8080/api/v1/tours/total");
    if(response.status==200) document.querySelector(".total-tour").innerHTML = response.data;

}

// Hàm tải danh sách tour từ API
async function getTours() {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/tours/page?pageNumber=${page}&size=${size}&sort=${sort}`);
        if (response.status === 200) {
            tours = response.data.content;
            if (tours.length > 0) {
                renderTours(tours);
            } else {
                alert("Không có voucher nào.");
            }
        }
    } catch (error) {
        console.error("Lỗi khi tải danh sách voucher:", error);
    }
}

// Hàm render tour ra giao diện
function renderTours(data) {
    const htmlContainer = document.querySelector('.voucher__admin--table--body');
    const html = data.map((tour) => {
        return `
            <div class=voucher__admin--table--rows key=${tour.id}>
                <div class="voucher__admin--table--data">
                    <input type="radio" name='select__voucher' id="voucher-id" value="${tour.id}" />
                </div>
                <div class="voucher__admin--table--data">${tour.id}</div>
                <div class="voucher__admin--table--data">${tour.name}</div>
                <div class="voucher__admin--table--data"><img src="${tour.imageLink}"></div>
                <div class="voucher__admin--table--data">${tour.price}</div>
                <div class="voucher__admin--table--data">${tour.departurePoint}</div>
                <div class="voucher__admin--table--data">${tour.destination}</div>
                <div class="voucher__admin--table--data">${tour.transport.name}</div>
                <div class="voucher__admin--table--data">${tour.tourType.name}</div>
            </div>
        `;
    }).join('');

    htmlContainer.innerHTML = html;
}
function nextPage(){
    page++;
    getTours();
}
function prePage(){
    if(page>0){
        page--;
        getTours();
    }
}
// Hàm xử lý tìm kiếm tour
function searchTours(keyword) {
    const filteredTours = tours.filter(tour =>
        tour.id.toString().includes(keyword) || // Tìm theo mã
        tour.name.toLowerCase().includes(keyword.toLowerCase()) // Tìm theo tên
    );
    renderTours(filteredTours); // Render kết quả tìm kiếm
}

// Gán sự kiện tìm kiếm cho ô nhập liệu
const searchInput = document.querySelector('.action__search--text');
searchInput.addEventListener('input', (event) => {
    const keyword = event.target.value.trim();
    searchTours(keyword);
});

// Xử lý sự kiện khi nhấn nút "Thêm mới"
function handleAddNewVoucher() {
    const btnAddNew = document.querySelector(".action__add");
    btnAddNew.addEventListener('click', redirectPage);
}

function redirectPage(event) {
    event.stopPropagation();
    const link = event.target.closest('.action__add').dataset.link;
    if (link) {
        window.location.href = `${link}`;
    }
}

// Xử lý khi nhấn nút "Khóa"
const btnLock = document.querySelector('.action__delete');
btnLock.addEventListener('click', () => {
    const selectedRadio = document.querySelector('input[name="select__voucher"]:checked');
    if (selectedRadio) {
        const selectedVoucherId = selectedRadio.value;
        updateStatusVoucher(selectedVoucherId, -1); // Cập nhật trạng thái voucher thành "khóa"
    } else {
        alert("Bạn chưa chọn voucher để khóa");
    }
});

// Lấy voucher theo ID
async function fetchVoucherById(id) {
    try {
        const response = await axios.get(`${URL_API_SERVER_V1}/vouchers/${id}`);
        if (response.status === 200) {
            voucherById = response.data;
        } else {
            alert("Lấy voucher bằng id thất bại");
        }
    } catch (error) {
        console.error("Lỗi khi lấy voucher:", error);
    }
}


// Xử lý khi nhấn nút "Sửa"
const btnModify = document.querySelector(".action__lock");
btnModify.addEventListener('click', () => {
    const selectedRadio = document.querySelector('input[name="select__voucher"]:checked');
    if (selectedRadio) {
        const selectedVoucherId = selectedRadio.value;
        window.location.href = `/voucher/modify/${selectedVoucherId}`;
    } else {
        alert("Bạn chưa chọn voucher để sửa");
    }
});

// Hàm gọi khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    page = 0;
    getTours(); // Tải danh sách voucher
    totalTour();
    handleAddNewVoucher(); // Gán sự kiện cho nút "Thêm mới"
});
