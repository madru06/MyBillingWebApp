/* DOM LISTENERS */
btnClean.addEventListener("click", (ev)=>{
    ev.preventDefault();
    cleanInputs("#invoiceInfo > div > input");
}, false);

btnCleanAll.addEventListener("click", (ev)=>{
    ev.preventDefault();
    cleanInputs("input:not(:read-only)");
}, false);

function removeTablerow(el) {
    el.parentNode.parentNode.remove();
    calcTotal();
}

btnAdd.addEventListener("click", (ev)=>{
    ev.preventDefault();
    if (!hasValidValues(inpDescription) || !hasValidValues(inpPrice || !hasValidValues(inpQty))) {
        alert("Fill all the values, u dummie!");
    }
    let data = [inpDescription.value, Number(inpPrice.value), Number(inpQty.value), Number(inpPrice.value) * Number(inpQty.value)]
    addItem(data);
    tableContainer.hidden = false;
    calcTotal();
}, false);

btnGenerate.addEventListener("click", (ev)=>{
    ev.preventDefault();
    console.log("iniciando...")
    /*if (!invoiceDataIsValid) {
        alert("Not enough data!"); 
        console.log("not enough...")
        return false;
    }*/
    generateInvoice();
}, false);

/* VALIDATORS */
function hasValidValues(el) {
    let result = el.value !== "";
    return result;
}

function invoiceDataIsValid(){
    let inputs = document.querySelectorAll("input");
    inputs.forEach((x)=>{
        if(x.value === ""){
            return false;
        }
    });
    return tableContent.childElementCount > 0;
}

/* GENERAL DOM FUNCTIONS */
inpToday.value = new Date().toLocaleDateString();

function cleanInputs(querySelector){
    let inputs = document.querySelectorAll(querySelector);

    inputs.forEach((x)=>{
        x.value = "";
    });
}
function addItem(item) {
    let newItem = `
        <tr>
            <td class="tdItem" data-value="${item[0]}">${item[0]}</td>
            <td class="tdPrice" data-value="${item[1]}">$${item[1].toFixed(2)}</td>
            <td class="tdQty text-center" data-value="${item[2]}">${item[2]}</td>
            <td class="tdAmount" data-value="${item[3]}">
                <span class="align-self-stretch" data-amount="${item[3].toFixed(2)}">$${item[3].toFixed(2)}</span>
                <button class="btn px-2 py-0 text-danger align-self-stretch" onclick="removeTablerow(this)">
                    <i class="fa fa-times"></i>
                </button>
            </td>
        </tr>
    `;
    tableContent.innerHTML += newItem;
}
function calcTotal(){
    let amounts = document.querySelectorAll(".tdAmount > span");
    let totalAmount = 0;
    amounts.forEach((x)=>{
        totalAmount += Number(x.dataset.amount);
    });
    thTotal.innerHTML = `$${totalAmount.toFixed(2)}`;
}
function generateInvoice(){
    console.log("generating...")

    /*var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    document.onreadystatechange = function () {
        myModal.show();
    };
    console.log("modal open!...")*/
    let items = [];

    document.querySelectorAll("#tableContent > tr").forEach((x)=>{
        let itemValues = [x.children[0].dataset.value, x.children[1].dataset.value, x.children[2].dataset.value, x.children[3].dataset.value];
        items.push(itemValues);
    });

    let invoiceData = {
        invoiceNumber: Number(invoiceNumber.innerHTML),
        companyName: inpCompany.value,
        date: inpToday.value,
        shippingDate: inpShippingDate.value,
        customerName: inpCustomerName.value,
        address: inpAddress.value,
        state: inpState.value,
        city: inpCity.value,
        zip: inpZIP.value,
        data: items
    }

    console.log(invoiceData);
}