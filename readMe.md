## Part 1 - Showing Transaction Items. This is the code for it
```javascript
const DOM = (function () {
  const elements = {
    balance: document.getElementById("balance"),
    money_plus: document.getElementById("money_plus"),
    money_minus: document.getElementById("money_minus"),
    list: document.getElementById("list"),
    form: document.getElementById("form"),
    text: document.getElementById("text"),
    amount: document.getElementById("amount"),
  };
  return elements;
})();

// dummyTransactions is our placeholder until we implement local storage
const dummyTransactions = [
  {
    id: 1,
    text: "Flower",
    amount: -20,
  },
  {
    id: 2,
    text: "Salary",
    amount: 300,
  },
  {
    id: 3,
    text: "Book",
    amount: -10,
  },
  {
    id: 4,
    text: "Camera",
    amount: 160,
  },
];

let transactions = dummyTransactions;

// TODO: Add the transactions to the DOM.
const addTransaction2DOM = (currentTransaction) => {
  // Get sign
  const sign = currentTransaction.amount < 0 ? "-" : "+";

  // create a new element
  const item = document.createElement("li");

  // add class based on value/sign
  item.classList.add(currentTransaction.amount < 0 ? "minus" : "plus");

  //   we are doing Math.abs() @ line 54 because we don't need to differentiate positive number from negative. the sign variable already does this for us.

  item.innerHTML = `
        ${currentTransaction.text} 
        <span>${sign}${Math.abs(currentTransaction.amount)}</span>
        <button class="btn-delete">x</button>
    `;

  DOM.list.appendChild(item);
};

// init app function

function init() {
  // empty innerHTML to nothing
  list.innerHTML = "";
  // loop through array of transactions

  transactions.forEach(addTransaction2DOM);
}

init();

```