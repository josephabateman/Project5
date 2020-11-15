const cartArr = []; /* cartArr holds all product info */
const cartTotalPrice = []; /* cartTotalPrice is total price of products */
let productID = []; /* holds cartArr id strings */

const params = new URLSearchParams(document.location.search);
const apiName = params.get('apiName');
console.log(apiName)

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

//redirect to home page if cart is empty
if (cartArr < 1) {
    alert('Your cart is empty. Please add some items first!')
    location.href = 'index.html'
}

// create the table and populate
if (cartArr.length > 0) {

    const populateAllInfo = document.getElementById('populate-all-info')

    for (let i = 0; i < cartArr.length; i++) {

        //create elements
        const bootStrapDiv = document.createElement('div')
        const newImg = document.createElement('IMG');
        const name = document.createElement('h4');
        const productOptions = document.createElement('p');
        const price = document.createElement('p');
        const removeItem = document.createElement('a');

        //bootstrap classes
        bootStrapDiv.setAttribute('class', 'row p-2 m-2 border')
        newImg.setAttribute('class', 'col-md-6 col-lg-4 img-fluid rounded')
        name.setAttribute('class', 'font-weight-light px-3 col-4')
        productOptions.setAttribute('class', 'px-2 font-weight-light col-2')
        price.setAttribute('class', ' font-weight-light col-2')
        removeItem.setAttribute('class', 'col-12')
        removeItem.setAttribute('href', '')


        populateAllInfo.appendChild(bootStrapDiv)
        bootStrapDiv.appendChild(newImg)
        bootStrapDiv.appendChild(name)
        bootStrapDiv.appendChild(productOptions)
        bootStrapDiv.appendChild(price)
        bootStrapDiv.appendChild(removeItem)

        //add json data to each created element
        newImg.src = cartArr[i].imageUrl
        name.innerHTML = cartArr[i].name
        productOptions.innerHTML = cartArr[i].option

        //local storage value for removeItem
        removeItem.innerHTML = 'Delete'
        removeItem.value = Object.keys(localStorage)[i]

        //price populate
        const correctPrice = cartArr[i].price / 1;
        price.innerHTML = `$${correctPrice.toFixed(2)}`

        function calculateTotals() {
            const totalsAsStrings = parseInt(cartArr[i].price)
            const totalsTimesQuantities = totalsAsStrings * cartArr[i].quantity
            cartTotalPrice.push(totalsTimesQuantities)
        }
        calculateTotals()

        //creates dropdown options and pre-selects correct quantity
        let quantityVal = document.createElement('select');
        quantityVal.setAttribute('id', 'cart-quantity');
        quantityVal.setAttribute('class', 'd-inline ml-2');

        for (let j = 1; j < 6; j++) {
            const option = document.createElement('option');
            option.setAttribute('value', j)
            option.setAttribute('id', 'option' + i + j)
            option.innerHTML = [j]
            if (j == cartArr[i].quantity) {
                option.setAttribute('selected', cartArr[i].quantity)
            }

            //make sure to append below to correct place
            productOptions.appendChild(quantityVal)
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


        //remove item from cart    
        function removeItemFunction() {
            //make sure to append below to correct place
            removeItem.onclick = function () {
                if (removeItem.value === Object.keys(localStorage)[i]) {
                    let yes = confirm("This will remove the item from your cart. Click 'ok' to confirm or 'cancel' to go back");
                    if (yes == true) {
                        localStorage.removeItem(removeItem.value);
                        location.reload();
                    }
                }
            }
        }
        removeItemFunction()

    }

    //reduces cartQuantityNums to a single calculated number
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = cartTotalPrice.reduce(reducer);

    //total price
    const displayPrice = document.createElement('h6')
    displayPrice.innerHTML = `Cart Total: $${totalPrice} `
    displayPrice.setAttribute('class', 'mt-3')
    populateAllInfo.appendChild(displayPrice)

    //empty cart    
    function emptyCartFunc() {
        const emptyCart = document.createElement('button')
        emptyCart.setAttribute('class', 'btn btn-danger d-block mt-3')
        emptyCart.innerHTML = 'Empty Cart'

        //make sure to append below to correct place
        displayPrice.appendChild(emptyCart)
        emptyCart.onclick = function () {
            let yes = confirm("This will delete all products in your cart. Click 'ok' to confirm or 'cancel' to go back");
            if (yes == true) {
                localStorage.clear();
                location.href = 'index.html';
            }
        }
    }
    emptyCartFunc()

}
//submit form event
const submitButton = document.getElementById('submit-button');

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
            const rawResponse = await fetch('http://localhost:3000/api/' + apiName + '/order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const content = await rawResponse.json();
            //            console.log(content)

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
