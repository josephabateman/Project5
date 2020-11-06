const content = document.getElementById('confirmation')
const thankYou = document.createElement('h2')
const totalPrice = document.createElement('p')
const orderID = document.createElement('p')

const params = new URLSearchParams(document.location.search);
const priceParam = params.get('totalPrice');
const orderIDParam = params.get('orderID');

thankYou.innerHTML = 'Thank you for shopping with us. We really appreciate your custom during the pandemic!'

totalPrice.innerHTML = 'Your order total: $' + priceParam
orderID.innerHTML = 'Your order number: ' + orderIDParam

content.appendChild(thankYou).appendChild(totalPrice).appendChild(orderID)