/* =========================================================
   BUDGETBASICS CALCULATORS
========================================================= */


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const mobileMenu = document.getElementById("mobileMenu");
const sidebarMenu = document.getElementById("sidebarMenu");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const closeBtn = document.getElementById("closeBtn");
const sidebarLinks = document.querySelectorAll(".sidebar-links a");


function openSidebar() {
    sidebarMenu.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.classList.add("menu-open");
}


function closeSidebar() {
    sidebarMenu.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
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


sidebarLinks.forEach(link => {
    link.addEventListener("click", closeSidebar);
});


/* =========================================================
   BUDGET CALCULATOR
   INCOME - EXPENSES = MONEY LEFT
========================================================= */

const incomeInput = document.getElementById("income");
const expensesInput = document.getElementById("expenses");
const budgetCalculate = document.getElementById("budgetCalculate");
const remainingAmount = document.getElementById("remainingAmount");


function calculateBudget() {

    const income =
        parseFloat(incomeInput.value) || 0;

    const expenses =
        parseFloat(expensesInput.value) || 0;

    const remaining =
        income - expenses;


    remainingAmount.textContent =
        "$" + remaining.toFixed(2);
}


if (budgetCalculate) {
    budgetCalculate.addEventListener(
        "click",
        calculateBudget
    );
}


/* =========================================================
   SAVINGS CALCULATOR
   GOAL / MONTHLY SAVING = MONTHS
========================================================= */

const goalAmount = document.getElementById("goalAmount");
const monthlySaving = document.getElementById("monthlySaving");
const savingsCalculate = document.getElementById("savingsCalculate");
const savingMonths = document.getElementById("savingMonths");


function calculateSavings() {

    const goal =
        parseFloat(goalAmount.value) || 0;

    const monthly =
        parseFloat(monthlySaving.value) || 0;


    if (goal <= 0) {

        savingMonths.textContent =
            "Enter a goal";

        return;
    }


    if (monthly <= 0) {

        savingMonths.textContent =
            "Enter monthly saving";

        return;
    }


    const months =
        Math.ceil(goal / monthly);


    savingMonths.textContent =
        months === 1
            ? "1 month"
            : months + " months";
}


if (savingsCalculate) {
    savingsCalculate.addEventListener(
        "click",
        calculateSavings
    );
}


/* =========================================================
   NEEDS VS WANTS
   NEEDS / TOTAL × 100
========================================================= */

const needsAmount = document.getElementById("needsAmount");
const wantsAmount = document.getElementById("wantsAmount");
const needsCalculate = document.getElementById("needsCalculate");
const needsPercentage = document.getElementById("needsPercentage");


function calculateNeeds() {

    const needs =
        parseFloat(needsAmount.value) || 0;

    const wants =
        parseFloat(wantsAmount.value) || 0;

    const total =
        needs + wants;


    if (total <= 0) {

        needsPercentage.textContent =
            "Enter spending";

        return;
    }


    const needsPercent =
        (needs / total) * 100;


    needsPercentage.textContent =
        needsPercent.toFixed(1) + "% Needs";
}


if (needsCalculate) {
    needsCalculate.addEventListener(
        "click",
        calculateNeeds
    );
}


/* =========================================================
   ENTER KEY SUPPORT
========================================================= */

function addEnterSupport(inputs, button) {

    inputs.forEach(input => {

        if (!input) return;

        input.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    event.preventDefault();
                    button.click();
                }

            }
        );

    });

}


addEnterSupport(
    [incomeInput, expensesInput],
    budgetCalculate
);


addEnterSupport(
    [goalAmount, monthlySaving],
    savingsCalculate
);


addEnterSupport(
    [needsAmount, wantsAmount],
    needsCalculate
);



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