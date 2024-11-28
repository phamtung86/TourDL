// Render data after load success load page
/*
window.onload = function () {
  chartArtTopToup();
  chartArtTourHas();
};
*/

// Variables
const tourList = document.querySelector('.tour-list__item-container');

// Function get api
let resTourList = async () => {
  try {
    let res = await axios.get(`${URL_API_SERVER_V1}/tours/page`);
    res = res.data;
    console.log(res);
    return { status: 0, data: res };
  } catch (error) {
    return { status: 3, message: 'Hệ thống website hiện đang bị lỗi' };
  }
};
// Function render HTML
let renderTourList = async () => {
  let res = await resTourList();
  if (res.status !== 0) {
    alert(res.message);
    tourList.innerHTML = `<h4>${res.message}</h4>`;
  }
  //   tourList.innerHTML;
};

const loadHTML = async () => {
  await renderTourList();
};

window.onload = function () {
  loadHTML();
};
