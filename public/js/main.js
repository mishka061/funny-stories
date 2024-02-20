document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".sidebarBtn a");

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const category = encodeURIComponent(link.getAttribute("data-category"));
        window.location.href = "/category/" + category;
      });
    });
})