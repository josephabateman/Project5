 //cart href
 const cartButton = document.getElementById('cart-button');
 cartButton.href = 'cart.html';

 //create elements
 const content = document.getElementById('confirmation')
 const thankYou = document.createElement('h4')
 const div = document.createElement('div')
 const totalPrice = document.createElement('p')
 const orderID = document.createElement('p')

 //params
 const params = new URLSearchParams(document.location.search);
 const priceParam = params.get('totalPrice');
 const orderIDParam = params.get('orderID');

 //bootstrap classes
 thankYou.setAttribute('class', 'display-4 p-3 bg-light')
 totalPrice.setAttribute('class', 'text-secondary p-3')
 orderID.setAttribute('class', 'p-3 mt-3 bg-light')

 //content values
 thankYou.innerHTML = 'Thank you for shopping with us. We really appreciate your custom during the pandemic!'
 totalPrice.innerHTML = 'Your order total: $' + priceParam
 orderID.innerHTML = 'Your order number: ' + orderIDParam

 content.appendChild(thankYou)
 content.appendChild(div).appendChild(totalPrice).appendChild(orderID)
