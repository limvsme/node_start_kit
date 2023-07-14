const searchBtn = document.querySelector(".post-search")

function searchPost() {
    new daum.Postcode({
      oncomplete: function(data) {
        let address = '';
        let postNum = data.zonecode;
        
        if (data.userSelectedType === 'R') {
          address = data.roadAddress;
        } else {
          address = data.jibunAddress;
        }
        
        document.querySelector('.first-address').value = address;
        document.querySelector('.post-input').value = postNum;
      }
    }).open();
  }
  
  searchBtn.addEventListener("click", searchPost);

  