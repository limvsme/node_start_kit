
function addRowControls(row) {
  const plusBtn = row.querySelector(".fa-sharp.fa-solid.fa-circle-plus.fa-lg");
  const minusBtn = row.querySelector(".fa-sharp.fa-solid.fa-circle-minus.fa-lg");
  const itemQuantity = row.querySelector(".quantity");
  const totalPriceElement = row.querySelector(".total-list");
  const priceElement = row.querySelector(".price-list");

  function removeComma(str) {
    return str.replace(/,/g, '');
  }

  function calculateTotal() {
    let price = parseFloat(removeComma(priceElement.textContent));
    let quantity = parseInt(itemQuantity.value);
    let total = price * quantity;
    return total;
  }

  function updateTotal() {
    let total = calculateTotal();
    totalPriceElement.textContent = total.toLocaleString("ko-KR") + "원";

    const lowerEmptyPrice = document.querySelector(".lower-emptyprice");
    const lowerTotal = document.querySelector(".lower-emptytotal");
    const rows = document.querySelectorAll(".cart-container");
    let totalSum = 0;
    rows.forEach((row) => {
      const rowTotalElement = row.querySelector(".total-list");
      totalSum += parseFloat(removeComma(rowTotalElement.textContent));
    });
    lowerEmptyPrice.textContent = totalSum.toLocaleString("ko-KR") + "원";
    lowerTotal.textContent = totalSum.toLocaleString("ko-KR") + "원";
  }

  function increaseQuantity() {
    itemQuantity.value = parseInt(itemQuantity.value) + 1;
    updateTotal();
  }

  function decreaseQuantity() {
    if (itemQuantity.value === "1") {
      return;
    }
    itemQuantity.value = parseInt(itemQuantity.value) - 1;
    updateTotal();
  }

  plusBtn.addEventListener("click", increaseQuantity);
  minusBtn.addEventListener("click", decreaseQuantity);
  itemQuantity.addEventListener("input", updateTotal);
  itemQuantity.addEventListener("blur", updateTotal);

  updateTotal();
}

const rows = document.querySelectorAll(".cart-container");
rows.forEach((row) => {
  addRowControls(row);
});

let isValid = true;
const itemQuantity = document.querySelector(".quantity");
itemQuantity.addEventListener("input", (event) => {
  const value = event.target.value;
  if (/^\d+$/.test(value) === false) {
    if (isValid) {
      alert("숫자를 입력해주세요!");
      isValid = false;
    }
    itemQuantity.value = 1;
  } else {
    isValid = true;
  }
});
itemQuantity.addEventListener("blur", () => {
  isValid = true;
});


/* 체크박스 개별 상품 선택기능 */
const selectEach = document.querySelectorAll('#select-each');

selectEach.forEach((checkbox) => {
  checkbox.addEventListener('click', function () {
    const row = this.parentNode.parentNode;
    if (this.checked) {
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }
  });
});

/* 체크박스 전체 선택 기능 */
const selectAll = document.querySelector("#select-all");
selectAll.addEventListener("click", toggleCheckbox);

function toggleCheckbox() {
  const selectEach = document.querySelectorAll('#select-each');
  selectEach.forEach((checkbox) => {
    checkbox.checked = selectAll.checked;
    const row = checkbox.parentNode.parentNode;
    if (selectAll.checked) {
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }
  });
}

// 삭제버튼 클릭이벤트
const deleteModal = document.querySelector(".delete-modal");
const deleteQuantityElement = deleteModal.querySelector(".variable-quantity");


function deleteItem() {
  const selectedRows = document.querySelectorAll(".selected");
  if (selectedRows.length > 0) {
    deleteModal.classList.add("show");
    body.style.overflow = "hidden";
  } else {
    noModal.classList.add("show");
    body.style.overflow = "hidden";
  }
}
const deleteBtn = document.querySelector(".del-btn");
deleteBtn.addEventListener("click", deleteItem);


// 구매하기 클릭 이벤트
const body = document.querySelector('body');
const orderModal = document.querySelector('.order-modal');
const variableQuantityElement = orderModal.querySelector('.variable-quantity');
const noModal = document.querySelector(".no-modal");

function purchaseItem() {
  const selectedRows = document.querySelectorAll('.selected');
  if (selectedRows.length > 0) {
    const selectedQuantities = Array.from(selectedRows).map((row) => {
      const quantityElement = row.querySelector('.quantity');
      return parseInt(quantityElement.value);
    });
    const totalQuantity = selectedQuantities.reduce((acc, cur) => acc + cur, 0);
    variableQuantityElement.textContent = totalQuantity;
    orderModal.classList.add('show');
    body.style.overflow = 'hidden';
  } else {
    noModal.classList.add("show");
    body.style.overflow = "hidden";
  } 
}

const orderBtn = document.querySelector(".pur-btn");
orderBtn.addEventListener("click", purchaseItem);


// 전체상품 구매하기 클릭이벤트 
const allModal = document.querySelector(".all-modal");

function purchaseAll() {
  const selectedRows = document.querySelectorAll(".selected");
  if (selectedRows.length > 0) {
    allModal.classList.add("show");
    body.style.overflow = "hidden";
  } else {
    noModal.classList.add("show");
    body.style.overflow = "hidden";
  }
}

const allOrderBtn = document.querySelector(".confirm-btn");
allOrderBtn.addEventListener("click", purchaseAll);


// no-modal 확인 버튼 클릭 이벤트
const noModalProcessBtn = document.querySelector("#no-popup-process");
noModalProcessBtn.addEventListener("click", () => {
  noModal.classList.remove("show");
  body.style.overflow = "auto";
});


// delete-modal 클릭 이벤트
function closeDelModal() {
  deleteModal.classList.remove("show");
  body.style.overflow = "auto";
}

function deleteProcess() {
  const selectedRows = document.querySelectorAll(".selected");
  selectedRows.forEach((row) => {
    row.remove();
    closeDelModal();
  });
    displayUpdate();
}

function displayUpdate() {
  const updatedItemCheckbox = document.querySelectorAll('#select-each');
  const emptyCart = document.querySelector(".empty-cart")
  if (updatedItemCheckbox.length === 0) {
    emptyCart.style.display = "flex";
  } else {
    emptyCart.style.display = "none";
  }
} 

const deleteCancel = document.querySelector("#delete-popup-cancel");
deleteCancel.addEventListener("click", closeDelModal);

const deleteYes = document.querySelector("#delete-popup-process");
deleteYes.addEventListener("click", deleteProcess);

// order-modal 클릭 이벤트 
function closeOrderModal() {
  orderModal.classList.remove("show");
  body.style.overflow = "auto";
}

function processModal() {
  window.location.href = ("src/views/payment/payment.html");
}

const orderCancel = document.querySelector("#order-popup-cancel");
orderCancel.addEventListener("click", closeOrderModal);

const orderProcess = document.querySelector("#order-popup-process");
orderProcess.addEventListener("click", processModal);

/* all-modal 클릭 이벤트 */
function closeAllModal() {
  allModal.classList.remove("show");
  body.style.overflow = "auto";
}

const allCancelBtn = document.querySelector("#all-popup-cancel");
allCancelBtn.addEventListener("click", closeAllModal);

const allProcessBtn = document.querySelector("#all-popup-process");
allProcessBtn.addEventListener("click", processModal);







