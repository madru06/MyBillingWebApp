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
        return fireAlert("Not enough data!", "warning");
    }
    let data = [inpDescription.value, Number(inpPrice.value), Number(inpQty.value), Number(inpPrice.value) * Number(inpQty.value)]
    addItem(data);
    tableContainer.hidden = false;
    cleanInputs("#invoiceInfo > div > input");
    calcTotal();
}, false);

btnGenerate.addEventListener("click", (ev)=>{
    ev.preventDefault();
    if (invoiceDataIsValid()){
        console.log("data valida...")

        generateInvoice();
    }
}, false);

/* VALIDATORS AND ALERTS*/
function hasValidValues(el) {
    let result = el.value !== "";
    return result;
}

function invoiceDataIsValid(){
    
    let inputs = document.querySelectorAll("#shippingInfo > div > input");
    inputs.forEach((x)=>{
        if(x.value === ""){
            console.log("hay inputs vacios")
            fireAlert("All fields are required!", "danger");
            return false;
        }
    });

    if (tableContent.childElementCount < 1) {
            console.log("nuay items")
        fireAlert("Must add at least one item description", "warning");
        return false;
    }

    return true;
}

function fireAlert(message, level){
    let myAlert = `
       <div class="alert alert-${level} text-center alert-dismissible fade show mx-auto" role="alert">
            <span class="fa fa-exclamation-circle"></span> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertContainer.innerHTML = myAlert;
    alertContainer.scrollIntoView({ behavior: "smooth", block: "start" });
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
function increaseInvoiceNumber(){
   invoiceNumber.innerHTML =  Number(invoiceNumber.innerText) + 1; 
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
    fireAlert("Invoice created!", "success");
    increaseInvoiceNumber();
}