/* =========================
   MOBILE SIDEBAR
========================= */

const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");


function openSidebar() {

    sidebar.classList.add("open");
    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeSideMenu() {

    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";
}


menuToggle.addEventListener("click", openSidebar);

closeSidebar.addEventListener("click", closeSideMenu);

sidebarOverlay.addEventListener("click", closeSideMenu);


document.querySelectorAll(".sidebar-links a").forEach(link => {

    link.addEventListener("click", closeSideMenu);

});


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactFormElement");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const topic =
        document.getElementById("topic").value;

    const message =
        document.getElementById("message").value.trim();

    const agreement =
        document.getElementById("agreement").checked;


    if (
        name === "" ||
        email === "" ||
        topic === "" ||
        message === "" ||
        !agreement
    ) {

        formMessage.textContent =
            "Please complete all required fields.";

        formMessage.className =
            "form-message error";

        return;
    }


    formMessage.textContent =
        "Your message has been submitted successfully!";

    formMessage.className =
        "form-message success";


    contactForm.reset();

});


/* =========================
   FAQ ACCORDION
========================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

    question.addEventListener("click", function() {

        const currentItem =
            this.parentElement;


        document.querySelectorAll(".faq-item").forEach(item => {

            if (item !== currentItem) {
                item.classList.remove("active");
            }

        });


        currentItem.classList.toggle("active");

    });

});