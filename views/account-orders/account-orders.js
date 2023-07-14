import setNav from "/src/views/nav/nav.js";
import { setThousandsSeparator } from "/src/views/utils.js";

const filterButtonList = document.querySelectorAll(".button.is-outlined");
const filterRangeList = [1, 8, 31, 91]; // keyDate가 오늘날짜이면 keyDate <= today는 true지만 keyDate >= endDate가 false로 떨어져서 하루씩 더 뺌.
const orderListBody = document.querySelector("#order-list-body");
const emptyMessage = document.querySelector("#empty-message");

let jsonData;
let rowList = [];

setNav(false);
addAllEvents();
requestOrderData();

// addEventListener들을 묶어주는 코드
function addAllEvents() {
  // 각 기간별 버튼의 click 이벤트 인자로 고유의 id를 넣는다
  for (let i = 0; i < filterButtonList.length; ++i)
    filterButtonList[i].addEventListener("click", (e) => {
      onClickFilterButton(i);
    });
}

// 필터 버튼 처리
function onClickFilterButton(id) {
  setFilterButtonStyle(id);

  let today = new Date(); // const로 저장하지 않은 이유는 사용자가 화면을 보던 도중에 0시가 넘을 가능성이 있기 때문에. 그래서 필터 버튼이 눌릴 때마다 오늘날짜를 가져온다.
  let endDate = new Date(today);
  endDate.setDate(today.getDate() - filterRangeList[id]);

  console.log("today:" + today.toLocaleDateString() + " / endDate : " + endDate.toLocaleDateString());

  //let today2 = new Date("2023-07-13");
  // console.log(today > today2);
  // console.log(today >= today2); //////
  // console.log(today < today2);
  // console.log(today <= today2);
  // console.log(endDate > today2);
  // console.log(endDate >= today2);
  // console.log(endDate < today2);
  // console.log(endDate <= today2); //////

  let flag = true;
  for (const row of rowList) {
    let keyDate = new Date(row.date);

    if (keyDate <= today && keyDate >= endDate) {
      row.tr.style.display = "table-row";
      flag = false;
    } else {
      row.tr.style.display = "none";
    }
  }

  showEmptyMessage(flag);
}

function setFilterButtonStyle(id) {
  // 버튼의 스타일을 바꿔 선택 상태를 표시한다.
  for (let i = 0; i < filterButtonList.length; ++i) {
    if (i == id) {
      filterButtonList[i].style.color = "white";
      filterButtonList[i].style.background = "#6454e8";
    } else {
      filterButtonList[i].style.color = "#6454e8";
      filterButtonList[i].style.background = "white";
    }
  }
}

// TODO: 더미데이터 지우고 서버요청 보내야함
async function requestOrderData() {
  // 임시로 더미 json 파일 가져다가 화면에 표시
  try {
    const response = await fetch("dummy-orders.json");
    jsonData = await response.json();
    //console.log(data);

    if (jsonData.dummyData && jsonData.dummyData.length > 0) {
      for (const order of jsonData.dummyData) {
        createRow(order);
      }

      showEmptyMessage(false);

      // 오늘 버튼을 포커스 상태로 설정
      onClickFilterButton(0);
    } else {
      showEmptyMessage(true);
    }
  } catch (error) {
    //console.log("Error:", error);
    showEmptyMessage(true);
  }
}

function createRow(order) {
  // 날짜
  let dateCell = document.createElement("td");
  dateCell.textContent = order.orderDate;

  // 주문정보
  let productListCell = document.createElement("td");
  let temp = "";
  order.orderProductList.forEach((product) => {
    temp += `${product.name} / ${product.count}권<br>`;
  });
  //console.log(temp);
  productListCell.innerHTML = temp;

  // 주문총액
  let totalPriceCell = document.createElement("td");
  totalPriceCell.textContent = `${setThousandsSeparator(order.orderTotalPrice)}원`;

  // 상태
  let stateCell = document.createElement("td");
  stateCell.textContent = order.orderState;

  // 신청
  let requestCell = document.createElement("td");
  let editShippingDataButton = document.createElement("button");
  let cancelOrderButton = document.createElement("button");
  editShippingDataButton.className = "button is-rounded";
  editShippingDataButton.innerText = "배송정보 수정";
  editShippingDataButton.style.marginBottom = "10px";
  cancelOrderButton.className = "button is-rounded";
  cancelOrderButton.innerText = "주문 취소";
  requestCell.appendChild(editShippingDataButton);
  requestCell.appendChild(document.createElement("br"));
  requestCell.appendChild(cancelOrderButton);

  let newRow = document.createElement("tr");
  newRow.appendChild(dateCell);
  newRow.appendChild(productListCell);
  newRow.appendChild(totalPriceCell);
  newRow.appendChild(stateCell);
  newRow.appendChild(requestCell);

  orderListBody.appendChild(newRow);

  rowList.push({ id: order.orderId, date: order.orderDate, tr: newRow });
}

// 주문 내역이 없거나 데이터를 제대로 가져오지 못했다면, "주문 내역이 없습니다" 메세지를 표시한다.
function showEmptyMessage(flag) {
  emptyMessage.style.display = flag ? "table-cell" : "none";
}
