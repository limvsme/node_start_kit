function checkbox() {
    let check_all = document.querySelector(".select-all");
    check_all.addEventListener("click", function(e) {
        e.preventDefault();
        check_all.style.backgroundColor = "yellow";
    });
}