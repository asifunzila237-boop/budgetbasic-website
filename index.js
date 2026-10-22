const mobileMenu = document.getElementById('mobileMenu');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeBtn = document.getElementById('closeBtn');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');


// =========================================================
// SIDEBAR
// =========================================================

// Open Sidebar
function openSidebar() {
    sidebarMenu.classList.add('active');
    sidebarOverlay.classList.add('active');
}

// Close Sidebar
function closeSidebar() {
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
}


// Sidebar controls
mobileMenu.onclick = openSidebar;
closeBtn.onclick = closeSidebar;
sidebarOverlay.onclick = closeSidebar;


// Close sidebar automatically when a link inside is clicked
sidebarLinks.forEach(link => {
    link.onclick = closeSidebar;
});



/* =========================================================
   VIDEO PLAY / PAUSE TOGGLE
========================================================= */

const budgetVideo = document.getElementById("budgetVideo");
const videoToggle = document.getElementById("videoToggle");

if (budgetVideo && videoToggle) {

    videoToggle.addEventListener("click", () => {

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



/* =========================================================
   BUDGETBASICS — TESTIMONIAL CAROUSEL
   10 TESTIMONIALS / 10 SECOND CYCLE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".bb-testimonial-card");
    const avatar = document.querySelector(".bb-avatar");
    const studentName = document.querySelector(".bb-student-info strong");
    const studentRole = document.querySelector(".bb-student-info span");
    const quote = document.querySelector(".bb-quote");
    const progressBar = document.querySelector(".bb-progress-bar");
    const currentCounter = document.querySelector(".bb-current");


    if (
        !card ||
        !avatar ||
        !studentName ||
        !studentRole ||
        !quote ||
        !progressBar
    ) {
        return;
    }



    /* =====================================================
       TESTIMONIALS
    ===================================================== */

    const testimonials = [

        {
            name: "Ayaan",
            role: "Web Development Learner",
            quote: "BudgetBasics made tracking expenses and understanding financial fundamentals so simple and practical.",
            initial: "A"
        },

        {
            name: "Sarah",
            role: "Computer Science Student",
            quote: "I finally understood where my money was going and how small spending habits can make a difference.",
            initial: "S"
        },

        {
            name: "Hamza",
            role: "College Student",
            quote: "The lessons are straightforward and actually useful. Budgeting doesn't feel confusing anymore.",
            initial: "H"
        },

        {
            name: "Maya",
            role: "Business Student",
            quote: "BudgetBasics helped me organize my expenses and become much more aware of my everyday spending.",
            initial: "M"
        },

        {
            name: "Daniel",
            role: "University Student",
            quote: "Everything is explained in a way that makes financial concepts much easier to understand.",
            initial: "D"
        },

        {
            name: "Zoya",
            role: "Design Student",
            quote: "I liked how practical everything was. I could immediately apply what I learned to my own budget.",
            initial: "Z"
        },

        {
            name: "Ali",
            role: "Software Engineering Student",
            quote: "The simple explanations helped me understand budgeting without feeling overwhelmed by financial terms.",
            initial: "A"
        },

        {
            name: "Emma",
            role: "College Learner",
            quote: "BudgetBasics gave me a much clearer idea of how to manage my money and plan my expenses.",
            initial: "E"
        },

        {
            name: "Usman",
            role: "Student & Freelancer",
            quote: "Learning how to separate needs from wants completely changed the way I look at my spending.",
            initial: "U"
        },

        {
            name: "Noor",
            role: "Finance Learner",
            quote: "It's simple, practical, and easy to follow. I actually enjoy learning about money now.",
            initial: "N"
        }

    ];



    /* =====================================================
       SETTINGS
    ===================================================== */

    const SLIDE_DURATION = 10000;
    const FADE_DURATION = 450;

    let currentIndex = 0;

    let timer = null;

    let isPaused = false;

    let startTime = 0;
    let elapsedTime = 0;



    /* =====================================================
       UPDATE TESTIMONIAL
    ===================================================== */

    function updateTestimonial(index) {

        const item = testimonials[index];

        avatar.textContent = item.initial;

        studentName.textContent = item.name;

        studentRole.textContent = item.role;

        quote.textContent = `“${item.quote}”`;

        if (currentCounter) {

            currentCounter.textContent =
                String(index + 1).padStart(2, "0");

        }

    }



    /* =====================================================
       GET SLIDER DISTANCE

       Slider = 10% width.
       It travels from 0 → 90%.
    ===================================================== */

    function getTravelDistance() {

        const trackWidth =
            progressBar.parentElement.offsetWidth;

        const sliderWidth =
            progressBar.offsetWidth;

        return trackWidth - sliderWidth;

    }



    /* =====================================================
       START SLIDER
    ===================================================== */

    function startSlider(
        remaining = SLIDE_DURATION
    ) {

        const distance =
            getTravelDistance();

        const progress =
            elapsedTime / SLIDE_DURATION;

        const currentPosition =
            distance * progress;


        progressBar.style.transition =
            "none";

        progressBar.style.transform =
            `translateX(${currentPosition}px)`;


        /* Force browser reflow */

        progressBar.offsetHeight;


        if (!isPaused) {

            const remainingDistance =
                distance - currentPosition;

            const speed =
                remainingDistance / remaining;


            progressBar.style.transition =
                `transform ${remaining}ms linear`;

            progressBar.style.transform =
                `translateX(${distance}px)`;


            startTime =
                performance.now() - elapsedTime;


            timer = setTimeout(() => {

                if (!isPaused) {

                    nextTestimonial();

                }

            }, remaining);

        }

    }



    /* =====================================================
       PAUSE

       Freezes at EXACT current position.
    ===================================================== */

    function pauseSlider() {

        if (isPaused) return;

        isPaused = true;

        clearTimeout(timer);


        const now =
            performance.now();


        elapsedTime =
            Math.min(
                now - startTime,
                SLIDE_DURATION
            );


        const distance =
            getTravelDistance();


        const progress =
            elapsedTime / SLIDE_DURATION;


        const currentPosition =
            distance * progress;


        progressBar.style.transition =
            "none";

        progressBar.style.transform =
            `translateX(${currentPosition}px)`;

    }



    /* =====================================================
       RESUME
    ===================================================== */

    function resumeSlider() {

        if (!isPaused) return;

        isPaused = false;


        const remaining =
            Math.max(
                SLIDE_DURATION - elapsedTime,
                0
            );


        startSlider(remaining);

    }



    /* =====================================================
       NEXT TESTIMONIAL
    ===================================================== */

    function nextTestimonial() {

        clearTimeout(timer);

        isPaused = false;

        elapsedTime = 0;


        /* -----------------------------
           LEAVE
        ----------------------------- */

        card.classList.remove(
            "is-visible"
        );

        card.classList.add(
            "is-leaving"
        );


        setTimeout(() => {

            currentIndex++;


            if (
                currentIndex >=
                testimonials.length
            ) {

                currentIndex = 0;

            }



            /* -----------------------------
               UPDATE CONTENT
            ----------------------------- */

            updateTestimonial(
                currentIndex
            );



            /* -----------------------------
               RESET CARD
            ----------------------------- */

            card.classList.remove(
                "is-leaving"
            );

            card.classList.add(
                "is-entering"
            );



            /* -----------------------------
               RESET SLIDER
            ----------------------------- */

            progressBar.style.transition =
                "none";

            progressBar.style.transform =
                "translateX(0)";


            /* Force reflow */

            progressBar.offsetHeight;



            /* -----------------------------
               ENTER
            ----------------------------- */

            requestAnimationFrame(() => {

                card.classList.remove(
                    "is-entering"
                );

                card.classList.add(
                    "is-visible"
                );

            });



            /* -----------------------------
               NEW 10 SECOND CYCLE
            ----------------------------- */

            startTime =
                performance.now();

            elapsedTime = 0;

            startSlider(
                SLIDE_DURATION
            );


        }, FADE_DURATION);

    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateTestimonial(
        currentIndex
    );


    card.classList.add(
        "is-visible"
    );


    progressBar.style.transition =
        "none";

    progressBar.style.transform =
        "translateX(0)";


    requestAnimationFrame(() => {

        startTime =
            performance.now();

        elapsedTime = 0;

        startSlider(
            SLIDE_DURATION
        );

    });



    /* =====================================================
       HOVER PAUSE
    ===================================================== */

    card.addEventListener(
        "mouseenter",
        () => {

            pauseSlider();

        }
    );



    /* =====================================================
       HOVER RESUME
    ===================================================== */

    card.addEventListener(
        "mouseleave",
        () => {

            resumeSlider();

        }
    );

});




/* =========================================================
   MONEY MISTAKES VIDEO — PLAY / PAUSE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const moneyMistakesVideo =
        document.getElementById("moneyMistakesVideo");

    const moneyMistakesVideoToggle =
        document.getElementById("moneyMistakesVideoToggle");

    if (
        !moneyMistakesVideo ||
        !moneyMistakesVideoToggle
    ) {
        return;
    }


    const pauseIcon =
        moneyMistakesVideoToggle.querySelector(".pause-icon");

    const playIcon =
        moneyMistakesVideoToggle.querySelector(".play-icon");


    function updateMoneyMistakesVideoButton() {

        if (
            moneyMistakesVideo.paused ||
            moneyMistakesVideo.ended
        ) {

            moneyMistakesVideoToggle.classList.add(
                "paused"
            );

            moneyMistakesVideoToggle.setAttribute(
                "aria-label",
                "Play video"
            );


            if (pauseIcon) {
                pauseIcon.style.display = "none";
            }

            if (playIcon) {
                playIcon.style.display = "block";
            }

        } else {

            moneyMistakesVideoToggle.classList.remove(
                "paused"
            );

            moneyMistakesVideoToggle.setAttribute(
                "aria-label",
                "Pause video"
            );


            if (pauseIcon) {
                pauseIcon.style.display = "block";
            }

            if (playIcon) {
                playIcon.style.display = "none";
            }

        }

    }


    moneyMistakesVideoToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            if (moneyMistakesVideo.paused) {

                const playPromise =
                    moneyMistakesVideo.play();


                if (
                    playPromise !== undefined
                ) {

                    playPromise
                        .then(
                            updateMoneyMistakesVideoButton
                        )
                        .catch(
                            updateMoneyMistakesVideoButton
                        );

                } else {

                    updateMoneyMistakesVideoButton();

                }

            } else {

                moneyMistakesVideo.pause();

                updateMoneyMistakesVideoButton();

            }

        }
    );


    moneyMistakesVideo.addEventListener(
        "play",
        updateMoneyMistakesVideoButton
    );


    moneyMistakesVideo.addEventListener(
        "pause",
        updateMoneyMistakesVideoButton
    );


    moneyMistakesVideo.addEventListener(
        "ended",
        updateMoneyMistakesVideoButton
    );


    updateMoneyMistakesVideoButton();

});



/* =========================================================
   BUDGETBASICS AI ASSISTANT
========================================================= */

(function () {

    "use strict";


    function initBudgetBasicsAI() {

        /* =================================================
           ELEMENTS
        ================================================= */

        const launcher =
            document.getElementById(
                "aiAssistantLauncher"
            );

        const panel =
            document.getElementById(
                "aiAssistantPanel"
            );

        const backdrop =
            document.getElementById(
                "aiAssistantBackdrop"
            );

        const closeButton =
            document.getElementById(
                "aiAssistantClose"
            );

        const form =
            document.getElementById(
                "aiAssistantForm"
            );

        const input =
            document.getElementById(
                "aiAssistantInput"
            );

        const messages =
            document.getElementById(
                "aiAssistantMessages"
            );

        const quickStart =
            document.getElementById(
                "aiQuickStart"
            );


        /* =================================================
           CHECK
        ================================================= */

        if (
            !launcher ||
            !panel ||
            !backdrop ||
            !closeButton ||
            !form ||
            !input ||
            !messages
        ) {
            return;
        }


        /* =================================================
           OPEN
        ================================================= */

        function openAssistant() {

            launcher.classList.add("active");

            panel.classList.add("active");

            backdrop.classList.add("active");

            launcher.setAttribute(
                "aria-expanded",
                "true"
            );

            panel.setAttribute(
                "aria-hidden",
                "false"
            );

            backdrop.setAttribute(
                "aria-hidden",
                "false"
            );

            setTimeout(function () {

                input.focus();

            }, 200);
        }


        /* =================================================
           CLOSE
        ================================================= */

        function closeAssistant() {

            launcher.classList.remove("active");

            panel.classList.remove("active");

            backdrop.classList.remove("active");

            launcher.setAttribute(
                "aria-expanded",
                "false"
            );

            panel.setAttribute(
                "aria-hidden",
                "true"
            );

            backdrop.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        /* =================================================
           LAUNCHER
        ================================================= */

        launcher.addEventListener(
            "click",
            function () {

                if (
                    panel.classList.contains("active")
                ) {

                    closeAssistant();

                } else {

                    openAssistant();

                }

            }
        );


        /* =================================================
           CLOSE BUTTON
        ================================================= */

        closeButton.addEventListener(
            "click",
            function () {

                closeAssistant();

            }
        );


        /* =================================================
           BACKDROP
        ================================================= */

        backdrop.addEventListener(
            "click",
            function () {

                closeAssistant();

            }
        );


        /* =================================================
           SCROLL
        ================================================= */

        function scrollMessages() {

            messages.scrollTop =
                messages.scrollHeight;
        }


        /* =================================================
           USER MESSAGE
        ================================================= */

        function addUserMessage(text) {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "ai-message ai-message-user";


            const avatar =
                document.createElement("div");

            avatar.className =
                "ai-message-avatar";

            avatar.textContent =
                "You";


            const bubble =
                document.createElement("div");

            bubble.className =
                "ai-message-bubble";

            bubble.textContent =
                text;


            wrapper.appendChild(avatar);

            wrapper.appendChild(bubble);

            messages.appendChild(wrapper);

            scrollMessages();
        }


        /* =================================================
           BOT MESSAGE
        ================================================= */

        function addBotMessage(text) {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "ai-message ai-message-bot";


            const avatar =
                document.createElement("div");

            avatar.className =
                "ai-message-avatar";

            avatar.textContent =
                "AI";


            const bubble =
                document.createElement("div");

            bubble.className =
                "ai-message-bubble";

            bubble.textContent =
                text;


            wrapper.appendChild(avatar);

            wrapper.appendChild(bubble);

            messages.appendChild(wrapper);

            scrollMessages();
        }


        /* =================================================
           TYPING
        ================================================= */

        function showTyping() {

            if (
                document.getElementById(
                    "aiTypingIndicator"
                )
            ) {
                return;
            }


            const typing =
                document.createElement("div");

            typing.className =
                "ai-typing";

            typing.id =
                "aiTypingIndicator";


            const avatar =
                document.createElement("div");

            avatar.className =
                "ai-message-avatar";

            avatar.textContent =
                "AI";


            const dots =
                document.createElement("div");

            dots.className =
                "ai-typing-dots";


            for (
                let i = 0;
                i < 3;
                i++
            ) {

                const dot =
                    document.createElement("span");

                dots.appendChild(dot);
            }


            typing.appendChild(avatar);

            typing.appendChild(dots);

            messages.appendChild(typing);

            scrollMessages();
        }


        /* =================================================
           REMOVE TYPING
        ================================================= */

        function removeTyping() {

            const typing =
                document.getElementById(
                    "aiTypingIndicator"
                );

            if (typing) {
                typing.remove();
            }
        }


        /* =================================================
           BUDGETBASICS RESPONSES
        ================================================= */

        function getAssistantResponse(question) {

            const text =
                question
                    .toLowerCase()
                    .trim();


            /* ---------------------------------------------
               GREETINGS
            --------------------------------------------- */

            if (
                text === "hi" ||
                text === "hello" ||
                text === "hey" ||
                text.startsWith("hi ") ||
                text.startsWith("hello ") ||
                text.startsWith("hey ")
            ) {

                return (
                    "Hi! What would you like to learn about budgeting, saving, spending, or money habits?"
                );
            }


            /* ---------------------------------------------
               BUDGET
            --------------------------------------------- */

            if (
                text.includes("budget") ||
                text.includes("make a budget") ||
                text.includes("create a budget")
            ) {

                return (
                    "Start by listing your income and regular expenses. " +
                    "Then separate needs from wants and decide how much you want to save. " +
                    "A budget helps give every part of your money a purpose."
                );
            }


            /* ---------------------------------------------
               NEEDS VS WANTS
            --------------------------------------------- */

            if (
                (
                    text.includes("need") ||
                    text.includes("needs")
                ) &&
                (
                    text.includes("want") ||
                    text.includes("wants")
                )
            ) {

                return (
                    "A need is something important for everyday life, such as food, " +
                    "transport, or school supplies. A want is something you would like " +
                    "but can live without."
                );
            }


            /* ---------------------------------------------
               SAVING
            --------------------------------------------- */

            if (
                text.includes("save") ||
                text.includes("saving") ||
                text.includes("savings")
            ) {

                return (
                    "Start with a small amount that you can save regularly. " +
                    "Giving your savings a specific goal can make it easier to stay consistent."
                );
            }


            /* ---------------------------------------------
               SPENDING
            --------------------------------------------- */

            if (
                text.includes("spend") ||
                text.includes("spending") ||
                text.includes("shopping") ||
                text.includes("buy")
            ) {

                return (
                    "Before buying something, pause and ask whether you need it, " +
                    "whether it fits your budget, and whether you still want it after waiting a little."
                );
            }


            /* ---------------------------------------------
               EXPENSES
            --------------------------------------------- */

            if (
                text.includes("expense") ||
                text.includes("expenses")
            ) {

                return (
                    "Small expenses can add up quickly. Tracking everyday purchases " +
                    "can help you understand where your money is going."
                );
            }


            /* ---------------------------------------------
               SUBSCRIPTIONS
            --------------------------------------------- */

            if (
                text.includes("subscription") ||
                text.includes("subscriptions")
            ) {

                return (
                    "Review subscriptions regularly. If you are paying for something " +
                    "you rarely use, check whether it still belongs in your budget."
                );
            }


            /* ---------------------------------------------
               LATE PAYMENTS
            --------------------------------------------- */

            if (
                text.includes("late payment") ||
                text.includes("late payments") ||
                text.includes("bill")
            ) {

                return (
                    "Keeping track of payment dates can help you avoid late payments. " +
                    "Important due dates can be added to your budget or calendar."
                );
            }


            /* ---------------------------------------------
               MONEY MISTAKES
            --------------------------------------------- */

            if (
                text.includes("money mistake") ||
                text.includes("money mistakes") ||
                text.includes("mistake")
            ) {

                return (
                    "Common money mistakes include impulse buying, ignoring small expenses, " +
                    "late payments, unused subscriptions, and spending without a plan."
                );
            }


            /* ---------------------------------------------
               CALCULATORS
            --------------------------------------------- */

            if (
                text.includes("calculator") ||
                text.includes("calculate")
            ) {

                return (
                    "BudgetBasics has calculators for budgeting, savings, and needs versus wants. " +
                    "You can use the Calculators page to work through your numbers."
                );
            }


            /* ---------------------------------------------
               GENERAL MONEY
            --------------------------------------------- */

            if (
                text.includes("money") ||
                text.includes("finance") ||
                text.includes("financial")
            ) {

                return (
                    "I can help you understand budgeting, saving, spending, needs versus wants, " +
                    "expenses, subscriptions, and common money habits."
                );
            }


            /* ---------------------------------------------
               DEFAULT
            --------------------------------------------- */

            return (
                "I can help with budgeting, saving, spending, needs versus wants, " +
                "expenses, subscriptions, money mistakes, and everyday money questions."
            );
        }


        /* =================================================
           SEND MESSAGE
        ================================================= */

        function sendMessage(text) {

            const cleanText =
                text.trim();


            if (!cleanText) {
                return;
            }


            addUserMessage(
                cleanText
            );


            input.value = "";


            if (quickStart) {

                quickStart.style.display =
                    "none";
            }


            showTyping();


            setTimeout(function () {

                removeTyping();


                const response =
                    getAssistantResponse(
                        cleanText
                    );


                addBotMessage(
                    response
                );

            }, 700);
        }


        /* =================================================
           FORM SUBMIT
        ================================================= */

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                sendMessage(
                    input.value
                );

            }
        );


        /* =================================================
           QUICK QUESTIONS
        ================================================= */

        const quickButtons =
            document.querySelectorAll(
                ".ai-quick-button"
            );


        quickButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        button.getAttribute(
                            "data-question"
                        );

                    if (question) {

                        sendMessage(
                            question
                        );

                    }

                }
            );

        });


        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    panel.classList.contains("active")
                ) {

                    closeAssistant();

                }

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initBudgetBasicsAI
        );

    } else {

        initBudgetBasicsAI();

    }

})();