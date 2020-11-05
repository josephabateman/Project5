//contact form get elements
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const email = document.getElementById('email');
const fAddress = document.getElementById('first-line-address');
const city = document.getElementById('city');
const country = document.getElementById('country');
const postcode = document.getElementById('postcode');
const submitButton = document.getElementById('submit');

function inputValidation(element, greaterThan, lessThan) {
    element.addEventListener('input', function (element) {
        if (element.target.value.length >= greaterThan && element.target.value.length <= lessThan) {
            submitButton.removeAttribute('disabled');
            //        nested if statements isNaN - below line doesn't work
            if (element === firstName || element === lastName && isNaN(element.target.value)) {
                submitButton.setAttribute('disabled', 'true');
            }
        } else {
            submitButton.setAttribute('disabled', 'true');
        }
    })
}

inputValidation(firstName, 2, 15);
inputValidation(lastName, 4, 20);
inputValidation(email, 7, 40);
inputValidation(fAddress, 10, 40);
inputValidation(city, 3, 40);
inputValidation(postcode, 8, 8);


let contactObject = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    fAddress: fAddress.value,
    city: city.value,
    postcode: postcode.value
}

//cartArr holds all cart info
const cartArr = [];
const cartTotalPrice = [];
let idStrings = [];

//api get
const apiName = 'cameras'

// AJAX function - i needed to call the API again to retreve images correctly
const callApi = async (ApiToCall) => {
    try {
        const response = await fetch(ApiToCall);
        if (response.ok) {
            const jsonResponse = await response.json();
            //rest of code goes here

            function cart() {
                //adds all localStorage object values to an array
                for (const [key, value] of Object.entries(localStorage)) {
                    cartArr.push(JSON.parse(value))
                }

                //loops through the cartArr objects, gets total quantity of items and adds those numbers to cartQuantityNums array
                let cartQuantityNums = [0]
                for (let i = 0; i < cartArr.length; i++) {
                    if (cartArr[i].quantity) {
                        cartQuantityNums.push(parseInt(cartArr[i].quantity))
                    }
                }

                //redues cartQuantityNums to a single calculated number
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let cartQuantity = cartQuantityNums.reduce(reducer);

            }
            cart();

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

                    //push id strings to array
                    idStrings.push(cartArr[i].id)



                    //building quantity value below
                    //                    console.log(selectQuantity = parseInt(cartArr[i].quantity))


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


                    // build functionality to update object which updates localstorage if different value selected

                    function updateLocalStorageQuantity() {
                        //add to cart
                        //                        const qty = document.getElementById('cart-quantity')
                        //create cart object and default behaviour submit onclick

                        quantityVal.onchange = function (option) {
                            option.preventDefault();

                            //create order object which will be added to array via localStaorage
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



            } else {
                document.getElementById('populate-table').style.visibility = "hidden";
                const emptyMessage = document.createElement('h4')
                emptyMessage.innerHTML = `Cart is Empty. Please choose some items!`
                document.getElementById('cart-number').appendChild(emptyMessage)
            }

            //console.log(cartArr)
            //console.log(idStrings)
            //console.log(contactObject)

        } else {
            throw new Error('We couldn\'t generate our product page right now. Please try later')
        }

    } catch (error) {
        document.body.innerHTML = error;
    }
}

callApi('http://localhost:3000/api/' + apiName);

//end of api get call


(async () => {
    const rawResponse = await fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: contactObject,
            b: idStrings
        })
    });
    const content = await rawResponse.json();

    console.log(content);
})();
