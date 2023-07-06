// 이 화면의 동작
// 1. '오늘' 버튼이 기본 설정이며, 주문 내역이 없으면 테이블에 '주문내역이 없습니다.'라는 문구만 표시
// 2. 주문 내역이 있다면 동적으로 row를 생성해서 배치하며, 한 번에 최대 4개까지 배치
// 2-1. 동적 생성시에 각 row의 배송정보수정, 주문취소 버튼의 이벤트리스너 등록시에 해당 주문의 번호를 인자로 널어, 버튼 클릭시에 각 주문번호에 맞게 대응할 수 있도록 함.
// 3. 주문 내역이 5건 이상이라면 하단에 그 넘어간 수만큼 페이지를 이동할 수 있는 숫자 버튼 표시

const filterButtonList = document.querySelectorAll(".button.is-outlined");

addAllEvents();

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
  alert(id);
}
