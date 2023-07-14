function home() {
    window.location.href = "src/views/index/index.html";
  }
  
  function previous() {
    window.history.back();
  }
  
  const homeBtn = document.querySelector(".home");
  homeBtn.addEventListener("click", home);
  
  const previousBtn = document.querySelector(".previous");
  previousBtn.addEventListener("click", previous);
  