const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


// DOM Elements

const amountInput = document.querySelector("#amount");

const fromSelect = document.querySelector("#from");

const toSelect = document.querySelector("#to");

const msg = document.querySelector(".msg");

const form = document.querySelector("form");

const swapBtn = document.querySelector("#swap");

const dropdowns = document.querySelectorAll(".dropdown select");

const fromFlag = document.querySelector("#from-flag");

const toFlag = document.querySelector("#to-flag");


// Populate Dropdowns

for(let select of dropdowns){

    for(currCode in countryList){

        let newOption = document.createElement("option");

        newOption.innerText = currCode;

        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }

        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }
}


// Update Flag

const updateFlag = (select, imgElement) => {

    let countryCode =
    select.value.slice(0,2).toUpperCase();

    imgElement.src =
    `https://flagsapi.com/${countryCode}/flat/64.png`;
};


// Event Listeners for Flags

fromSelect.addEventListener("change", () => {

    updateFlag(fromSelect, fromFlag);
});

toSelect.addEventListener("change", () => {

    updateFlag(toSelect, toFlag);
});


// Swap Currency

swapBtn.addEventListener("click", () => {

    let temp = fromSelect.value;

    fromSelect.value = toSelect.value;

    toSelect.value = temp;

    updateFlag(fromSelect, fromFlag);

    updateFlag(toSelect, toFlag);
});


// Fetch Exchange Rate

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    let amount = amountInput.value;

    if(amount === "" || amount <= 0){

        msg.innerText =
        "⚠️ Please enter a valid amount.";

        return;
    }

    msg.innerText = "⏳ Fetching Exchange Rate...";

    let fromCur =
    fromSelect.value.toLowerCase();

    let toCur =
    toSelect.value.toLowerCase();

    const URL =
    `${BASE_URL}/${fromCur}.json`;

    try{

        let response = await fetch(URL);

        let data = await response.json();

        let rate = data[fromCur][toCur];

        let finalAmount =
        (amount * rate).toFixed(2);

        msg.innerText =
        `${amount} ${fromSelect.value} = ${finalAmount} ${toSelect.value}`;

    }
    catch(error){

        msg.innerText =
        "❌ Failed to fetch exchange rate.";
    }

});