let calendars = [];
// Lấy ID tour từ URL
const urlPath = window.location.pathname;
const tourId = urlPath.split('/').pop();
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
} // Lấy ID từ URL
async function getCalendars(tourId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/Calendar/Calendars/${tourId}`);
        console.log(response)
        if (response.status === 200) {
            calendars = response.data;
            renderCalendars(calendars);
        }
    } catch (error) {
        console.error("Lỗi khi tải danh sách tour:", error);
    }
}
function renderCalendars(data) {
    console.log(data)
    const htmlContainer = document.querySelector('.tour__admin--table--body');
    const html = data.map((calendar) => {
        return `
            <div class="tour__admin--table--rows" key=${calendar.tourId}>
                <div class="tour__admin--table--data">
                    <input type="radio" name='select__voucher' id="voucher-id" value="${calendar.calendarId}" />
                </div>
                <div class="tour__admin--table--data">${calendar.calendarId}</div>
                <div class="tour__admin--table--data">${formatDate(calendar.calendarStartDate)}</div>
                <div class="tour__admin--table--data">${calendar.calendarSlot}</div>
                <div class="tour__admin--table--data">${calendar.voucher.voucherName}</div>
            </div>
        `;
    }).join('');
    htmlContainer.innerHTML = html;
}

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
document.addEventListener('DOMContentLoaded', async () => {
    try {
        getCalendars(tourId)
        handleAddNewVoucher()
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu trang:', error);
    }
});