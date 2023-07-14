const logoutButton = document.querySelector("#logout-button");

const orders = document.querySelector("#orders");
const users = document.querySelector("#users");
const categoryAdd = document.querySelector("#category-add");
const productAdd = document.querySelector("#product-add");

addAllEvents();

// addEventListener들을 묶어주는 코드
function addAllEvents() {
  logoutButton.addEventListener("click", onClickLogout);

  orders.addEventListener("click", onClickOrders);
  users.addEventListener("click", onClickUsers);
  categoryAdd.addEventListener("click", onClickCategoryAdd);
  productAdd.addEventListener("click", onClickProductAdd);
}

// TODO: 관리자 로그아웃 처리 필요
function onClickLogout() {
  alert("관리자 로그아웃 처리 필요");
}

function onClickOrders() {
  window.location.href = "/src/views/admin-orders/admin-orders.html";
}

function onClickUsers() {
  window.location.href = "/src/views/admin-users/admin-users.html";
}

function onClickCategoryAdd() {
  window.location.href = "/src/views/admin-category-add/admin-category-add.html";
}

function onClickProductAdd() {
  window.location.href = "/src/views/admin-product-add/admin-product-add.html";
}
