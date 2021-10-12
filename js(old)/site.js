//Calculate the payment for the loan
function calcPayment(amount, rate, term) {
    return (amount * rate) / (1 - Math.pow(1 + rate, -term));
}

//calculate the interest for the current balance of the loan
function calcInterest(balance, rate) {
    return balance * rate;
}

function calcRate(rate) {
    return rate = rate / 1200;
}

//get values
function buildSchedule() {
    let loanAmount = Number(document.getElementById("loanAmount").value);
    let rate = parseFloat(document.getElementById("loanRate").value);

    //convert rate to a monthly interest rate
    rate = calcRate(rate);

    //Assume monthly input
    let term = parseInt(document.getElementById("loanTerm").value);
    let payment = calcPayment(loanAmount, rate, term);
    let payments = getPayments(loanAmount, rate, term, payment);

    displayData(payments, loanAmount, payment);
}

//Build the amortization schedule
function getPayments(amount, rate, term, payment) {
    //set up an array to hold payments
    let payments = [];

    //set up some variables to hold the value in the schedule

    let balance = amount;
    let totalInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyInterest = 0;
    let monthlyTotalInterest = 0;

    //create a loop for each month of the loan term
    for (month = 1; index <= term; month++) {
        //calculate the payment and interest
        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = balance - monthlyPrincipal;

        //add the details to an object
        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balance: balance
        }

        payments.push(curPayment);

    }

    return payments;

}

//display the data to the user
function displayData(payments, loanAmount, payment) {
    //get the table we are going to add to.
    let tableBody = document.getElementById("scheduleBody");
    let template = document.getElementById("scheduleTemplate");

    //clear the table of previous calculations
    tableBody.innerHTML = "";

    for (let i = 0; i < payments.length; i++) {
        //get a clone row template
        payRow = template.content.cloneNode(true);
        //grab only the columns in the template
        paycols = payRow.querySelectorAll("td");

        //build the row
        //we know that there are six columns in our template
    }







    //configure currency formatter.
    let currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    for (let i = 0; i < payments.length; i++) {
        //get a clone row template
        payRow = template.content.cloneNode(true);
        //grab only the columns in the template
        paycols = payRow.querySelectorAll("td");
        //build the row
        //we know that there are six columns in our template
        paycols[0].textContent = payments[i].month;
        paycols[1].textContent = currencyFormatter.format(payments[i].payment.toFixed(2));
        paycols[2].textContent = currencyFormatter.format(payments[i].principal.toFixed(2));
        paycols[3].textContent = currencyFormatter.format(payments[i].interest.toFixed(2));
        paycols[4].textContent = currencyFormatter.format(payments[i].totalInterest.toFixed(2));
        paycols[5].textContent = currencyFormatter.format(payments[i].balance.toFixed(2));
        //append to the table
        tableBody.appendChild(payRow);
    }
    //total interest is in the last row of the payments array.
    let totalInterest = payments[payments.length - 1].totalInterest;
    //calculate total cost
    let totalCost = Number(loanAmount) + totalInterest;
    //Build out the summary area
    let labelPrincipal = document.getElementById("totalPrincipal");
    labelPrincipal.innerHTML = Number(loanAmount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let labelInterest = document.getElementById("totalInterest");
    labelInterest.innerHTML = Number(totalInterest).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let paymentdiv = document.getElementById("payment");
    paymentdiv.innerHTML = Number(payment).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let totalCostDiv = document.getElementById("totalCost");
    totalCostDiv.innerHTML = Number(totalCost).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}