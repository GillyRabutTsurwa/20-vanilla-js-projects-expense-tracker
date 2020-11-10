const DOM = (function () {
  const elements = {
    balance: document.getElementById("balance"),
    money_plus: document.getElementById("money-plus"),
    money_minus: document.getElementById("money-minus"),
    list: document.getElementById("list"),
    form: document.getElementById("form"),
    text: document.getElementById("text"),
    amount: document.getElementById("amount"),
  };
  return elements;
})();

// NOTE: dummyTransactions contains placeholder data until we implement local storage
const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 160 },
];

let transactions = dummyTransactions;

// ==================================== HELPER FUNCTIONS ====================================

// function to generate ID. i will take advantage of hoisting and not make this an arrow function for the time being.
const generateID = () => {
  return Math.floor(Math.random() * 100000000);
};

// ==========================================================================================

// ==================================== PRIMARY FUNCTIONS ====================================

// Add the transactions to the DOM.
const addTransaction2DOM = (currentTransaction) => {
  // Get sign (+ ou -)
  const sign = currentTransaction.amount < 0 ? "-" : "+";

  // create a new element
  const item = document.createElement("li");

  // add class based on value/sign
  item.classList.add(currentTransaction.amount < 0 ? "minus" : "plus");

  //   we are doing Math.abs() @ line 54 because we don't need to differentiate positive number from negative. the sign variable already does this for us.

  item.innerHTML = `
          ${currentTransaction.text} 
          <span>${sign}${Math.abs(currentTransaction.amount)}</span>
          <button class="btn-delete" data-transactionid="${currentTransaction.id}">x</button>
      `;

  // DOM.list.appendChild(item);
  // I like this one better than the top because it adds the element at the beginning.
  DOM.list.insertAdjacentElement("beforeend", item);
};

// update & display the balance income and expense
const updateValues = () => {
  const amountsArr = transactions.map((currentTransactionObj) => currentTransactionObj.amount);

  const total = amountsArr.reduce((acc, currentValue) => (acc += currentValue), 0).toFixed(2);

  const income = amountsArr
    .filter((currentAmount) => currentAmount > 0)
    .reduce((acc, currentValue) => (acc += currentValue), 0)
    .toFixed(2);

  const expense = amountsArr
    .filter((currentAmount) => currentAmount < 0)
    .reduce((acc, currentValue) => (acc += currentValue), 0)
    .toFixed(2);

  const expenseAbsValue = expense * -1; //IMPORTANT: we need to change this number from a negative as we don't need it, another part of the app takes care of this.

  console.log(total, income, expense);

  DOM.balance.innerText = `$${total}`;
  DOM.money_plus.innerText = `$${income}`;
  DOM.money_minus.innerText = `$${expense}`;

  console.log(amountsArr);
  console.log(total);
  console.log(expenseAbsValue);
};

// add new transaction via form
const submitNewTransaction = (e) => {
  e.preventDefault(); // form tings

  // If there is not input on even one of the two inputs
  if (DOM.text.value.trim() === "" || DOM.amount.value.trim() === "") {
    // Do not submit the form and show this alert
    alert("Please add a text and amount");
  } else {
    // Otherwise, make an object that will have the same attributes of the transaction objects that are in our array, ie, will have an id, text and amount
    const newTransaction = {
      id: generateID(),
      text: DOM.text.value,
      amount: parseInt(DOM.amount.value),
    };
    console.log(newTransaction);
    // And include that object in the original transaction array. Brad used push, but I decided to use the spread operator.

    transactions = [...transactions, newTransaction];

    // We then call the function that is responsible for rendering the array objects to the DOM. We do this here so the new object is included
    addTransaction2DOM(newTransaction);

    // We then call the updateValues function so that the appropriate numbers (balance, income and expense) can be updated
    updateValues();

    // Lastly, we clear the input for both the inputs
    DOM.text.value = "";
    DOM.amount.value = "";
  }
};

// Remove a transaction based on its ID
const removeTransactionByID = (id) => {
  transactions = transactions.filter((currentTransaction) => {
    return currentTransaction.id !== id;
  });

  init();
};

// ==========================================================================================

DOM.list.addEventListener("click", (e) => {
  if (e.target.className === "btn-delete") {
    // Aha, the dataset is string. on veut que ce soit un chiffre.
    const buttonID = parseInt(e.target.dataset.transactionid);
    console.log(typeof buttonID);
    console.log(buttonID);
    removeTransactionByID(buttonID);
  }
});

// init app function
function init() {
  // empty innerHTML to nothing
  list.innerHTML = "";
  // loop through array of transactions

  transactions.forEach(addTransaction2DOM);
  updateValues();
}

init();

DOM.form.addEventListener("submit", submitNewTransaction);
