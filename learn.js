// ================= MOBILE SIDEBAR =================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const closeSidebar = document.getElementById("closeSidebar");


menuToggle.addEventListener("click", function () {

    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");

});


closeSidebar.addEventListener("click", function () {

    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");

});


sidebarOverlay.addEventListener("click", function () {

    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");

});


// ================= CLOSE SIDEBAR AFTER LINK CLICK =================

const sidebarLinks = document.querySelectorAll(".sidebar-links a");

sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");

    });

});


// ================= SCROLL ANIMATION =================

const cards = document.querySelectorAll(
    ".learning-card, .step, .spending-card"
);

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach(function (card) {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});