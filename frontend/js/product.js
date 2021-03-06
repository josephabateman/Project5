// get query params
const params = new URLSearchParams(document.location.search);
const productId = params.get('productId');
const apiName = params.get('apiName');

//cart href
const cartButton = document.getElementById('cart-button');
cartButton.href = 'cart.html' + '?apiName=' + apiName;

// AJAX function
const callApi = async (ApiToCall) => {
    try {
        const response = await fetch(ApiToCall);
        if (response.ok) {
            const jsonResponse = await response.json();

            //create elements
            const newImg = document.createElement('IMG');
            const name = document.createElement('h2');
            const description = document.createElement('p');
            const price = document.createElement('h3');
            //create drop down
            const formDiv = document.createElement('div')
            const form = document.createElement('form');
            const label = document.createElement('label');
            const select = document.createElement('select');
            const addToCart = document.createElement('input');

            //form id and remove spaces if name has spaces
            //            formDiv.setAttribute('id', jsonResponse.name.replace(/ /gi, ''))

            //bootstrap classes
            newImg.setAttribute('class', 'img-fluid rounded')
            name.setAttribute('class', 'font-weight-light')
            description.setAttribute('class', 'font-weight-light')
            price.setAttribute('class', 'font-weight-light')
            //dropdown bootstrap classes
            formDiv.setAttribute('class', 'col-sm')
            form.setAttribute('class', '')
            label.setAttribute('class', 'text-secondary font-weight-light')
            select.setAttribute('class', 'font-weight-light')
            addToCart.setAttribute('class', 'align-bottom btn btn-secondary mt-3 ml-2')

            //populate placeholder elements with json response (no loop necessary)
            newImg.src = jsonResponse.imageUrl
            name.innerHTML = jsonResponse.name
            description.innerHTML = jsonResponse.description
            const correctPrice = jsonResponse.price / 100;
            price.innerHTML = `$${correctPrice.toFixed(2)}`

            //append elements to each other
            const imagePopulate = document.getElementById('image-populate')
            const infoPopulate = document.getElementById('info-populate')
            const quantityElement = document.getElementById('quantity-element')
            imagePopulate.appendChild(newImg)
            infoPopulate.appendChild(name)
            infoPopulate.appendChild(price)
            infoPopulate.appendChild(description)
            infoPopulate.appendChild(formDiv)

            //get options key and value names from API (see line 67 and 78)
            const dropdownKeyName = Object.keys(jsonResponse)[0];
            const dropdownValues = Object.values(jsonResponse)[0];

            //dropdown attributes - using a form
            form.setAttribute('action', '');
            label.setAttribute('for', 'options');
            label.innerHTML = `Select ${dropdownKeyName} `;
            select.setAttribute('name', 'option');
            select.setAttribute('id', 'option');
            addToCart.setAttribute('type', 'submit')
            addToCart.setAttribute('value', 'add to cart')
            addToCart.setAttribute('id', 'addToCart')

            //append form elements to one another and addToCart button at the end
            let appendDropdown = formDiv.appendChild(form).appendChild(label).appendChild(select)

            //populate dropdown options in a loop 
            for (let i of dropdownValues) {
                const option = document.createElement('option');
                option.setAttribute('value', i);
                option.innerHTML = i;
                appendDropdown.appendChild(option)
            }

            //append "add to cart" button to quantity label
            label.appendChild(quantityElement).appendChild(addToCart)

            //add to cart functionality wrapped in a function
            function cartObject() {
                //add to cart
                const qty = document.getElementById('qty')
                //create cart object and default behaviour submit onclick
                const addToCart = document.getElementById('addToCart')
                addToCart.addEventListener('click', function (option) {
                    option.preventDefault();
                    location.href = 'cart.html' + '?apiName=' + apiName;

                    //create order object which will be added to array via localStaorage
                    if (qty.value > 0) {
                        let cartObject = {
                            name: jsonResponse.name,
                            option: select.value,
                            price: correctPrice.toFixed(2),
                            id: productId,
                            quantity: qty.value,
                            imageUrl: jsonResponse.imageUrl
                        }
                        const localStKey = `${jsonResponse.name}, ${select.value}`
                        localStorage.setItem(localStKey, JSON.stringify(cartObject));
                    }
                });
            }
            cartObject();


        } else {
            throw new Error('We couldn\'t generate our product page right now. Please try later')
        }

    } catch (error) {
        document.body.innerHTML = error;
    }
}

callApi('http://localhost:3000/api/' + apiName + '/' + productId);
