document.querySelector('.crudFrom').addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang

    // Thu thập dữ liệu từ form
    const tourData = {
        id: document.getElementById('tourId').value,
        name: document.getElementById('tourName').value,
        price: parseFloat(document.getElementById('tourPrice').value),
        imageLink: document.getElementById('tourIamge').value,
        destination: document.getElementById('tourEndPoint').value,
        departurePoint: document.getElementById('tourStartPoint').value,
        transport: {
            id: document.querySelector('.tour-input-transport').value // Lấy ID phương tiện
        },
        tourType: {
            id: document.querySelector('.tour-input-type').value // Lấy ID loại tour
        },
        calendar: [
        ]
    };

    try {
        const response = await fetch('http://localhost:8080/api/v1/tours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tourData),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Thêm tour thành công!');
            console.log('Kết quả:', result);

            // Reset form
            document.querySelector('.crudFrom').reset();
        } else {
            const error = await response.json();
            alert('Thêm tour thất bại: ' + (error.message || 'Lỗi không xác định'));
            console.error('Lỗi:', error);
        }
    } catch (err) {
        alert('Không thể kết nối đến API. Vui lòng thử lại sau.');
        console.error('Lỗi kết nối:', err);
    }
});
const cancelAddTourBtn = document.getElementById('cancelAddTour');
cancelAddTourBtn.addEventListener('click', () => {
    window.location.href = '/tour'; // Quay lại trang danh sách tour
});s

