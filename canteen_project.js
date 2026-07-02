
let grandTotal = 0;

// this is a function for items and qty both
function addItem() {
    let itemData = document.getElementById("item").value;
    let qty = document.getElementById("qty").value;
    // here is a alert message for user enter any qty first
    if (qty === 0 || qty <= 0) {
        alert("Enter Valid Quantity");
        return;

    }
    // item name and item price is break into two differebt parts item name and price using(split)
    let data = itemData.split("-");
    let itemName = data[0];
    let price = parseInt(data[1]);
    // total value 
    let total = price * qty;

    grandTotal += total;
    updateBill();

    // now the data will be show in the tables row
    document.getElementById("grandTotal").innerHTML = grandTotal;
    document.getElementById("subTotal").innerHTML = "sub Total : ₹" + grandTotal;
    let table = document.getElementById("billTable");  // table ko pakad liya 
    let gst = grandTotal * 5 / 100;
    document.getElementById("gst").innerHTML = "GST (5%) : ₹" + gst;
    let finalTotal = grandTotal + gst;
    document.getElementById("finalTotal").innerHTML = "Final Total : ₹" + finalTotal;
    // now we create a row where all data will be show

    let row = table.insertRow();
    row.insertCell(0).innerHTML = itemName;
    row.insertCell(1).innerHTML = "₹" + price;
    row.insertCell(2).innerHTML = qty;
    row.insertCell(3).innerHTML = "₹" + total;

    // if user choose wrong item then they can remove the item 
    let removeCell = row.insertCell(4);

    // this buttin is created for remove the items
    let btn = document.createElement("button");
    // button should be show with name , so 
    btn.innerHTML = "Remove";
    // this class is created for designing like color, padding, corder, color etc.
    btn.className = "removeBtn";

    // this function is removing for grandTotal, update screen and remove row
    btn.onclick = function () {

        grandTotal -= total;
        updateBill();

        document.getElementById("grandTotal").innerHTML = grandTotal;
        document.getElementById("subTotal").innerHTML = grandTotal;

        row.remove();
    }

    removeCell.appendChild(btn);
    // this statement is showing the grandTotal value on scren fo users
    document.getElementById("grandTotal").innerHTML = grandTotal;

    // when 1 item is selected screen must be update for selecting the new item so
    document.getElementById("qty").value = "";

}
// function for printing the bill

function printBill() {
    let name = document.getElementById("customerName").value;
    let mobile = document.getElementById("mobile").value;
    let date = document.getElementById("Date").value;
    let time = document.getElementById("Time").value;
    let day = document.getElementById("days").value;
    let address = document.getElementById("add").value;
    let billNo = document.getElementById("billNo").innerHTML;


    if (name.trim() == "" || mobile.trim() == "") {
        alert("⚠ Please fill Customer Name and Mobile Number before printing the bill.");
        return;
    }
    let rows = document.getElementById("billTable").rows.length;
    if (rows <= 1) {
        alert("⚠ Please add at least one item to the bill.");
        return;
    }
    let grandTotal = Number(document.getElementById("grandTotal").innerHTML);

    if (grandTotal <= 0) {
        alert("⚠ Bill amount should be greater than ₹0.");
        return;
    }
    //Ye browser me ek nayi temporary window open karta hai.
    let printWindow = window.open("", "", "width=800,height=700");
    // Iske andar hum poora invoice HTML likhte hain.Jaise: Heading Customer Details Table Total

    printWindow.document.write(`
<html>
<head>
<title>Canteen Bill</title>

<style>
body{
    font-family: Arial;
    padding:20px;
}
h2{
    text-align:center;
}
table{
    width:100%;
    border-collapse:collapse;
    margin-top:15px;
}
table,th,td{
    border:1px solid black;
}
th,td{
    padding:8px;
    text-align:center;
}
</style>

</head>

<body>
<img src="media/chatGPT 1 logo.png" 
     style="width:80px; height:80px; display:block; margin:auto;">
<h2>CANTEEN BILLING SYSTEM</h2>

<p><b>Bill No :</b> ${billNo}</p>
<p><b>Date :</b> ${date}</p>
<p><b>Time :</b> ${time}</p>

<hr>

<p><b>Customer :</b> ${name}</p>
<p><b>Mobile :</b> ${mobile}</p>
<p><b>Day :</b> ${day}</p>
<p><b>Address :</b> ${address}</p>

<hr>

${document.getElementById("billTable").outerHTML}

<hr>

<p>${document.getElementById("subTotal").innerHTML}</p>
<p>${document.getElementById("disc").innerHTML}</p>
<p>${document.getElementById("gst").innerHTML}</p>
<h3>${document.getElementById("finalTotal").innerHTML}</h3>

<hr>

<h3 style="text-align:center;">
Thank You! Visit Again
</h3>

</body>
</html>
`);

    printWindow.document.close();
    printWindow.print();

    billNumber++;
    setBillNumber();
    newBill();

}


let theameToggle = document.getElementById("theme-toggle");
theameToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

function updateBill() {

    // Grand Total
    document.getElementById("grandTotal").innerHTML = grandTotal;

    // Sub Total
    document.getElementById("subTotal").innerHTML = "Sub Total : ₹" + grandTotal;

    // Discount %
    let discount = document.getElementById("discount").value || 0;

    // Discount Amount
    let discountAmount = grandTotal * discount / 100;

    // Show Discount
    document.getElementById("disc").innerHTML = "Discount : ₹" + discountAmount.toFixed();

    // Amount after Discount
    let afterDiscount = grandTotal - discountAmount;

    // GST on Amount after Discount
    let gst = afterDiscount * 5 / 100;

    // Show GST
    document.getElementById("gst").innerHTML = "GST (5%) : ₹" + gst.toFixed();

    // Final Total
    let finalTotal = afterDiscount + gst;

    // Show Final Total
    document.getElementById("finalTotal").innerHTML = "Final Total : ₹" + finalTotal.toFixed(0);

}

function addDiscount() {

    updateBill();

}
function setDateTime() {
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let currentDate = day + "/" + month + "/" + year;
    let hour = today.getHours();
    let minute = today.getMinutes();
    let currentTime = hour + ":" + minute;
    document.getElementById("Date").value = currentDate;
    document.getElementById("Time").value = currentTime;

    let dayNames = ["Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let todayDay = dayNames[today.getDay()];
    document.getElementById("days").value = todayDay;

}
setDateTime();

let billNumber = 1001;
function setBillNumber() {
    document.getElementById("billNo").innerHTML = billNumber;
}

setBillNumber();

// Clear everything after printing the previous customer's bill
function newBill() {
    document.getElementById("customerName").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("add").value = "";
    document.getElementById("item").value = "";
    setDateTime();
    document.getElementById("qty").value = "";
    document.getElementById("discount").value = "";
    grandTotal = 0;
    discountAmount = 0;
    document.getElementById("grandTotal").innerHTML = "0";
    document.getElementById("subTotal").innerHTML = "Sub Total : ₹0";
    document.getElementById("disc").innerHTML = "Discount : ₹0";
    document.getElementById("gst").innerHTML = "GST (5%) : ₹0";
    document.getElementById("finalTotal").innerHTML = "Final Total : ₹0";

    // get the table
    let table = document.getElementById("billTable");

    // remove all bill items
    while (table.rows.length >= 1) {

        // remove one row at a time
        table.deleteRow(1);
    }
}







const loginBtn = document.getElementById("loginBtn");
const loginPopup = document.getElementById("loginPopup");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginSubmit = document.getElementById("loginSubmit");

loginBtn.onclick = function () {
    loginPopup.style.display = "flex";
}
loginSubmit.onclick = function(){
      alert("emter user name and password");
}



