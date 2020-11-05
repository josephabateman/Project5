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
            const aTag = document.createElement('a')
            aTag.setAttribute('href', 'cart.html')
            document.getElementById('cart-number').appendChild(aTag)
            const cartP = document.createElement('p')
            cartP.innerHTML = cartQuantity
            aTag.appendChild(cartP)
                
                
            //cartArr stores all objects from localStorage in an array. use object notation in the following way to retrieve necessary info for the POST
            // console.log(cartArr[2].name)
            
            //number of items in cart
            // console.log(cartQuantity)
            }
            cart();


//            //use below 2 lines to test if Array
//            const isArray = Array.isArray(objtes);
//            console.log(isArray);