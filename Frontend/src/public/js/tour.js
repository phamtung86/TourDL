let tourData = [];
let currentTourIndex = null;

document.addEventListener('DOMContentLoaded', () => {
    loadTours();
});

// Load danh sách tour từ API
function loadTours() {
    fetch('/api/tours')
        .then(response => response.json())
        .then(data => {
            tourData = data;
            renderTours();
        })
        .catch(error => console.error('Error loading tours:', error));
}

// Hiển thị danh sách tour
function renderTours() {
    const tbody = document.getElementById('tour-body');
    tbody.innerHTML = '';
    
    tourData.forEach((tour, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tour.code}</td>
            <td>${tour.name}</td>
            <td>${tour.price}</td>
            <td><img src="${tour.image}" alt="${tour.name}" width="50" height="50"></td>
            <td>${tour.start}</td>
            <td>${tour.end}</td>
            <td>${tour.transport}</td>
            <td>${tour.type}</td>
            <td>
                <button class="btn" onclick="editTour(${index})">Sửa</button>
                <button class="btn" onclick="deleteTour(${index})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Mở form thêm/sửa
function openForm() {
    document.getElementById('form-container').classList.add('open');
    document.getElementById('tour-form').reset();
    document.getElementById('form-title').innerText = 'Thêm Tour Mới';
    currentTourIndex = null;
}

// Đóng form
function closeForm() {
    document.getElementById('form-container').classList.remove('open');
}

// Thêm hoặc sửa tour
function submitForm(event) {
    event.preventDefault();

    const newTour = {
        code: document.getElementById('tour-code').value,
        name: document.getElementById('tour-name').value,
        price: document.getElementById('tour-price').value,
        image: document.getElementById('tour-image').value,
        start: document.getElementById('tour-start').value,
        end: document.getElementById('tour-end').value,
        transport: document.getElementById('tour-transport').value,
        type: document.getElementById('tour-type').value,
    };

    if (currentTourIndex === null) {
        fetch('/api/tours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTour),
        })
        .then(response => response.json())
        .then(data => {
            tourData.push(data);
            renderTours();
            closeForm();
        })
        .catch(error => console.error('Error adding tour:', error));
    } else {
        fetch(`/api/tours/${tourData[currentTourIndex].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTour),
        })
        .then(response => response.json())
        .then(data => {
            tourData[currentTourIndex] = data;
            renderTours();
            closeForm();
        })
        .catch(error => console.error('Error updating tour:', error));
    }
}

// Sửa tour
function editTour(index) {
    const tour = tourData[index];
    document.getElementById('tour-code').value = tour.code;
    document.getElementById('tour-name').value = tour.name;
    document.getElementById('tour-price').value = tour.price;
    document.getElementById('tour-image').value = tour.image;
    document.getElementById('tour-start').value = tour.start;
    document.getElementById('tour-end').value = tour.end;
    document.getElementById('tour-transport').value = tour.transport;
    document.getElementById('tour-type').value = tour.type;
    
    document.getElementById('form-title').innerText = 'Sửa Tour';
    currentTourIndex = index;

    openForm();
}

// Xóa tour
function deleteTour(index) {
    if (confirm('Bạn có chắc chắn muốn xóa tour này?')) {
        fetch(`/api/tours/${tourData[index].id}`, {
            method: 'DELETE',
        })
        .then(() => {
            tourData.splice(index, 1);
            renderTours();
        })
        .catch(error => console.error('Error deleting tour:', error));
    }
}

// Tìm kiếm tour
function searchTour() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredTours = tourData.filter(tour =>
        tour.name.toLowerCase().includes(searchTerm)
    );
    renderTours(filteredTours);
}
