let resAPIInfo = async () => {
  try {
    let userId = sessionStorage.getItem('userID');
    let res = await axios.get(`http://localhost:3124/api/v1/users/${userId}`);
    //   Chưa validation
    return res.data.data;
  } catch (error) {
    alert('Lỗi call api');
    console.log(error);
    return {
      name: '',
      phone_number: '',
      address: '',
      email: '',
    };
  }
};

let optionTotal = {
  adult: {
    size: 1,
    price: 0,
    sale: 0,
  },
  young: {
    size: 0,
    price: 0,
    sale: 0.6,
  },
  children: {
    size: 0,
    price: 0,
    sale: 0.3,
  },
  baby: {
    size: 0,
    price: 0,
    sale: 0.1,
  },
};

let setValueAttributes = (attribute, name, value) => {
  optionTotal[attribute][name] = value;
};

let getValueAttributes = (attribute, name) => {
  return optionTotal[attribute][name];
};

let slot = (maximum = 5); //Giá trị slot còn trống trừ 1 slot mặc định

// load info customer
let loadInfoCustomer = async () => {
  let dataUser = await resAPIInfo();
  let customerName = document.querySelector(
    '.customer-info__box .box__item .name'
  );
  let customerPhone = document.querySelector(
    '.customer-info__box .box__item .phonenumber'
  );
  let customerEmail = document.querySelector(
    '.customer-info__box .box__item .email'
  );
  let customerAddress = document.querySelector(
    '.customer-info__box .box__item .address'
  );
  customerName.innerHTML = `${dataUser.name}`;
  customerPhone.innerHTML = `${dataUser.phone_number}`;
  customerEmail.innerHTML = `${dataUser.email}`;
  customerAddress.innerHTML = `${dataUser.address}`;
};
// Gắn giá trị của tour vào trong option lưu cục bộ
let setValueToOptionTotal = () => {
  let tourPrice = parseInt(
    document.querySelector('.customer-bill__tour-price').dataset.tourprice
  );
  setValueAttributes('adult', 'price', tourPrice);
  let youngPrice = getValueAttributes('young', 'sale') * tourPrice;
  setValueAttributes('young', 'price', youngPrice);
  let childrenPrice = getValueAttributes('children', 'sale') * tourPrice;
  setValueAttributes('children', 'price', childrenPrice);
  let babyPrice = getValueAttributes('baby', 'sale') * tourPrice;
  setValueAttributes('baby', 'price', babyPrice);
};

let renderPriceHTML = () => {
  let itemsPrice = document.querySelectorAll('.customer-bill__tour-price');
  itemsPrice.forEach((item) => {
    if (item.classList.contains('adult')) return;
    let type = item.classList[1];
    let price = getValueAttributes(type, 'price');
    item.innerText = Intl.NumberFormat('vi-VN').format(price);
  });
};

let configPriceTour = () => {
  setValueToOptionTotal();
  renderPriceHTML();
};

let loadHTML = async () => {
  await loadInfoCustomer();
  configPriceTour();
};

// Event
let eventDiminishSize = (itemHTML, parentHTML, infoItemHTML, itemPrice) => {
  let currentValue = parseInt(itemHTML.dataset.value);
  if (slot === maximum) {
    // Check điều kiện === maximum trống -> không tính slot mặc định 1
    return;
  }
  if (currentValue === 0) {
    // Check điều kiện nếu value của element đang == 0 thì thoát không thực hiện gì cả
    return;
  }
  if (currentValue === 1 && parentHTML.classList.contains('index')) {
    // kiểm tra điều kiện nếu value của element đang = 1 và đang là element của "Người lớn" thì thoát không cho giảm
    return;
  }
  currentValue--;
  slot++;
  let itemsInfoChildren = infoItemHTML.querySelectorAll(
    '.item__list-customer .item__detail-customer'
  ); // Lấy cách thẻ thành phần trong list
  itemsInfoChildren[itemsInfoChildren.length - 1].remove();
  if (currentValue === 0) {
    currentValue = 0;
    parentHTML.classList.add('no-active'); // Thêm class disable
    infoItemHTML.classList.remove('show'); // Xóa class hiện list khách hàng
    itemPrice.classList.add('hide');
  }
  itemHTML.dataset.value = currentValue;
  itemHTML.innerText = currentValue;
};

let eventIncreaseSize = (itemHTML, parentHTML, infoItemHTML, itemPrice) => {
  let currentValue = parseInt(itemHTML.dataset.value);
  if (slot === 0) {
    return;
  }
  currentValue++;
  slot--;
  if (currentValue === 1) {
    parentHTML.classList.remove('no-active');
    infoItemHTML.classList.add('show');
    itemPrice.classList.remove('hide');
  }
  itemHTML.dataset.value = currentValue;
  itemHTML.innerText = currentValue;
  let itemsInfoChildren = infoItemHTML.querySelector('.item__list-customer');
  let type = infoItemHTML.dataset.type;

  itemsInfoChildren.innerHTML += `<div class="item__detail-customer" data-type="${type}">
    <div class="customer__name">
      <label for="">Họ tên:</label>
      <input type="text" name="" id="" placeholder="Nhập họ tên" class="customer__input-name">
    </div>
    <div class="customer__gender">
      <label for="">Giới tính</label>
      <select name="" id="" class="customer__input-gender">
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>
    </div>
    <div class="customer__birthday">
      <label for="">Ngày sinh:</label>
      <input type="date" name="" id="" class="customer__input-birthday">
    </div>
  </div>`;
};

let handleEventChangeSize = () => {
  let itemBoxCustomers = document.querySelectorAll('.member-box__item');
  let boxInfoCustomers = document.querySelectorAll('.customer-info__content');
  let itemsPriceBill = document.querySelectorAll('.customer-bill__item');
  // Gán sự kiện click cho mỗi item
  itemBoxCustomers.forEach((itemBoxCustomer, index) => {
    let buttonDiminish = itemBoxCustomer.querySelector(
      '.member-box__item-right .member-box__button-left'
    );
    let buttonIncrease = itemBoxCustomer.querySelector(
      '.member-box__item-right .member-box__button-right'
    );
    let currentValue = itemBoxCustomer.querySelector(
      '.member-box__current-value'
    );
    // Thêm sự kiện cho các nút
    buttonDiminish.addEventListener('click', () =>
      eventDiminishSize(
        currentValue,
        itemBoxCustomer,
        boxInfoCustomers[index],
        itemsPriceBill[index]
      )
    );
    buttonIncrease.addEventListener('click', () =>
      eventIncreaseSize(
        currentValue,
        itemBoxCustomer,
        boxInfoCustomers[index],
        itemsPriceBill[index]
      )
    );
  });
};

let loadEventHTML = () => {
  handleEventChangeSize();
};

// Hiển thị dữ liệu sau khi đã tải trang
window.onload = async () => {
  await loadHTML();
  loadEventHTML();
};
