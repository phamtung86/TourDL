// Lấy ID tour từ URL
const urlPath = window.location.pathname;
const tourId = urlPath.split('/').pop(); // Lấy ID từ URL

// Lấy thông tin tour từ API
async function getTourById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/tours/tour/${id}`);
        if (response.status === 200) {
            const tour = response.data;

            // Cập nhật các giá trị của các trường
            document.getElementById('tourId').value = tour.tourId;
            document.getElementById('tourName').value = tour.name;
            document.getElementById('tourPrice').value = tour.tourPrice;
            document.getElementById('tourEndPoint').value = tour.tourDestination;
            document.getElementById('tourStartPoint').value = tour.tourDeparturePoint;
            document.getElementById('tourIamge').value = tour.tourImageLink;

            if(tour.nameTransport=="Xe"){document.querySelector('.tour-input-transport').value =1;}
            else{
                document.querySelector('.tour-input-transport').value =0 
            }
            switch(tour.nameType){
                case "Tiết Kiệm" : document.querySelector('.tour-input-type').value =1; break;
                case "Giá tốt" :  document.querySelector('.tour-input-type').value =2; break;
                case "Tiêu chuẩn" :  document.querySelector('.tour-input-type').value =3; break;
                case "Cao cấp" :  document.querySelector('.tour-input-type').value =4; break;
            }

        } else {
            console.error('Lỗi khi lấy thông tin tour');
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin tour:', error);
    }
}

// Cập nhật tour thông qua API
async function updateTour(id) {
    // Lấy các giá trị từ form
    const tourId= document.getElementById('tourId').value;
    const tourName=document.getElementById('tourName').value;
    const tourPrice = document.getElementById('tourPrice').value;
    const des = document.getElementById('tourEndPoint').value;
    const depart = document.getElementById('tourStartPoint').value;
    const image = document.getElementById('tourIamge').value;
    const updatedTour = {
        id: tourId,
        name: tourName,
        price: tourPrice, // Giá được chuyển thành kiểu float
        imageLink: image,
        fileName: "",
        destination: des,
        departurePoint: depart,
        transport: {
            id: document.querySelector('.tour-input-transport').value // Lấy giá trị từ select của phương tiện
        },
        tourType: {
            id: document.querySelector('.tour-input-type').value // Lấy giá trị từ select của loại tour
        },
        calendar: []

    };
console.log(updatedTour);

    try {
        const response = await axios.put(`http://localhost:8080/api/v1/tours/tour/${id}`, updatedTour);
        if (response.status === 200) {
            alert("Tour đã được cập nhật thành công!");
            window.location.href = '/tour';  // Chuyển hướng về danh sách tour
        } else {
            console.error('Cập nhật tour thất bại');
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật tour:', error);
    }
}

// Khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    getTourById(tourId);  // Lấy thông tin tour khi trang tải xong
});

// Lắng nghe sự kiện submit của form
const form = document.querySelector('.crudFrom'); // Chọn form dựa trên class của form
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn hành vi mặc định của form
        updateTour(tourId); // Gọi hàm updateTour với ID của tour
    });
}