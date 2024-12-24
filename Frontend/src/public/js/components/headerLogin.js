let username = sessionStorage.getItem('username');
const header = document.querySelector('.header__content');
if (username) {
  let headerButtonBox = document.querySelector('.header__button');
  headerButtonBox.classList.add('hide');
  header.innerHTML += `<div class="header__infor-customer">
    <span class="icon">
        <i class="fa-solid fa-user"></i>
    </span>
    <span class="header__infor-customer-name"> ${username} </span>
    <span class="icon__logout"> 
        <i class="fa-solid fa-right-from-bracket"></i>
    </span>
    </div>`;
}
