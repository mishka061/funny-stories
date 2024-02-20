document.addEventListener("DOMContentLoaded", function () {
    const rejectBtn = document.querySelectorAll(".RejectBtn");

    for(let i = 0; i < rejectBtn.length; i++){
        rejectBtn[i].addEventListener('click', function(){
            let parrent = rejectBtn[i].parentElement.nextElementSibling
            parrent.style.display = 'block';
            rejectBtn[i].style.display = 'none';
        })
    }
})