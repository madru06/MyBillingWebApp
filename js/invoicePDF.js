let today = new Date().toLocaleDateString();
const testData = {
    invoiceNumber: Number(invoiceNumber.innerHTML),
    companyName: "CASA RUIZ",
    date: today,
    shippingDate: today,
    customerName: "EMMA REINZ",
    address: "GOLDY POND",
    state: "NV",
    city: "LAS VEGAS",
    zip: "00000",
    data: [
        ["item 1", "1", "$50.00", "$50.00"],
        ["item 2", "2", "$20.00", "$40.00"],
        ["item 3", "5", "$2.00", "$10.00"],
        ["item 4", "4", "$200.00", "$800.00"],
    ],
    totalAmount: "$100.00"
};

export function testPDF(invoiceData) {
    
    let doc = new jsPDF('l', 'pt', 'letter');

    let invoiceDetail = [
            ["DETAIL", "", "", ""],
            ['Description', 'Qty ', 'Price', 'Amount']
    ];

    invoiceData.data.forEach((x)=>{
        invoiceDetail.push(x);
    });
    
    var y = 10;
    doc.setLineWidth(2);
    doc.autoTable({
        margin: {top: 10},
        body: [
            [[[invoiceData.companyName]],[[today]]],
            [[["INVOICE: #" + invoiceData.invoiceNumber]]],
            [[["SHIPPING DATE: " + invoiceData.shippingDate]]],
            [[["TO: " + invoiceData.customerName]]],
            [[["ADDRESS: " + invoiceData.address+". "]],[
                [invoiceData.city],
                [" "+invoiceData.state],
                [" "+invoiceData.zip+"."]
            ]]
        ],
        startY: 10,
        theme: 'striped',
    });
 
    doc.autoTable({
        margin: {top: 30},
        body: invoiceDetail,
        startY: 140,
        theme: 'striped',
    });


    const blobPDF = doc.output('bloburl');

    let pdfContainer = document.getElementById("pdfContainer");
    pdfContainer.innerHTML = `
        <embed id="blob-src-test" frameborder="0" width="100%" height="400px">

    `;
        var blob_iframe = document.querySelector('#blob-src-test');
        blob_iframe.src = blobPDF;

        let myModal = new bootstrap.Modal(document.getElementById('invoicePreviewModal')); 
        myModal.show(); 

}