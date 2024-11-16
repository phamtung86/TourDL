let btnNavLink = document.querySelectorAll('.nav__link');
// console.log({ btnNavLink });
btnNavLink.forEach((item) => {
  item.addEventListener('click', redirectPage);
});

function redirectPage(event) {
  event.stopPropagation();
  let link = event.target.dataset.link;
  window.location.href = `${link}`;
}
