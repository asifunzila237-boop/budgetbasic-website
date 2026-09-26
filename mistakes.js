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

    link.addEventListener("click", () => {
        closeSideMenu();
    });

});


/* =========================
   AI CHAT
========================= */

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");


function addMessage(text, type) {

    const message = document.createElement("div");

    message.classList.add("message");

    if (type === "user") {

        message.classList.add("user-message");

        message.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;

    } else {

        message.classList.add("bot-message");

        message.innerHTML = `
            <div class="message-avatar">
                ✦
            </div>

            <div class="message-content">
                ${text}
            </div>
        `;

    }

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =========================
   RESPONSE SYSTEM
========================= */

function getResponse(question) {

    const q = question.toLowerCase();


    if (
        q.includes("budget") ||
        q.includes("budgeting")
    ) {

        return `
            A simple budget starts with three steps:
            <br><br>
            <strong>1.</strong> Write down your income.
            <br>
            <strong>2.</strong> List your regular expenses.
            <br>
            <strong>3.</strong> Decide how much you want to save.
            <br><br>
            The goal is to understand where your money goes and
            plan your spending before the month begins.
        `;

    }


    if (
        q.includes("save") ||
        q.includes("saving")
    ) {

        return `
            Start with a realistic savings amount that you can
            consistently set aside.
            <br><br>
            You can create a specific goal, track your progress,
            and treat savings as part of your regular budget.
        `;

    }


    if (
        q.includes("need") ||
        q.includes("want")
    ) {

        return `
            A <strong>need</strong> is something important for
            everyday life, while a <strong>want</strong> is something
            you would like to have but can usually live without.
            <br><br>
            Before buying something, ask yourself whether it is
            necessary or simply something you want right now.
        `;

    }


    if (
        q.includes("spend") ||
        q.includes("buy") ||
        q.includes("purchase")
    ) {

        return `
            Before making a purchase, pause and ask:
            <br><br>
            • Do I actually need this?
            <br>
            • Is it already included in my budget?
            <br>
            • Could I use this money for a more important goal?
            <br><br>
            A short pause can help reduce unnecessary spending.
        `;

    }


    if (
        q.includes("money") ||
        q.includes("finance")
    ) {

        return `
            Good money management usually starts with understanding
            your income, tracking expenses, creating a budget,
            building savings, and making thoughtful spending decisions.
        `;

    }


    return `
        That's a good question.
        <br><br>
        For basic financial planning, start by tracking your income
        and expenses, creating a simple budget, and setting a realistic
        savings goal.
        <br><br>
        You can also ask me about <strong>budgeting</strong>,
        <strong>saving</strong>, <strong>needs vs wants</strong>,
        or <strong>spending</strong>.
    `;
}


/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

    const question = userInput.value.trim();

    if (question === "") {
        return;
    }


    addMessage(question, "user");

    userInput.value = "";


    setTimeout(() => {

        const response = getResponse(question);

        addMessage(response, "bot");

    }, 500);
}


sendBtn.addEventListener("click", sendMessage);


userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


/* =========================
   QUICK QUESTIONS
========================= */

const questionButtons =
    document.querySelectorAll(".question-btn");


questionButtons.forEach(button => {

    button.addEventListener("click", function() {

        const question =
            this.getAttribute("data-question");

        userInput.value = question;

        sendMessage();

    });

});