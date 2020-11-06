const cartArr = []; /* cartArr holds all product info */
const cartTotalPrice = []; /* cartTotalPrice is total price of products */
let productID = []; /* holds cartArr id strings */

function cart() {
    //adds all localStorage object values to an array
    for (const [key, value] of Object.entries(localStorage)) {
        cartArr.push(JSON.parse(value))
    }

    for (let i = 0; i < cartArr.length; i++) {
        productID.push(cartArr[i].id)
    }

    //loops through the cartArr objects, gets total quantity of items and adds those numbers to cartQuantityNums array
    let cartQuantityNums = [0]
    for (let i = 0; i < cartArr.length; i++) {
        if (cartArr[i].quantity) {
            cartQuantityNums.push(parseInt(cartArr[i].quantity))
        }
    }

    //reduces cartQuantityNums to a single calculated number
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let cartQuantity = cartQuantityNums.reduce(reducer);
}
cart();

// create the table and populate
if (cartArr.length > 0) {
    for (let i = 0; i < cartArr.length; i++) {
        // Get a reference to the table
        let tableRef = document.getElementById('populate-table');

        // Insert a row at the end of the table
        let newRow = tableRef.insertRow(-1);

        // Insert a cell in the row at index 0
        let imageCell = newRow.insertCell(0);
        let productCell = newRow.insertCell(1);
        let optionCell = newRow.insertCell(2);
        let priceCell = newRow.insertCell(3);
        let quantityCell = newRow.insertCell(4);

        //add images to cells  
        let imageVal = document.createElement('img');
        imageVal.setAttribute('src', cartArr[i].imageUrl)
        imageVal.setAttribute('id', 'cartImg')

        // Append a text node to the cell
        let productVal = document.createTextNode(cartArr[i].name);
        let optionsVal = document.createTextNode(cartArr[i].option);
        let totalVal = document.createTextNode(cartArr[i].price);
        //                 let quantityVal = document.createTextNode(cartArr[i].quantity);
        let quantityVal = document.createElement('select');
        quantityVal.setAttribute('id', 'cart-quantity');
        imageCell.appendChild(imageVal);
        productCell.appendChild(productVal);
        optionCell.appendChild(optionsVal);
        priceCell.appendChild(totalVal);
        quantityCell.appendChild(quantityVal);

        function calculateTotals() {
            const totalsAsStrings = parseInt(cartArr[i].price)
            const totalsTimesQuantities = totalsAsStrings * cartArr[i].quantity
            cartTotalPrice.push(totalsTimesQuantities)
        }
        calculateTotals()

        //creates dropdown options and pre-selects correct quantity
        for (let j = 1; j < 6; j++) {
            const option = document.createElement('option');
            option.setAttribute('value', j)
            option.setAttribute('id', 'option' + i + j)
            option.innerHTML = [j]
            if (j == cartArr[i].quantity) {
                option.setAttribute('selected', cartArr[i].quantity)
            }
            quantityVal.appendChild(option)
        }

        function updateLocalStorageQuantity() {
            quantityVal.onchange = function (option) {
                option.preventDefault();
                if (quantityVal.value > 0) {
                    let cartObject = {
                        name: cartArr[i].name,
                        option: cartArr[i].option,
                        price: cartArr[i].price,
                        id: cartArr[i].id,
                        quantity: event.target.value,
                        imageUrl: cartArr[i].imageUrl
                    }
                    const localStKey = `${cartArr[i].name}, ${cartArr[i].option}`
                    localStorage.setItem(localStKey, JSON.stringify(cartObject));
                    location.reload();
                }
            };
        }
        updateLocalStorageQuantity();
    }

    //reduces cartQuantityNums to a single calculated number
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = cartTotalPrice.reduce(reducer);

    //total price
    const displayPrice = document.createElement('h4')
    displayPrice.innerHTML = `Cart Total: $${totalPrice} `
    document.getElementById('populate-table').appendChild(displayPrice)

    //empty cart    
    function emptyCartFunc() {
        const emptyCart = document.createElement('button')
        emptyCart.innerHTML = 'remove all items from cart'
        displayPrice.appendChild(emptyCart)
        emptyCart.onclick = function () {
            let yes = confirm("This will delete all products in your cart. Click 'ok' to confirm or 'cancel' to go back");
            if (yes == true) {
                localStorage.clear();
                location.reload();
            }
        }
    }
    emptyCartFunc()

}
//submit form event
const submitButton = document.getElementById('submit');

//contact form get elements
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');


//form validation
function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}

function passesValidation() {
    if (firstName.value != '' && lastName.value != '' &&
        ValidateEmail(email.value) != false && address.value != '' && city.value != '') {
        return true
    } else {
        return false;
    }
}


//POST request - submit contact info and array of id strings
//wrapped inside a submit click event
submitButton.onclick = function (event) {
    event.preventDefault();

    if (passesValidation()) {
        const post = async () => {
            const body = {
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products: productID
            };
            const rawResponse = await fetch('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();

            const orderTotal = []
            for (let i = 0; i < cartArr.length; i++) {
                orderTotal.push(content.products[i].price / 100 * cartArr[i].quantity)
            }
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const orderTotalFormatted = orderTotal.reduce(reducer).toFixed(2);
            
            //empty cart
            localStorage.clear()

            window.location.href = 'confirmation.html' + '?totalPrice=' + orderTotalFormatted + '&orderID=' + content.orderId;
        };
        post()
    } else {
        alert('Did you fill out the fields correctly? Give it another go!')
    }

}
