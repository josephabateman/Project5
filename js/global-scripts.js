function cart() {
    //adds all localStorage object values to an array
    const cartArr = [];
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

    //reduces cartQuantityNums to a single calculated number
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let cartQuantity = cartQuantityNums.reduce(reducer);
    
    //adds cartQuantityNums to html pages (make sure each html pages has global-scripts.js)
    const cartButton = document.getElementById('cart-button');
    const cartNumber = document.getElementById('cart-number');
    cartNumber.innerHTML = cartQuantity;
}
cart();
