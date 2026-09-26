/* =====================================================
   BUDGETBASICS HOME PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

const mobileMenu = document.getElementById("mobileMenu");
const sidebarMenu = document.getElementById("sidebarMenu");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const closeBtn = document.getElementById("closeBtn");

const sidebarLinks =
    document.querySelectorAll(".sidebar-links a");


function openSidebar() {

    if (sidebarMenu) {
        sidebarMenu.classList.add("active");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";
}


function closeSidebar() {

    if (sidebarMenu) {
        sidebarMenu.classList.remove("active");
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("active");
    }

    document.body.style.overflow = "";
}


if (mobileMenu) {
    mobileMenu.addEventListener("click", openSidebar);
}


if (closeBtn) {
    closeBtn.addEventListener("click", closeSidebar);
}


if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
}


sidebarLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        closeSidebar();

    });

});


/* =====================================================
   VIDEO PLAY / PAUSE
===================================================== */

const budgetVideo =
    document.getElementById("budgetVideo");

const videoToggle =
    document.getElementById("videoToggle");


if (budgetVideo && videoToggle) {

    videoToggle.addEventListener("click", function() {

        if (budgetVideo.paused) {

            budgetVideo.play();

            videoToggle.classList.remove("paused");

            videoToggle.setAttribute(
                "aria-label",
                "Pause video"
            );

        } else {

            budgetVideo.pause();

            videoToggle.classList.add("paused");

            videoToggle.setAttribute(
                "aria-label",
                "Play video"
            );

        }

    });

}


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(
    ".literacy-card, .budgeting-point, .needs-wants-point, .budgeting-basics-image, .needs-wants-image"
);


revealElements.forEach(function(element) {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(

        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function(element) {

    revealObserver.observe(element);

});


/* =====================================================
   ESC KEY CLOSE SIDEBAR
===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeSidebar();

    }

});


/* =====================================================
   ACTIVE NAVBAR LINK
===================================================== */

const currentPage =
    window.location.pathname.split("/").pop();


const navLinks =
    document.querySelectorAll(".nav-links a");


navLinks.forEach(function(link) {

    const linkPage =
        link.getAttribute("href");

    if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
    ) {

        link.classList.add("active");

    }

});