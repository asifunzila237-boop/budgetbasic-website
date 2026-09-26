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


// ================= FORMAT MONEY =================

function formatMoney(amount) {

    return "₨ " + amount.toLocaleString("en-PK", {
        maximumFractionDigits: 0
    });

}


// ================= BUDGET CALCULATOR =================

const budgetBtn = document.getElementById("budgetBtn");

budgetBtn.addEventListener("click", function () {

    const income =
        Number(document.getElementById("income").value) || 0;

    const housing =
        Number(document.getElementById("housing").value) || 0;

    const food =
        Number(document.getElementById("food").value) || 0;

    const transport =
        Number(document.getElementById("transport").value) || 0;

    const other =
        Number(document.getElementById("other").value) || 0;


    const totalExpenses =
        housing +
        food +
        transport +
        other;


    const remaining =
        income - totalExpenses;


    const result =
        document.getElementById("remainingAmount");

    const message =
        document.getElementById("budgetMessage");


    result.textContent = formatMoney(remaining);


    if (income === 0) {

        message.textContent =
            "Please enter your monthly income.";

    }

    else if (remaining > 0) {

        message.textContent =
            "You have money remaining after your expenses.";

    }

    else if (remaining === 0) {

        message.textContent =
            "Your income and expenses are equal.";

    }

    else {

        message.textContent =
            "Your expenses are higher than your income.";

    }

});


// ================= SAVINGS CALCULATOR =================

const savingBtn =
    document.getElementById("savingBtn");


savingBtn.addEventListener("click", function () {

    const goal =
        Number(document.getElementById("savingGoal").value) || 0;

    const current =
        Number(document.getElementById("currentSavings").value) || 0;

    const monthly =
        Number(document.getElementById("monthlySaving").value) || 0;


    const savingResult =
        document.getElementById("savingResult");

    const savingMessage =
        document.getElementById("savingMessage");


    if (goal <= 0) {

        savingResult.textContent = "0 months";

        savingMessage.textContent =
            "Please enter a savings goal.";

        return;
    }


    if (current >= goal) {

        savingResult.textContent = "0 months";

        savingMessage.textContent =
            "You have already reached your savings goal.";

        return;
    }


    if (monthly <= 0) {

        savingResult.textContent = "—";

        savingMessage.textContent =
            "Enter a monthly saving amount.";

        return;
    }


    const remaining =
        goal - current;


    const months =
        Math.ceil(remaining / monthly);


    savingResult.textContent =
        months + (months === 1 ? " month" : " months");


    savingMessage.textContent =
        "Estimated time based on your monthly saving.";

});


// ================= EXPENSE CALCULATOR =================

const expenseBtn =
    document.getElementById("expenseBtn");


expenseBtn.addEventListener("click", function () {

    const inputs =
        document.querySelectorAll(".expense-input");


    let total = 0;


    inputs.forEach(function (input) {

        total += Number(input.value) || 0;

    });


    document.getElementById("expenseResult")
        .textContent = formatMoney(total);

});


// ================= ENTER KEY SUPPORT =================

const allInputs =
    document.querySelectorAll("input");


allInputs.forEach(function (input) {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const calculator =
                input.closest(".calculator-box");

            const button =
                calculator.querySelector(".calculate-btn");

            button.click();

        }

    });

});