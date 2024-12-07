let resAPIInfo = async () => {
  let userId = sessionStorage.getItem('userID');
  let res = await axios.get(`http://localhost:3124/api/v1/users/${userId}`);
  //   Chưa validation
  return res.data.data;
};

let loadHTML = async () => {
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

// Hiển thị dữ liệu sau khi đã tải trang
window.onload = async () => {
  await loadHTML();
  // loadEventHTML();
};
